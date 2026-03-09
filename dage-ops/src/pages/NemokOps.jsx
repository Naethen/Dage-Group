import { useState, useMemo } from 'react'
import { Hotel, Plus, CheckCircle, Star, Bed, DollarSign, Trash2, ChevronDown } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'
import Toast from '../components/Toast'

const TABS = ['Occupancy', 'Revenue Log', 'Hospitality Standards', 'Notes']

const revCatColors = {
  accommodation: 'bg-blue-100 text-blue-700',
  food: 'bg-amber-100 text-amber-700',
  drinks: 'bg-purple-100 text-purple-700',
  expense: 'bg-red-100 text-red-700',
}

const emptyEntry = { date: new Date().toISOString().split('T')[0], category: 'accommodation', description: '', quantity: 1, unit_price: '', amount: '', payment_method: 'cash', notes: '' }

const roomStatusColors = {
  'Occupied': 'bg-blue-100 text-blue-700',
  'Available': 'bg-green-100 text-green-700',
  'Cleaning': 'bg-amber-100 text-amber-700',
  'Maintenance': 'bg-red-100 text-red-700',
}

const categoryColors = {
  'Neatness': 'bg-sky-100 text-sky-700',
  'Safety': 'bg-red-100 text-red-700',
  'Hospitality': 'bg-purple-100 text-purple-700',
}

