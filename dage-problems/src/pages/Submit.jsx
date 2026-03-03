import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Send, Search, GraduationCap, Hotel, Truck, Hammer, Cake, Landmark, Building2, Copy, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Toast from '../components/Toast'

const channelMeta = {
  schools:        { name: 'Schools', icon: GraduationCap, color: 'from-blue-600 to-blue-800' },
  'nemok-lodge':  { name: 'Nemok Lodge', icon: Hotel, color: 'from-amber-600 to-amber-800' },
  'city-xpress':  { name: 'City Xpress', icon: Truck, color: 'from-orange-600 to-orange-800' },
  'amoah-traits': { name: 'Amoah Traits', icon: Hammer, color: 'from-stone-600 to-stone-800' },
  'dage-bakery':  { name: 'Dage Bakery', icon: Cake, color: 'from-rose-600 to-rose-800' },
  'credit-union': { name: 'Credit Union', icon: Landmark, color: 'from-green-600 to-green-800' },
  general:        { name: 'General / HQ', icon: Building2, color: 'from-slate-600 to-slate-800' },
}

export default function Submit() {
  const { subsidiary } = useParams()
  const meta = channelMeta[subsidiary]
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [refNumber, setRefNumber] = useState(null)
  const [copied, setCopied] = useState(false)

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-2">Channel Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline text-sm">Back to channels</Link>
        </div>
      </div>
    )
  }

  const Icon = meta.icon

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    const fd = new FormData(e.target)
    const data = {}
    fd.forEach((v, k) => { data[k] = v })

    const row = {
      subsidiary: meta.name,
      type: data.type || 'Problem',
      priority: data.priority || 'Medium',
      subject: data.subject,
      description: data.description,
      location: data.location || null,
      name: data.name || null,
      contact: data.contact || null,
      status: 'Open',
    }

    const { data: inserted, error } = await supabase.from('issues').insert(row).select('id').single()
    setSubmitting(false)

    if (error) {
      setToast({ visible: true, message: 'Failed to submit. Please try again.' })
      return
    }

    const ref = `DP-${String(inserted.id).padStart(4, '0')}`
    setRefNumber(ref)
    e.target.reset()
  }

  function copyRef() {
    navigator.clipboard.writeText(refNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <header className="bg-navy text-white py-4 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <AlertTriangle size={22} className="text-gold" />
          <span className="font-extrabold text-lg tracking-tight">Dage Problems</span>
        </Link>
        <Link to="/track" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
          <Search size={15} /> Track Issue
        </Link>
      </header>

      {/* Channel Banner */}
      <div className={`bg-gradient-to-r ${meta.color} py-10`}>
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={14} /> All Channels
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-3">
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">{meta.name}</h1>
              <p className="text-white/70 text-sm">Submit a problem, suggestion, or feedback</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Success State */}
        {refNumber ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center animate-[slideUp_0.3s_ease-out]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-navy mb-2">Issue Submitted</h2>
            <p className="text-gray-500 mb-6">Your issue has been recorded. Use the reference number below to track its status.</p>
            <div className="bg-slate-50 rounded-xl p-4 inline-flex items-center gap-3 mb-6">
              <span className="text-2xl font-mono font-bold text-navy">{refNumber}</span>
              <button onClick={copyRef} className="text-slate-400 hover:text-navy transition-colors" title="Copy reference">
                {copied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-6">Save this reference number — you'll need it to track your issue.</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setRefNumber(null)} className="text-sm font-medium text-blue-600 hover:underline">
                Submit Another
              </button>
              <Link to="/track" className="text-sm font-medium bg-navy text-white px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-colors">
                Track Issue
              </Link>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 animate-[slideUp_0.3s_ease-out]">
            <div>
              <h2 className="text-xl font-bold text-navy mb-1">Describe the Issue</h2>
              <p className="text-gray-400 text-sm">All fields marked with * are required. Name and contact are optional for anonymous submissions.</p>
            </div>

            {/* Type & Priority */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select name="type" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                  <option value="Problem">Problem</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                <select name="priority" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                  <option value="Low">Low</option>
                  <option value="Medium" selected>Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input name="subject" type="text" required placeholder="Brief title for the issue" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" rows={5} required placeholder="Describe the problem or suggestion in detail..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location / Department <span className="text-gray-400">(optional)</span></label>
              <input name="location" type="text" placeholder="e.g. Kitchen, Room 12, Accra-Kumasi route" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-400 mb-4">Leave blank to submit anonymously.</p>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name <span className="text-gray-400">(optional)</span></label>
                  <input name="name" type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone <span className="text-gray-400">(optional)</span></label>
                  <input name="contact" type="text" placeholder="For follow-up" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : <><Send size={16} /> Submit Issue</>}
            </button>
          </form>
        )}
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
