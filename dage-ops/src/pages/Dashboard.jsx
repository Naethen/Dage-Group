import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, Hammer, GraduationCap, Hotel, TrendingUp, AlertCircle, CheckCircle, Clock, ArrowRight, Plus, Trash2 } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'

function ls(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}

export default function Dashboard() {
  const { data: reminders, insert: insertReminder, update: updateReminder, remove: removeReminder } = useSupabase('reminders', 'gm_reminders', [])
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState('')
  const [newPriority, setNewPriority] = useState('medium')

  const trucks = ls('cx_trucks', [])
  const payments = ls('cx_payments', [])
  const leads = ls('at_leads', [])
  const retailers = ls('at_retailers', [])
  const checkItems = ls('sch_checklist_flat', [])
  const rooms = ls('nl_rooms', [])
  const notes = ls('nl_notes', [])

  const trucksOnRoute = trucks.filter(t => t.status === 'On Route').length
  const pendingPayments = payments.filter(p => p.status !== 'Paid').length
  const openLeads = leads.filter(l => l.status !== 'Converted').length
  const activeRetailers = retailers.filter(r => r.status === 'Active').length
  const openCheckItems = checkItems.filter(i => !i.done).length
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length
  const openNotes = notes.filter(n => !n.resolved).length

  const openActions = reminders.filter(r => !r.done).length

  const subsidiaryCards = [
    {
      name: 'City Xpress', path: '/ops/city-xpress', icon: Truck,
      color: 'bg-orange-100 text-orange-600 border-orange-200',
      metrics: [
        { label: 'Trucks on Route', value: trucksOnRoute },
        { label: 'Pending Payments', value: pendingPayments },
      ],
      status: trucksOnRoute > 0 ? 'Active' : 'Idle',
      statusColor: trucksOnRoute > 0 ? 'text-green-600 bg-green-100' : 'text-slate-500 bg-slate-100',
    },
    {
      name: 'Amoah Traits', path: '/ops/amoah-traits', icon: Hammer,
      color: 'bg-stone-100 text-stone-600 border-stone-200',
      metrics: [
        { label: 'Open Leads', value: openLeads },
        { label: 'Active Retailers', value: activeRetailers },
      ],
      status: openLeads > 0 ? 'Leads Open' : 'Active',
      statusColor: openLeads > 0 ? 'text-amber-600 bg-amber-100' : 'text-green-600 bg-green-100',
    },
    {
      name: 'Schools', path: '/ops/schools', icon: GraduationCap,
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      metrics: [
        { label: 'Unchecked Items', value: openCheckItems },
        { label: 'Total Check Items', value: checkItems.length },
      ],
      status: openCheckItems > 5 ? 'Review Needed' : 'On Track',
      statusColor: openCheckItems > 5 ? 'text-amber-600 bg-amber-100' : 'text-green-600 bg-green-100',
    },
    {
      name: 'Nemok Lodge', path: '/ops/nemok-lodge', icon: Hotel,
      color: 'bg-amber-100 text-amber-600 border-amber-200',
      metrics: [
        { label: 'Rooms Occupied', value: occupiedRooms },
        { label: 'Open Notes', value: openNotes },
      ],
      status: occupiedRooms > 0 ? 'Active' : 'Quiet',
      statusColor: occupiedRooms > 0 ? 'text-green-600 bg-green-100' : 'text-slate-500 bg-slate-100',
    },
  ]

  async function toggleReminder(id) {
    const r = reminders.find(r => r.id === id)
    if (r) await updateReminder(id, { done: !r.done })
  }

  async function deleteReminder(id) {
    await removeReminder(id)
  }

  async function addReminder() {
    if (!newItem.trim()) return
    const row = await insertReminder({ text: newItem, priority: newPriority, done: false })
    if (row) { setNewItem(''); setNewPriority('medium'); setShowAdd(false) }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">GM Overview</h1>
        <p className="text-slate-500 text-sm mt-1">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Subsidiaries', value: '6', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
          { label: 'Trucks on Road', value: String(trucksOnRoute), icon: Truck, color: 'text-orange-600 bg-orange-50' },
          { label: 'Open Action Items', value: String(openActions), icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
          { label: 'Completed Tasks', value: String(reminders.filter(r => r.done).length), icon: CheckCircle, color: 'text-green-600 bg-green-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-extrabold text-slate-800">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Subsidiary Cards */}
      <div>
        <h2 className="text-base font-bold text-slate-700 mb-3">Subsidiary Operations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subsidiaryCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.name} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{card.name}</div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${card.statusColor}`}>{card.status}</span>
                    </div>
                  </div>
                  <Link to={card.path} className="text-slate-400 hover:text-slate-700">
                    <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {card.metrics.map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-3">
                      <div className="text-lg font-extrabold text-slate-800">{value}</div>
                      <div className="text-xs text-slate-500">{label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  to={card.path}
                  className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-800"
                >
                  Open Operations <ArrowRight size={12} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reminders / Action Items */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-700">Action Items & Reminders</h2>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
            <Plus size={13} /> Add
          </button>
        </div>
        {showAdd && (
          <div className="flex gap-2 mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
            <input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="New action item..."
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            <select value={newPriority} onChange={e => setNewPriority(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={addReminder} className="bg-amber-500 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-amber-600">Save</button>
          </div>
        )}
        <div className="space-y-2">
          {reminders.map((item) => (
            <div key={item.id} className={`flex items-start gap-3 p-3 rounded-xl border ${item.done ? 'opacity-50 bg-slate-50 border-slate-100' : 'bg-white border-slate-100'}`}>
              <button onClick={() => toggleReminder(item.id)}
                className={`w-4 h-4 rounded-full shrink-0 mt-0.5 border-2 flex items-center justify-center
                ${item.done ? 'bg-green-500 border-green-500' : item.priority === 'high' ? 'border-red-400' : item.priority === 'medium' ? 'border-amber-400' : 'border-slate-300'}`}>
                {item.done && <CheckCircle size={10} className="text-white" />}
              </button>
              <div className="flex-1">
                <p className={`text-sm ${item.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{item.text}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0
                ${item.priority === 'high' ? 'bg-red-100 text-red-600' : item.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                {item.priority}
              </span>
              <button onClick={() => deleteReminder(item.id)} className="text-slate-300 hover:text-red-500 shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {reminders.length === 0 && <p className="text-sm text-slate-400 text-center py-4">No action items. Add one above.</p>}
        </div>
      </div>
    </div>
  )
}