export default function NemokOps() {
  const [activeTab, setActiveTab] = useState('Occupancy')
  const { data: rooms, update: updateRoom } = useSupabase('rooms', 'nl_rooms', [])
  const { data: standardsState, update: updateStandard } = useSupabase('hospitality_standards', 'nl_standards', [])
  const { data: notes, insert: insertNote, update: updateNote } = useSupabase('lodge_notes', 'nl_notes', [])
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [toast, setToast] = useState({ visible: false, message: '' })

  function notify(msg) { setToast({ visible: true, message: msg }) }

  async function cycleRoomStatus(id) {
    const cycle = { 'Available': 'Occupied', 'Occupied': 'Cleaning', 'Cleaning': 'Available', 'Maintenance': 'Available' }
    const r = rooms.find(r => r.id === id)
    if (r) { await updateRoom(id, { status: cycle[r.status] }); notify('Room status updated') }
  }

  async function toggleStandard(id) {
    const s = standardsState.find(s => s.id === id)
    if (s) await updateStandard(id, { done: !s.done })
  }

  async function addNote() {
    if (!newNote.trim()) return
    const row = await insertNote({ note: newNote, date: new Date().toISOString().split('T')[0], resolved: false })
    if (row) { setNewNote(''); setShowNoteForm(false); notify('Note added') }
  }

  async function toggleNote(id) {
    const n = notes.find(n => n.id === id)
    if (n) { await updateNote(id, { resolved: !n.resolved }); notify('Note status updated') }
  }

  // Revenue log
  const { data: allLogs, insert: insertLog, remove: removeLog } = useSupabase('activity_logs', 'nl_revenue', [])
  const lodgeLogs = useMemo(() => allLogs.filter(l => l.subsidiary === 'Nemok Lodge').sort((a, b) => new Date(b.date) - new Date(a.date)), [allLogs])
  const [showRevForm, setShowRevForm] = useState(false)
  const [revEntry, setRevEntry] = useState({ ...emptyEntry })
  const [revDateFilter, setRevDateFilter] = useState('')

  async function addRevEntry() {
    if (!revEntry.description || !revEntry.amount) return
    const row = { subsidiary: 'Nemok Lodge', ...revEntry, amount: parseFloat(revEntry.amount) || 0, quantity: parseInt(revEntry.quantity) || 1, unit_price: parseFloat(revEntry.unit_price) || null }
    const result = await insertLog(row)
    if (result) { setRevEntry({ ...emptyEntry }); setShowRevForm(false); notify('Entry added') }
  }

  async function deleteRevEntry(id) { await removeLog(id); notify('Entry deleted') }

  const filteredLogs = revDateFilter ? lodgeLogs.filter(l => l.date === revDateFilter) : lodgeLogs
  const revDates = [...new Set(lodgeLogs.map(l => l.date))].sort((a, b) => b.localeCompare(a))

  function revTotals(entries) {
    const cash = entries.filter(e => e.payment_method === 'cash' && e.category !== 'expense').reduce((s, e) => s + (parseFloat(e.amount) || 0), 0)
    const momo = entries.filter(e => e.payment_method === 'momo' && e.category !== 'expense').reduce((s, e) => s + (parseFloat(e.amount) || 0), 0)
    const exp = entries.filter(e => e.category === 'expense').reduce((s, e) => s + (parseFloat(e.amount) || 0), 0)
    return { cash, momo, exp, net: cash + momo - exp }
  }

  const occupied = rooms.filter(r => r.status === 'Occupied').length
  const available = rooms.filter(r => r.status === 'Available').length
  const occupancyPct = rooms.length ? Math.round((occupied / rooms.length) * 100) : 0
  const standardsDone = standardsState.filter(s => s.done).length

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center">
          <Hotel size={20} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Nemok Lodge — Operations</h1>
          <p className="text-slate-400 text-xs">Occupancy, hospitality standards & operational notes</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Rooms Occupied</div>
          <div className="text-2xl font-extrabold text-blue-600">{occupied} / {rooms.length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Occupancy Rate</div>
          <div className="text-2xl font-extrabold text-slate-800">{occupancyPct}%</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Standards Met</div>
          <div className="text-2xl font-extrabold text-green-600">{standardsDone}/{standardsState.length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Open Notes</div>
          <div className="text-2xl font-extrabold text-amber-600">{notes.filter(n => !n.resolved).length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Occupancy */}
        {activeTab === 'Occupancy' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Bed size={16} /> Room Status</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Occupied</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Available</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Cleaning</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Maintenance</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Room', 'Type', 'Status', 'Guest', 'Check-In', 'Check-Out', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-700">{room.number}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{room.type}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roomStatusColors[room.status]}`}>{room.status}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{room.guest}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{room.check_in}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{room.check_out}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => cycleRoomStatus(room.id)} className="text-xs text-blue-600 hover:underline">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Revenue Log */}
        {activeTab === 'Revenue Log' && (() => {
          const allTotals = revTotals(filteredLogs)
          return (
            <div>
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
                <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><DollarSign size={16} /> Daily Revenue & Expenses</h2>
                <div className="flex items-center gap-2 ml-auto">
                  <select value={revDateFilter} onChange={e => setRevDateFilter(e.target.value)}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-300">
                    <option value="">All Dates</option>
                    {revDates.map(d => <option key={d} value={d}>{new Date(d + 'T00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</option>)}
                  </select>
                  <button onClick={() => setShowRevForm(!showRevForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                    <Plus size={13} /> Add Entry
                  </button>
                </div>
              </div>

              {/* Totals bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 bg-slate-50 border-b border-slate-100">
                <div className="text-center"><div className="text-xs text-green-500">Cash</div><div className="text-lg font-bold text-green-700">GH₵ {allTotals.cash.toFixed(2)}</div></div>
                <div className="text-center"><div className="text-xs text-blue-500">MoMo</div><div className="text-lg font-bold text-blue-700">GH₵ {allTotals.momo.toFixed(2)}</div></div>
                <div className="text-center"><div className="text-xs text-red-500">Expenses</div><div className="text-lg font-bold text-red-600">GH₵ {allTotals.exp.toFixed(2)}</div></div>
                <div className="text-center"><div className="text-xs text-slate-500">Net</div><div className="text-lg font-bold text-slate-800">GH₵ {allTotals.net.toFixed(2)}</div></div>
              </div>

              {/* Add form */}
              {showRevForm && (
                <div className="p-5 border-b border-slate-100 bg-amber-50">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Date</label>
                      <input type="date" value={revEntry.date} onChange={e => setRevEntry({...revEntry, date: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Category</label>
                      <select value={revEntry.category} onChange={e => setRevEntry({...revEntry, category: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                        <option value="accommodation">Accommodation</option>
                        <option value="food">Food</option>
                        <option value="drinks">Drinks</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-500 mb-1">Description</label>
                      <input placeholder="e.g. Rm 10 - Mr Gyasi (1 night)" value={revEntry.description} onChange={e => setRevEntry({...revEntry, description: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Qty</label>
                      <input type="number" value={revEntry.quantity} onChange={e => setRevEntry({...revEntry, quantity: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Amount (GH₵)</label>
                      <input type="number" step="0.01" placeholder="0.00" value={revEntry.amount} onChange={e => setRevEntry({...revEntry, amount: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Payment</label>
                      <select value={revEntry.payment_method} onChange={e => setRevEntry({...revEntry, payment_method: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                        <option value="cash">Cash</option>
                        <option value="momo">MoMo</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button onClick={addRevEntry} className="w-full bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-amber-600">Save</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Entries grouped by date */}
              <div className="p-5 space-y-4">
                {filteredLogs.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-6">No entries yet</p>
                ) : (
                  revDates.filter(d => !revDateFilter || d === revDateFilter).map(date => {
                    const dayEntries = filteredLogs.filter(l => l.date === date)
                    const dayTotals = revTotals(dayEntries)
                    return (
                      <div key={date} className="border border-slate-100 rounded-xl overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600">
                            {new Date(date + 'T00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="text-xs font-bold text-slate-700">Net: GH₵ {dayTotals.net.toFixed(2)}</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                          {dayEntries.map(entry => (
                            <div key={entry.id} className="px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${revCatColors[entry.category] || 'bg-slate-100 text-slate-500'}`}>
                                {entry.category}
                              </span>
                              <span className="flex-1 text-sm text-slate-700 truncate">{entry.description}</span>
                              <span className={`text-sm font-semibold ${entry.category === 'expense' ? 'text-red-600' : 'text-slate-800'}`}>
                                {entry.category === 'expense' ? '-' : ''}GH₵ {parseFloat(entry.amount).toFixed(2)}
                              </span>
                              <span className="text-[10px] text-slate-400 w-10">{entry.payment_method}</span>
                              <button onClick={() => deleteRevEntry(entry.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={13} /></button>
                            </div>
                          ))}
                        </div>
                        <div className="bg-slate-50 px-4 py-2 flex items-center gap-4 text-xs">
                          <span className="text-green-600">Cash: GH₵ {dayTotals.cash.toFixed(2)}</span>
                          <span className="text-blue-600">MoMo: GH₵ {dayTotals.momo.toFixed(2)}</span>
                          {dayTotals.exp > 0 && <span className="text-red-600">Exp: GH₵ {dayTotals.exp.toFixed(2)}</span>}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })()}

        {/* Hospitality Standards */}
        {activeTab === 'Hospitality Standards' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Star size={16} /> Daily Standards Checklist</h2>
              <span className="text-xs text-slate-500">{standardsDone}/{standardsState.length} met</span>
            </div>
            <div className="p-5 space-y-4">
              {['Neatness', 'Safety', 'Hospitality'].map(cat => (
                <div key={cat}>
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${categoryColors[cat]}`}>{cat}</span>
                  <div className="space-y-2">
                    {standardsState.filter(s => s.category === cat).map(item => (
                      <div key={item.id} onClick={() => toggleStandard(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${item.done ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                        {item.done
                          ? <CheckCircle size={17} className="text-green-500 shrink-0" />
                          : <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                        }
                        <span className={`text-sm ${item.done ? 'text-green-700 line-through' : 'text-slate-700'}`}>{item.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {activeTab === 'Notes' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm">Operational Notes</h2>
              <button onClick={() => setShowNoteForm(!showNoteForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Note
              </button>
            </div>
            {showNoteForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50 flex gap-3">
                <input
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="Enter operational note or observation..."
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <button onClick={addNote} className="bg-amber-500 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-amber-600">Save</button>
              </div>
            )}
            <div className="p-5 space-y-3">
              {notes.map(note => (
                <div key={note.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${note.resolved ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200'}`}>
                  <button onClick={() => toggleNote(note.id)} className="shrink-0 mt-0.5">
                    {note.resolved
                      ? <CheckCircle size={17} className="text-green-500" />
                      : <div className="w-4 h-4 rounded-full border-2 border-amber-400" />
                    }
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm ${note.resolved ? 'line-through text-slate-400' : 'text-slate-700'}`}>{note.note}</p>
                    <span className="text-xs text-slate-400 mt-1">{note.date}</span>
                  </div>
                  {note.resolved && <span className="text-xs text-green-600 font-semibold">Resolved</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
