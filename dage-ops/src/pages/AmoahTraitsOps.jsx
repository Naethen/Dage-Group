import { useState, useMemo } from 'react'
import { Hammer, Plus, MapPin, ShoppingBag, Trash2, Factory, DollarSign, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'
import Toast from '../components/Toast'

const TABS = ['Factory', 'Transactions', 'Construction Leads', 'Retailer Partners', 'Materials Catalog']

const emptyProd = { date: new Date().toISOString().split('T')[0], block_size: '6 inch', bags_used: '', blocks_produced: '', notes: '' }
const emptyTx = { date: new Date().toISOString().split('T')[0], category: 'income', description: '', amount: '', payment_method: 'cash', notes: '' }

const statusColors = {
  'Pending': 'bg-amber-100 text-amber-700',
  'Contacted': 'bg-blue-100 text-blue-700',
  'Converted': 'bg-green-100 text-green-700',
  'Active': 'bg-green-100 text-green-700',
  'Prospect': 'bg-amber-100 text-amber-700',
  'In Stock': 'bg-green-100 text-green-700',
  'Low Stock': 'bg-red-100 text-red-700',
  'Out of Stock': 'bg-slate-100 text-slate-500',
}

export default function AmoahTraitsOps() {
  const [activeTab, setActiveTab] = useState('Factory')
  const { data: leads, insert: insertLead, update: updateLead, remove: removeLead } = useSupabase('leads', 'at_leads', [])
  const { data: retailers, insert: insertRetailer, update: updateRetailer, remove: removeRetailer } = useSupabase('retailers', 'at_retailers', [])
  const { data: catalog, update: updateMaterial } = useSupabase('materials', 'at_catalog', [])
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showRetailerForm, setShowRetailerForm] = useState(false)
  const [newLead, setNewLead] = useState({ site: '', contact: '', phone: '', location: '', product: '' })
  const [newRetailer, setNewRetailer] = useState({ name: '', location: '', phone: '', products: '' })

  // Activity logs for AT
  const { data: allLogs, insert: insertLog, remove: removeLog } = useSupabase('activity_logs', 'at_logs', [])
  const atLogs = useMemo(() => allLogs.filter(l => l.subsidiary === 'Amoah Traits').sort((a, b) => new Date(b.date) - new Date(a.date)), [allLogs])
  const factoryLogs = useMemo(() => atLogs.filter(l => l.category === 'production'), [atLogs])
  const txLogs = useMemo(() => atLogs.filter(l => l.category !== 'production'), [atLogs])

  const [showProdForm, setShowProdForm] = useState(false)
  const [prodEntry, setProdEntry] = useState({ ...emptyProd })
  const [showTxForm, setShowTxForm] = useState(false)
  const [txEntry, setTxEntry] = useState({ ...emptyTx })

  async function addProdEntry() {
    if (!prodEntry.bags_used) return
    const row = {
      subsidiary: 'Amoah Traits', date: prodEntry.date, category: 'production',
      description: `${prodEntry.block_size} blocks — ${prodEntry.bags_used} bags`,
      quantity: parseInt(prodEntry.blocks_produced) || 0,
      amount: 0, payment_method: null,
      notes: prodEntry.notes || `${prodEntry.block_size}, ${prodEntry.bags_used} bags, ${prodEntry.blocks_produced} blocks`,
    }
    const result = await insertLog(row)
    if (result) { setProdEntry({ ...emptyProd }); setShowProdForm(false); notify('Production entry added') }
  }

  async function addTxEntry() {
    if (!txEntry.description || !txEntry.amount) return
    const row = { subsidiary: 'Amoah Traits', ...txEntry, amount: parseFloat(txEntry.amount) || 0, quantity: 1, unit_price: null }
    const result = await insertLog(row)
    if (result) { setTxEntry({ ...emptyTx }); setShowTxForm(false); notify('Transaction added') }
  }

  async function deleteLogEntry(id) { await removeLog(id); notify('Entry deleted') }

  function notify(msg) { setToast({ visible: true, message: msg }) }

  async function addLead() {
    if (!newLead.site) return
    const row = await insertLead({ ...newLead, status: 'Pending', date: new Date().toISOString().split('T')[0] })
    if (row) {
      setNewLead({ site: '', contact: '', phone: '', location: '', product: '' })
      setShowLeadForm(false)
      notify('Lead added')
    }
  }

  async function addRetailer() {
    if (!newRetailer.name) return
    const row = await insertRetailer({ ...newRetailer, status: 'Prospect' })
    if (row) {
      setNewRetailer({ name: '', location: '', phone: '', products: '' })
      setShowRetailerForm(false)
      notify('Retailer added')
    }
  }

  async function cycleLeadStatus(id) {
    const cycle = { 'Pending': 'Contacted', 'Contacted': 'Converted', 'Converted': 'Pending' }
    const l = leads.find(l => l.id === id)
    if (l) { await updateLead(id, { status: cycle[l.status] }); notify('Lead status updated') }
  }

  async function cycleRetailerStatus(id) {
    const cycle = { 'Prospect': 'Active', 'Active': 'Prospect' }
    const r = retailers.find(r => r.id === id)
    if (r) { await updateRetailer(id, { status: cycle[r.status] }); notify('Retailer status updated') }
  }

  async function cycleStockStatus(id) {
    const cycle = { 'In Stock': 'Low Stock', 'Low Stock': 'Out of Stock', 'Out of Stock': 'In Stock' }
    const c = catalog.find(c => c.id === id)
    if (c) { await updateMaterial(id, { stock: cycle[c.stock] }); notify('Stock status updated') }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center">
          <Hammer size={20} className="text-stone-600" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Amoah Traits — Operations</h1>
          <p className="text-slate-400 text-xs">Leads, retailer partners & materials catalog</p>
        </div>
      </div>

      {/* Summary */}
      {(() => {
        const totalIncome = txLogs.filter(l => l.category === 'income').reduce((s, l) => s + (parseFloat(l.amount) || 0), 0)
        const totalExpense = txLogs.filter(l => l.category === 'expense').reduce((s, l) => s + (parseFloat(l.amount) || 0), 0)
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-500 mb-1">Production Entries</div>
              <div className="text-2xl font-extrabold text-slate-800">{factoryLogs.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="text-xs text-green-500 mb-1">Total Income</div>
              <div className="text-xl font-extrabold text-green-600">GH₵ {totalIncome.toFixed(2)}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="text-xs text-red-500 mb-1">Total Expenses</div>
              <div className="text-xl font-extrabold text-red-600">GH₵ {totalExpense.toFixed(2)}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-500 mb-1">Net</div>
              <div className={`text-xl font-extrabold ${totalIncome - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}`}>GH₵ {(totalIncome - totalExpense).toFixed(2)}</div>
            </div>
          </div>
        )
      })()}

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

        {/* Factory Production */}
        {activeTab === 'Factory' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Factory size={16} /> Foase/Boko Block Factory — Production Log</h2>
              <button onClick={() => setShowProdForm(!showProdForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Entry
              </button>
            </div>
            {showProdForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Date</label>
                    <input type="date" value={prodEntry.date} onChange={e => setProdEntry({...prodEntry, date: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Block Size</label>
                    <select value={prodEntry.block_size} onChange={e => setProdEntry({...prodEntry, block_size: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                      <option value="5 inch">5 inch</option>
                      <option value="6 inch">6 inch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Bags Used</label>
                    <input type="number" placeholder="0" value={prodEntry.bags_used} onChange={e => setProdEntry({...prodEntry, bags_used: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Blocks Produced</label>
                    <input type="number" placeholder="0" value={prodEntry.blocks_produced} onChange={e => setProdEntry({...prodEntry, blocks_produced: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProdEntry} className="w-full bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-amber-600">Save</button>
                  </div>
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Date', 'Block Size', 'Bags Used', 'Blocks Produced', 'Notes', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factoryLogs.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No production entries yet</td></tr>
                  ) : factoryLogs.map(l => {
                    const parts = (l.notes || '').split(', ')
                    const size = parts[0] || '—'
                    const bags = parts[1] || '—'
                    const blocks = l.quantity || '—'
                    return (
                      <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-600 text-xs">{new Date(l.date + 'T00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</td>
                        <td className="px-4 py-3 font-medium text-slate-700">{size}</td>
                        <td className="px-4 py-3 text-slate-700">{bags}</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{blocks}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs">{l.description}</td>
                        <td className="px-4 py-3"><button onClick={() => deleteLogEntry(l.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={13} /></button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions */}
        {activeTab === 'Transactions' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><DollarSign size={16} /> Income & Expenses</h2>
              <button onClick={() => setShowTxForm(!showTxForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Transaction
              </button>
            </div>
            {showTxForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Date</label>
                    <input type="date" value={txEntry.date} onChange={e => setTxEntry({...txEntry, date: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Type</label>
                    <select value={txEntry.category} onChange={e => setTxEntry({...txEntry, category: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                      <option value="payment">Payment Out</option>
                      <option value="invoice">Invoice</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-500 mb-1">Description</label>
                    <input placeholder="e.g. Cement sales, Loading guys pay" value={txEntry.description} onChange={e => setTxEntry({...txEntry, description: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Amount (GH₵)</label>
                    <input type="number" step="0.01" placeholder="0.00" value={txEntry.amount} onChange={e => setTxEntry({...txEntry, amount: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Payment Method</label>
                    <select value={txEntry.payment_method} onChange={e => setTxEntry({...txEntry, payment_method: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                      <option value="cash">Cash</option>
                      <option value="momo">MoMo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Notes</label>
                    <input placeholder="Optional" value={txEntry.notes} onChange={e => setTxEntry({...txEntry, notes: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addTxEntry} className="w-full bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-amber-600">Save</button>
                  </div>
                </div>
              </div>
            )}
            <div className="divide-y divide-slate-50">
              {txLogs.length === 0 ? (
                <div className="px-4 py-8 text-center text-slate-400 text-sm">No transactions yet</div>
              ) : txLogs.map(l => {
                const isIncome = l.category === 'income'
                const isExpense = l.category === 'expense' || l.category === 'payment'
                return (
                  <div key={l.id} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isIncome ? 'bg-green-50' : isExpense ? 'bg-red-50' : 'bg-blue-50'}`}>
                      {isIncome ? <TrendingUp size={15} className="text-green-600" /> : isExpense ? <TrendingDown size={15} className="text-red-600" /> : <DollarSign size={15} className="text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">{l.description}</div>
                      <div className="text-xs text-slate-400">
                        {new Date(l.date + 'T00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {l.notes && <> · {l.notes}</>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-sm font-bold ${isIncome ? 'text-green-600' : isExpense ? 'text-red-600' : 'text-blue-600'}`}>
                        {isExpense ? '-' : '+'}GH₵ {parseFloat(l.amount).toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400">{l.payment_method}</div>
                    </div>
                    <button onClick={() => deleteLogEntry(l.id)} className="text-slate-300 hover:text-red-500 shrink-0"><Trash2 size={13} /></button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Construction Leads */}
        {activeTab === 'Construction Leads' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><MapPin size={16} /> Site Leads</h2>
              <button onClick={() => setShowLeadForm(!showLeadForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Lead
              </button>
            </div>
            {showLeadForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <input placeholder="Site / Project Name" value={newLead.site} onChange={e => setNewLead({...newLead, site: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input placeholder="Contact Person" value={newLead.contact} onChange={e => setNewLead({...newLead, contact: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input placeholder="Phone" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input placeholder="Location" value={newLead.location} onChange={e => setNewLead({...newLead, location: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input placeholder="Products Needed" value={newLead.product} onChange={e => setNewLead({...newLead, product: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <button onClick={addLead} className="bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-amber-600">Save Lead</button>
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>{['Site / Project', 'Contact', 'Phone', 'Location', 'Products', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {leads.map(l => (
                    <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{l.site}</td>
                      <td className="px-4 py-3 text-slate-600">{l.contact}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{l.phone}</td>
                      <td className="px-4 py-3 text-slate-500">{l.location}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{l.product}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[l.status]}`}>{l.status}</span></td>
                      <td className="px-4 py-3"><button onClick={() => cycleLeadStatus(l.id)} className="text-xs text-blue-600 hover:underline">Advance</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Retailer Partners */}
        {activeTab === 'Retailer Partners' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><ShoppingBag size={16} /> Retailer Network</h2>
              <button onClick={() => setShowRetailerForm(!showRetailerForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Retailer
              </button>
            </div>
            {showRetailerForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input placeholder="Shop / Business Name" value={newRetailer.name} onChange={e => setNewRetailer({...newRetailer, name: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input placeholder="Location" value={newRetailer.location} onChange={e => setNewRetailer({...newRetailer, location: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input placeholder="Phone" value={newRetailer.phone} onChange={e => setNewRetailer({...newRetailer, phone: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input placeholder="Products Supplied" value={newRetailer.products} onChange={e => setNewRetailer({...newRetailer, products: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <button onClick={addRetailer} className="mt-3 bg-amber-500 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-amber-600">Save Retailer</button>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>{['Business', 'Location', 'Phone', 'Products', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {retailers.map(r => (
                    <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{r.name}</td>
                      <td className="px-4 py-3 text-slate-500">{r.location}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{r.phone}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{r.products}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[r.status]}`}>{r.status}</span></td>
                      <td className="px-4 py-3"><button onClick={() => cycleRetailerStatus(r.id)} className="text-xs text-blue-600 hover:underline">Toggle</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Materials Catalog */}
        {activeTab === 'Materials Catalog' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Hammer size={16} /> Product Catalog & Pricing</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>{['Product', 'Unit', 'Price (GH₵)', 'Stock Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {catalog.map(c => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{c.name}</td>
                      <td className="px-4 py-3 text-slate-500">{c.unit}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">GH₵ {c.price.toFixed(2)}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[c.stock]}`}>{c.stock}</span></td>
                      <td className="px-4 py-3"><button onClick={() => cycleStockStatus(c.id)} className="text-xs text-blue-600 hover:underline">Update Stock</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
