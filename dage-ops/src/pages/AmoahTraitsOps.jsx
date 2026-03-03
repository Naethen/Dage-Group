import { useState } from 'react'
import { Hammer, Plus, MapPin, ShoppingBag, Trash2 } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'
import Toast from '../components/Toast'

const TABS = ['Construction Leads', 'Retailer Partners', 'Materials Catalog']

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
  const [activeTab, setActiveTab] = useState('Construction Leads')
  const { data: leads, insert: insertLead, update: updateLead, remove: removeLead } = useSupabase('leads', 'at_leads', [])
  const { data: retailers, insert: insertRetailer, update: updateRetailer, remove: removeRetailer } = useSupabase('retailers', 'at_retailers', [])
  const { data: catalog, update: updateMaterial } = useSupabase('materials', 'at_catalog', [])
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showRetailerForm, setShowRetailerForm] = useState(false)
  const [newLead, setNewLead] = useState({ site: '', contact: '', phone: '', location: '', product: '' })
  const [newRetailer, setNewRetailer] = useState({ name: '', location: '', phone: '', products: '' })

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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Total Leads</div>
          <div className="text-2xl font-extrabold text-slate-800">{leads.length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Converted</div>
          <div className="text-2xl font-extrabold text-green-600">{leads.filter(l => l.status === 'Converted').length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Active Retailers</div>
          <div className="text-2xl font-extrabold text-slate-800">{retailers.filter(r => r.status === 'Active').length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Products Listed</div>
          <div className="text-2xl font-extrabold text-slate-800">{catalog.length}</div>
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
