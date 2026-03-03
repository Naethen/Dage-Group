import { useState } from 'react'
import { AlertTriangle, Eye, CheckCircle, XCircle, AlertCircle, Send, Trash2, Filter, ChevronDown, MessageSquare } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'
import Toast from '../components/Toast'

const statusOptions = ['Open', 'In Review', 'Resolved', 'Closed']
const statusConfig = {
  Open:        { icon: AlertCircle, bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  'In Review': { icon: Eye, bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  Resolved:    { icon: CheckCircle, bg: 'bg-green-50 text-green-700 border-green-200' },
  Closed:      { icon: XCircle, bg: 'bg-slate-50 text-slate-500 border-slate-200' },
}

const priorityConfig = {
  Low: 'bg-slate-100 text-slate-600',
  Medium: 'bg-blue-100 text-blue-700',
  High: 'bg-orange-100 text-orange-700',
  Urgent: 'bg-red-100 text-red-700',
}

export default function IssuesOps() {
  const { data: issues, update: updateIssue, remove: removeIssue } = useSupabase('issues', 'dp_issues', [])
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterSubsidiary, setFilterSubsidiary] = useState('All')
  const [expandedId, setExpandedId] = useState(null)
  const [responseText, setResponseText] = useState('')

  function notify(msg) { setToast({ visible: true, message: msg }) }

  const subsidiaries = [...new Set(issues.map(i => i.subsidiary))].sort()

  const filtered = issues
    .filter(i => filterStatus === 'All' || i.status === filterStatus)
    .filter(i => filterSubsidiary === 'All' || i.subsidiary === filterSubsidiary)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  const counts = {
    total: issues.length,
    open: issues.filter(i => i.status === 'Open').length,
    review: issues.filter(i => i.status === 'In Review').length,
    resolved: issues.filter(i => i.status === 'Resolved').length,
  }

  async function changeStatus(id, status) {
    await updateIssue(id, { status })
    notify(`Status changed to ${status}`)
  }

  async function sendResponse(id) {
    if (!responseText.trim()) return
    await updateIssue(id, { response: responseText, status: 'In Review' })
    setResponseText('')
    notify('Response sent')
  }

  async function deleteIssue(id) {
    await removeIssue(id)
    setExpandedId(null)
    notify('Issue deleted')
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <AlertTriangle size={20} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Issues & Feedback</h1>
          <p className="text-slate-400 text-xs">Manage submissions from Dage Problems</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Total Issues</div>
          <div className="text-2xl font-extrabold text-slate-800">{counts.total}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-blue-500 mb-1">Open</div>
          <div className="text-2xl font-extrabold text-blue-600">{counts.open}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-amber-500 mb-1">In Review</div>
          <div className="text-2xl font-extrabold text-amber-600">{counts.review}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-green-500 mb-1">Resolved</div>
          <div className="text-2xl font-extrabold text-green-600">{counts.resolved}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-3 py-2">
          <Filter size={14} className="text-slate-400" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="text-sm bg-transparent outline-none text-slate-700"
          >
            <option value="All">All Status</option>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-3 py-2">
          <Filter size={14} className="text-slate-400" />
          <select
            value={filterSubsidiary}
            onChange={e => setFilterSubsidiary(e.target.value)}
            className="text-sm bg-transparent outline-none text-slate-700"
          >
            <option value="All">All Subsidiaries</option>
            {subsidiaries.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="text-xs text-slate-400 flex items-center">{filtered.length} issue{filtered.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Issues List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-10 text-center">
          <AlertTriangle size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No issues found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(issue => {
            const sc = statusConfig[issue.status] || statusConfig.Open
            const StatusIcon = sc.icon
            const isExpanded = expandedId === issue.id

            return (
              <div key={issue.id} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Issue Row */}
                <button
                  onClick={() => { setExpandedId(isExpanded ? null : issue.id); setResponseText(issue.response || '') }}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <StatusIcon size={18} className={sc.bg.split(' ')[1]} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm text-slate-800 truncate">{issue.subject}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityConfig[issue.priority] || ''}`}>
                        {issue.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{issue.subsidiary}</span>
                      <span>·</span>
                      <span>{issue.type}</span>
                      <span>·</span>
                      <span>DP-{String(issue.id).padStart(4, '0')}</span>
                      <span>·</span>
                      <span>{new Date(issue.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                  <div className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg}`}>
                    {issue.status}
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4 animate-[fadeIn_0.2s_ease-out]">
                    {/* Description */}
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Description</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{issue.description}</p>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {issue.location && (
                        <div>
                          <p className="text-slate-400 font-medium">Location</p>
                          <p className="text-slate-700">{issue.location}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-slate-400 font-medium">Submitted By</p>
                        <p className="text-slate-700">{issue.name || 'Anonymous'}</p>
                      </div>
                      {issue.contact && (
                        <div>
                          <p className="text-slate-400 font-medium">Contact</p>
                          <p className="text-slate-700">{issue.contact}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-slate-400 font-medium">Date</p>
                        <p className="text-slate-700">{new Date(issue.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>

                    {/* Response */}
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                        <MessageSquare size={12} /> Response
                      </p>
                      <textarea
                        value={responseText}
                        onChange={e => setResponseText(e.target.value)}
                        rows={3}
                        placeholder="Write a response to the submitter..."
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => sendResponse(issue.id)}
                          className="flex items-center gap-1.5 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                        >
                          <Send size={12} /> Send Response
                        </button>
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-400 mr-1">Set Status:</span>
                      {statusOptions.map(s => (
                        <button
                          key={s}
                          onClick={() => changeStatus(issue.id, s)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                            issue.status === s
                              ? 'bg-navy text-white border-navy'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <div className="flex-1" />
                      <button
                        onClick={() => deleteIssue(issue.id)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
