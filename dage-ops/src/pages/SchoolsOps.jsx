import { useState } from 'react'
import { GraduationCap, CheckSquare, FileText, Users, Plus, CheckCircle, XCircle } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'
import Toast from '../components/Toast'

const TABS = ['Inspection Checklist', 'Policies', 'Staff Notes']

const policies = [
  { id: 1, title: 'Staff Dress Code Policy', school: 'Both Schools', lastUpdated: '2025-01-15', status: 'Active', content: 'All teaching staff must wear the school-approved attire on all weekdays. Smart casual is permitted on Fridays. No open-toe shoes. ID cards must be worn at all times.' },
  { id: 2, title: 'Student Discipline Policy', school: 'Both Schools', lastUpdated: '2025-01-10', status: 'Active', content: 'Student misconduct is handled through a 3-step warning system. Suspension requires head teacher approval. All incidents must be logged in the disciplinary register.' },
  { id: 3, title: 'Parental Communication Policy', school: 'Both Schools', lastUpdated: '2025-02-01', status: 'Active', content: 'Parents are notified of all academic and behavioural matters within 48 hours. Parent-teacher meetings are held once per term. An emergency contact must be on file for all pupils.' },
  { id: 4, title: 'Safety & Risk Policy (Pupils)', school: 'Montessori', lastUpdated: '2024-12-05', status: 'Review Due', content: 'Risk assessments for all outdoor activities. Two staff members must accompany any pupil movement outside the classroom. First aid kits must be stocked and accessible.' },
  { id: 5, title: 'GES Compliance Checklist', school: 'Galaxy', lastUpdated: '2025-02-20', status: 'Active', content: 'Annual GES inspection requirements: updated pupil registers, qualified teacher certifications, school health records, and BECE preparation documentation.' },
  { id: 6, title: 'SSNIT & GRA Compliance', school: 'Both Schools', lastUpdated: '2025-03-01', status: 'Active', content: 'Monthly SSNIT contributions must be paid by the 14th of each month. GRA filing is quarterly. All staff must be registered with their respective tax IDs.' },
]

const categoryColors = {
  'Ambience': 'bg-blue-100 text-blue-700',
  'People': 'bg-purple-100 text-purple-700',
  'Assets': 'bg-amber-100 text-amber-700',
  'Stakeholders': 'bg-green-100 text-green-700',
}

export default function SchoolsOps() {
  const [activeTab, setActiveTab] = useState('Inspection Checklist')
  const [activeSchool, setActiveSchool] = useState('montessori')
  const { data: allCheckItems, update: updateCheckItem } = useSupabase('checklist_items', 'sch_checklist_flat', [])
  const { data: staffNotes, insert: insertNote, update: updateNote } = useSupabase('staff_notes', 'sch_notes', [])
  const [expandedPolicy, setExpandedPolicy] = useState(null)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [newNote, setNewNote] = useState({ school: 'Both', note: '' })
  const [toast, setToast] = useState({ visible: false, message: '' })

  function notify(msg) { setToast({ visible: true, message: msg }) }

  async function toggleCheckItem(id) {
    const item = allCheckItems.find(i => i.id === id)
    if (item) await updateCheckItem(id, { done: !item.done })
  }

  async function addStaffNote() {
    if (!newNote.note) return
    const row = await insertNote({ ...newNote, date: new Date().toISOString().split('T')[0], resolved: false })
    if (row) {
      setNewNote({ school: 'Both', note: '' })
      setShowNoteForm(false)
      notify('Staff note added')
    }
  }

  async function toggleNote(id) {
    const n = staffNotes.find(n => n.id === id)
    if (n) { await updateNote(id, { resolved: !n.resolved }); notify('Note status updated') }
  }

  const currentList = allCheckItems.filter(i => i.school === activeSchool)
  const done = currentList.filter(i => i.done).length
  const pct = currentList.length ? Math.round((done / currentList.length) * 100) : 0

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
          <GraduationCap size={20} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Schools — Operations</h1>
          <p className="text-slate-400 text-xs">Inspection checklists, policies & staff notes</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Montessori — Done</div>
          <div className="text-2xl font-extrabold text-slate-800">
            {allCheckItems.filter(i => i.school === 'montessori' && i.done).length}/{allCheckItems.filter(i => i.school === 'montessori').length}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Galaxy — Done</div>
          <div className="text-2xl font-extrabold text-slate-800">
            {allCheckItems.filter(i => i.school === 'galaxy' && i.done).length}/{allCheckItems.filter(i => i.school === 'galaxy').length}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Active Policies</div>
          <div className="text-2xl font-extrabold text-slate-800">{policies.filter(p => p.status === 'Active').length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Open Staff Notes</div>
          <div className="text-2xl font-extrabold text-amber-600">{staffNotes.filter(n => !n.resolved).length}</div>
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

        {/* Inspection Checklist */}
        {activeTab === 'Inspection Checklist' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <button onClick={() => setActiveSchool('montessori')}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeSchool === 'montessori' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  Montessori
                </button>
                <button onClick={() => setActiveSchool('galaxy')}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeSchool === 'galaxy' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  Galaxy
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">{done}/{currentList.length} items completed</span>
                  <span className={`text-xs font-bold ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {['Ambience', 'People', 'Assets', 'Stakeholders'].map(cat => (
                <div key={cat}>
                  <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${categoryColors[cat]}`}>
                    {cat}
                  </div>
                  <div className="space-y-2">
                    {currentList.filter(i => i.category === cat).map(item => (
                      <div key={item.id} onClick={() => toggleCheckItem(item.id)}
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

        {/* Policies */}
        {activeTab === 'Policies' && (
          <div className="divide-y divide-slate-100">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><FileText size={16} /> Policy Documents</h2>
            </div>
            {policies.map(policy => (
              <div key={policy.id} className="p-5">
                <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-800 text-sm">{policy.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${policy.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{policy.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-400">{policy.school}</span>
                      <span className="text-xs text-slate-400">Updated: {policy.lastUpdated}</span>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-medium shrink-0">{expandedPolicy === policy.id ? 'Collapse ↑' : 'View ↓'}</span>
                </div>
                {expandedPolicy === policy.id && (
                  <div className="mt-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed">{policy.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Staff Notes */}
        {activeTab === 'Staff Notes' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Users size={16} /> Staff Notes & Observations</h2>
              <button onClick={() => setShowNoteForm(!showNoteForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Note
              </button>
            </div>
            {showNoteForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50 space-y-3">
                <div className="flex gap-3">
                  <select value={newNote.school} onChange={e => setNewNote({...newNote, school: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                    <option>Both</option>
                    <option>Montessori</option>
                    <option>Galaxy</option>
                  </select>
                  <input placeholder="Note / Observation" value={newNote.note} onChange={e => setNewNote({...newNote, note: e.target.value})} className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <button onClick={addStaffNote} className="bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-amber-600 whitespace-nowrap">Save</button>
                </div>
              </div>
            )}
            <div className="p-5 space-y-3">
              {staffNotes.map(note => (
                <div key={note.id} className={`flex items-start gap-3 p-4 rounded-xl border ${note.resolved ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200'}`}>
                  <button onClick={() => toggleNote(note.id)} className="shrink-0 mt-0.5">
                    {note.resolved
                      ? <CheckCircle size={17} className="text-green-500" />
                      : <div className="w-4 h-4 rounded-full border-2 border-amber-400" />
                    }
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm ${note.resolved ? 'line-through text-slate-400' : 'text-slate-700'}`}>{note.note}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-blue-600 font-medium">{note.school}</span>
                      <span className="text-xs text-slate-400">{note.date}</span>
                    </div>
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
