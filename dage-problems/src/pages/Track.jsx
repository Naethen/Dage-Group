import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Search, ArrowLeft, Clock, CheckCircle, Eye, XCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const statusConfig = {
  Open:        { icon: AlertCircle, color: 'text-blue-600 bg-blue-50', label: 'Open' },
  'In Review': { icon: Eye, color: 'text-amber-600 bg-amber-50', label: 'In Review' },
  Resolved:    { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Resolved' },
  Closed:      { icon: XCircle, color: 'text-slate-500 bg-slate-50', label: 'Closed' },
}

const priorityColor = {
  Low: 'text-slate-500 bg-slate-50',
  Medium: 'text-blue-600 bg-blue-50',
  High: 'text-orange-600 bg-orange-50',
  Urgent: 'text-red-600 bg-red-50',
}

export default function Track() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [searching, setSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return

    setSearching(true)
    setNotFound(false)
    setResult(null)

    // Extract numeric ID from DP-XXXX format or raw number
    const cleaned = query.trim().toUpperCase().replace('DP-', '')
    const id = parseInt(cleaned, 10)

    if (isNaN(id)) {
      setNotFound(true)
      setSearching(false)
      return
    }

    const { data, error } = await supabase
      .from('issues')
      .select('id, subsidiary, type, priority, subject, description, location, status, response, created_at')
      .eq('id', id)
      .single()

    setSearching(false)

    if (error || !data) {
      setNotFound(true)
      return
    }

    setResult(data)
  }

  const StatusIcon = result ? statusConfig[result.status]?.icon || AlertCircle : null

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <header className="bg-navy text-white py-4 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <AlertTriangle size={22} className="text-gold" />
          <span className="font-extrabold text-lg tracking-tight">Dage Problems</span>
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
          <ArrowLeft size={15} /> Report Issue
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={26} className="text-navy" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy mb-2">Track Your Issue</h1>
          <p className="text-gray-500">Enter your reference number (e.g. DP-0042) to check the status.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="DP-0001"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-300 text-center text-lg tracking-wider"
          />
          <button
            type="submit"
            disabled={searching}
            className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Not Found */}
        {notFound && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center animate-[slideUp_0.3s_ease-out]">
            <XCircle size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy mb-1">Issue Not Found</h3>
            <p className="text-gray-500 text-sm">No issue matches that reference number. Please double-check and try again.</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-[slideUp_0.3s_ease-out]">
            {/* Status Banner */}
            <div className="px-6 py-4 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-gray-400">DP-{String(result.id).padStart(4, '0')}</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm font-medium text-gray-600">{result.subsidiary}</span>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[result.status]?.color || 'text-gray-500 bg-gray-50'}`}>
                {StatusIcon && <StatusIcon size={13} />}
                {result.status}
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Subject */}
              <div>
                <h3 className="text-xl font-bold text-navy mb-1">{result.subject}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${priorityColor[result.priority] || ''}`}>
                    {result.priority}
                  </span>
                  <span>{result.type}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {new Date(result.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{result.description}</p>
              </div>

              {/* Location */}
              {result.location && (
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Location / Department</p>
                  <p className="text-sm text-gray-700">{result.location}</p>
                </div>
              )}

              {/* Response */}
              {result.response && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-1">Management Response</p>
                  <p className="text-sm text-green-800 leading-relaxed">{result.response}</p>
                </div>
              )}

              {/* No response yet */}
              {!result.response && result.status === 'Open' && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm text-blue-700">This issue is open and awaiting review. You'll see a response here once management has reviewed it.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
