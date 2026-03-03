import { useState } from 'react'
import { Truck, Fuel, DollarSign, Users, Target, Plus, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'
import Toast from '../components/Toast'

const TABS = ['Truck Log', 'Fuel Tracker', 'Payments', 'KPI Targets', 'Recruitment']

function statusBadge(status) {
  const map = {
    'On Route': 'bg-blue-100 text-blue-700',
    'Available': 'bg-green-100 text-green-700',
    'Maintenance': 'bg-red-100 text-red-700',
    'Paid': 'bg-green-100 text-green-700',
    'Pending': 'bg-amber-100 text-amber-700',
    'Overdue': 'bg-red-100 text-red-700',
    'Interviewed': 'bg-blue-100 text-blue-700',
    'Hired': 'bg-green-100 text-green-700',
  }
  return map[status] || 'bg-slate-100 text-slate-600'
}

export default function CityXpressOps() {
  const [activeTab, setActiveTab] = useState('Truck Log')
  const { data: trucks, update: updateTruck } = useSupabase('trucks', 'cx_trucks', [])
  const { data: fuelLogs, insert: insertFuel, remove: removeFuel } = useSupabase('fuel_logs', 'cx_fuel', [])
  const { data: payments, insert: insertPayment, update: updatePayment } = useSupabase('payments', 'cx_payments', [])
  const { data: kpis } = useSupabase('kpi_targets', 'cx_kpis', [])
  const { data: applicants, update: updateApplicant } = useSupabase('applicants', 'cx_applicants', [])
  const [toast, setToast] = useState({ visible: false, message: '' })

  const [newFuel, setNewFuel] = useState({ truck: '', date: '', litres: '', cost: '', station: '' })
  const [newPayment, setNewPayment] = useState({ client: '', amount: '', date: '', ref: '' })
  const [showFuelForm, setShowFuelForm] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  function notify(msg) { setToast({ visible: true, message: msg }) }

  async function addFuelLog() {
    if (!newFuel.truck || !newFuel.date || !newFuel.litres) return
    const row = await insertFuel({ truck: newFuel.truck, date: newFuel.date, litres: +newFuel.litres, cost: +newFuel.cost, station: newFuel.station })
    if (row) {
      setNewFuel({ truck: '', date: '', litres: '', cost: '', station: '' })
      setShowFuelForm(false)
      notify('Fuel log added')
    }
  }

  async function addPayment() {
    if (!newPayment.client || !newPayment.amount) return
    const row = await insertPayment({ client: newPayment.client, amount: +newPayment.amount, date: newPayment.date || null, ref: newPayment.ref, status: 'Pending' })
    if (row) {
      setNewPayment({ client: '', amount: '', date: '', ref: '' })
      setShowPaymentForm(false)
      notify('Payment recorded')
    }
  }

  async function deleteFuelLog(id) {
    const ok = await removeFuel(id)
    if (ok) notify('Fuel log deleted')
  }

  async function cyclePaymentStatus(id) {
    const cycle = { 'Pending': 'Paid', 'Paid': 'Overdue', 'Overdue': 'Pending' }
    const p = payments.find(p => p.id === id)
    if (p) {
      await updatePayment(id, { status: cycle[p.status] })
      notify('Payment status updated')
    }
  }

  async function cycleTruckStatus(id) {
    const cycle = { 'Available': 'On Route', 'On Route': 'Maintenance', 'Maintenance': 'Available' }
    const t = trucks.find(t => t.id === id)
    if (t) {
      await updateTruck(id, { status: cycle[t.status] })
      notify('Truck status updated')
    }
  }

  async function cycleApplicantStatus(id) {
    const cycle = { 'Pending': 'Interviewed', 'Interviewed': 'Hired', 'Hired': 'Pending' }
    const a = applicants.find(a => a.id === id)
    if (a) {
      await updateApplicant(id, { status: cycle[a.status] })
      notify('Applicant status updated')
    }
  }

  const totalFuelCost = fuelLogs.reduce((s, l) => s + (+l.cost), 0)
  const totalPending = payments.filter(p => p.status !== 'Paid').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center">
          <Truck size={20} className="text-orange-600" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">City Xpress — Operations</h1>
          <p className="text-slate-400 text-xs">Truck management, fuel, payments & recruitment</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Trucks Active</div>
          <div className="text-2xl font-extrabold text-slate-800">{trucks.filter(t => t.status === 'On Route').length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Available</div>
          <div className="text-2xl font-extrabold text-green-600">{trucks.filter(t => t.status === 'Available').length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Fuel Cost (Month)</div>
          <div className="text-2xl font-extrabold text-slate-800">GH₵ {totalFuelCost.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Pending Payments</div>
          <div className="text-2xl font-extrabold text-amber-600">GH₵ {totalPending.toLocaleString()}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-full overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Truck Log */}
        {activeTab === 'Truck Log' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Truck size={16} /> Fleet Status</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Plate', 'Driver', 'Status', 'Route', 'Last Update', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trucks.map(truck => (
                    <tr key={truck.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-semibold text-slate-700">{truck.plate}</td>
                      <td className="px-4 py-3 text-slate-600">{truck.driver}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge(truck.status)}`}>{truck.status}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{truck.route}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{truck.last_update}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => cycleTruckStatus(truck.id)} className="text-xs text-blue-600 hover:underline">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fuel Tracker */}
        {activeTab === 'Fuel Tracker' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Fuel size={16} /> Fuel Logs</h2>
              <button onClick={() => setShowFuelForm(!showFuelForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Log
              </button>
            </div>
            {showFuelForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <select value={newFuel.truck} onChange={e => setNewFuel({...newFuel, truck: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                    <option value="">Select Truck</option>
                    {trucks.map(t => <option key={t.id}>{t.plate}</option>)}
                  </select>
                  <input type="date" value={newFuel.date} onChange={e => setNewFuel({...newFuel, date: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input type="number" placeholder="Litres" value={newFuel.litres} onChange={e => setNewFuel({...newFuel, litres: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input type="number" placeholder="Cost (GH₵)" value={newFuel.cost} onChange={e => setNewFuel({...newFuel, cost: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input type="text" placeholder="Station" value={newFuel.station} onChange={e => setNewFuel({...newFuel, station: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <button onClick={addFuelLog} className="bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-amber-600">Save</button>
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Truck', 'Date', 'Litres', 'Cost (GH₵)', 'Station', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fuelLogs.map(log => (
                    <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-slate-700">{log.truck}</td>
                      <td className="px-4 py-3 text-slate-600">{log.date}</td>
                      <td className="px-4 py-3 text-slate-600">{log.litres}L</td>
                      <td className="px-4 py-3 font-semibold text-slate-700">{Number(log.cost).toLocaleString()}</td>
                      <td className="px-4 py-3 text-slate-500">{log.station}</td>
                      <td className="px-4 py-3"><button onClick={() => deleteFuelLog(log.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50">
                    <td colSpan={3} className="px-4 py-3 text-sm font-bold text-slate-700">Total</td>
                    <td className="px-4 py-3 font-extrabold text-amber-700">GH₵ {totalFuelCost.toLocaleString()}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments */}
        {activeTab === 'Payments' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><DollarSign size={16} /> Payment Tracker</h2>
              <button onClick={() => setShowPaymentForm(!showPaymentForm)} className="flex items-center gap-1 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                <Plus size={13} /> Add Payment
              </button>
            </div>
            {showPaymentForm && (
              <div className="p-5 border-b border-slate-100 bg-amber-50">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input type="text" placeholder="Client Name" value={newPayment.client} onChange={e => setNewPayment({...newPayment, client: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input type="number" placeholder="Amount (GH₵)" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input type="date" value={newPayment.date} onChange={e => setNewPayment({...newPayment, date: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                  <input type="text" placeholder="Reference" value={newPayment.ref} onChange={e => setNewPayment({...newPayment, ref: e.target.value})} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <button onClick={addPayment} className="mt-3 bg-amber-500 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-amber-600">Save Payment</button>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Ref', 'Client', 'Amount', 'Date', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.ref}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700">{p.client}</td>
                      <td className="px-4 py-3 font-semibold">GH₵ {Number(p.amount).toLocaleString()}</td>
                      <td className="px-4 py-3 text-slate-500">{p.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge(p.status)}`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => cyclePaymentStatus(p.id)} className="text-xs text-blue-600 hover:underline">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* KPI Targets */}
        {activeTab === 'KPI Targets' && (
          <div className="p-5 space-y-4">
            <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Target size={16} /> Performance Targets</h2>
            {kpis.map(kpi => {
              const pct = Math.min(100, Math.round((kpi.current / kpi.target) * 100))
              return (
                <div key={kpi.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-700 text-sm">{kpi.label}</span>
                    <span className="text-xs text-slate-500">{kpi.current} / {kpi.target} {kpi.unit}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${pct >= 90 ? 'bg-green-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className={`text-xs font-semibold ${pct >= 90 ? 'text-green-600' : pct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{pct}% of target</span>
                    {pct >= 90 ? <CheckCircle size={14} className="text-green-500" /> : <Clock size={14} className="text-amber-500" />}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Recruitment */}
        {activeTab === 'Recruitment' && (
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Users size={16} /> Recruitment Log</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Applicant', 'Role', 'Phone', 'Date Applied', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applicants.map(a => (
                    <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{a.name}</td>
                      <td className="px-4 py-3 text-slate-500">{a.role}</td>
                      <td className="px-4 py-3 text-slate-500">{a.phone}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{a.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge(a.status)}`}>{a.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => cycleApplicantStatus(a.id)} className="text-xs text-blue-600 hover:underline">Advance</button>
                      </td>
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
