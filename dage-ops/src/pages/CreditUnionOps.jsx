import { useState } from 'react'
import { Landmark, Plus, ChevronDown, Trash2, TrendingUp, TrendingDown, Wallet, PiggyBank, Banknote, Users } from 'lucide-react'
import useSupabase from '../hooks/useSupabase'
import Toast from '../components/Toast'

const emptySheet = {
  date: new Date().toISOString().split('T')[0],
  savings: '', withdrawals: '', net_savings: '',
  physical_cash: '', momo_collection: '',
  loan_disbursed: '', loan_repayments: '', net_loan_balance: '',
  total_income: '', total_expenses: '', profit_loss: '',
  bank_balance: '', momo_line_balance: '', total_available: '',
  petty_cash: '', operating_cash: '',
  total_shares: '', total_loans: '', total_members_deposit: '',
  income_breakdown: {}, expense_breakdown: {}, bank_details: {},
  notes: '',
}

const incomeFields = [
  'Entrance Fee', 'Processing Fee', 'Passbook Rpmt', 'Interest on Loans',
  'Mtn Momo Interest', 'Susu Charge',
]

const expenseFields = [
  'Salaries', 'SSNIT', 'Tier 2', 'Motor Fuel', 'Motor Servicing',
  'Radio Repairs', 'T&T', 'Motor Engine Oil', 'Consultancy Fee',
  'Account Opening Forms', 'Stationery', 'Dispenser Water',
  'Ledger Cards', 'PAYE', 'Office Items', 'Prepaid ECG',
  'Phone Credit', 'Mtn Momo Charge', 'Toilet Roll', 'Bulbs',
  'Refuse Disposal',
]

function num(v) { return parseFloat(v) || 0 }
function fmt(v) { const n = num(v); return n === 0 ? '—' : `GH₵ ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` }

export default function CreditUnionOps() {
  const { data: sheets, insert: insertSheet, remove: removeSheet } = useSupabase('dccu_daily_sheets', 'dccu_sheets', [])
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({ ...emptySheet })
  const [incBreak, setIncBreak] = useState({})
  const [expBreak, setExpBreak] = useState({})

  function notify(msg) { setToast({ visible: true, message: msg }) }

  function setField(k, v) { setForm(prev => ({ ...prev, [k]: v })) }

  async function addSheet() {
    if (!form.date) return
    const row = { ...form }
    // Convert empty strings to 0 for numeric fields
    for (const k of Object.keys(row)) {
      if (k === 'date' || k === 'notes' || k === 'income_breakdown' || k === 'expense_breakdown' || k === 'bank_details') continue
      row[k] = num(row[k])
    }
    row.income_breakdown = incBreak
    row.expense_breakdown = expBreak
    row.bank_details = {}
    const result = await insertSheet(row)
    if (result) {
      setForm({ ...emptySheet })
      setIncBreak({})
      setExpBreak({})
      setShowForm(false)
      notify('Daily sheet added')
    }
  }

  async function deleteSheet(id) {
    await removeSheet(id)
    setExpandedId(null)
    notify('Sheet deleted')
  }

  const sorted = [...sheets].sort((a, b) => new Date(b.date) - new Date(a.date))
  const latest = sorted[0]

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center">
          <Landmark size={20} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Dage Credit Union — Operations</h1>
          <p className="text-slate-400 text-xs">Daily balancing sheets & financial overview</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Banknote size={12} /> Bank Balance</div>
          <div className="text-xl font-extrabold text-slate-800">{latest ? fmt(latest.bank_balance) : '—'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><PiggyBank size={12} /> Total Deposits</div>
          <div className="text-xl font-extrabold text-blue-600">{latest ? fmt(latest.total_members_deposit) : '—'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Wallet size={12} /> Total Loans</div>
          <div className="text-xl font-extrabold text-amber-600">{latest ? fmt(latest.total_loans) : '—'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Users size={12} /> Total Shares</div>
          <div className="text-xl font-extrabold text-green-600">{latest ? fmt(latest.total_shares) : '—'}</div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 text-xs bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold">
          <Plus size={14} /> {showForm ? 'Cancel' : 'New Daily Sheet'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-bold text-slate-700 text-sm">New Daily Balancing Sheet</h2>

          {/* Date */}
          <div className="max-w-xs">
            <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
            <input type="date" value={form.date} onChange={e => setField('date', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>

          {/* Daily Balancing */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Daily Balancing</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[['savings', 'Savings'], ['withdrawals', 'Withdrawals'], ['net_savings', 'Net Savings'],
                ['physical_cash', 'Physical Cash'], ['momo_collection', 'Momo Collection']].map(([k, l]) => (
                <div key={k}>
                  <label className="block text-xs text-slate-500 mb-1">{l}</label>
                  <input type="number" step="0.01" value={form[k]} onChange={e => setField(k, e.target.value)} placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Loans */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Loans</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[['loan_disbursed', 'Disbursed'], ['loan_repayments', 'Repayments'], ['net_loan_balance', 'Net Loan Balance']].map(([k, l]) => (
                <div key={k}>
                  <label className="block text-xs text-slate-500 mb-1">{l}</label>
                  <input type="number" step="0.01" value={form[k]} onChange={e => setField(k, e.target.value)} placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Income Breakdown */}
          <div>
            <h3 className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-3">Income Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {incomeFields.map(f => (
                <div key={f}>
                  <label className="block text-xs text-slate-500 mb-1">{f}</label>
                  <input type="number" step="0.01" value={incBreak[f] || ''} onChange={e => setIncBreak(prev => ({ ...prev, [f]: e.target.value }))} placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Total Income</label>
                <input type="number" step="0.01" value={form.total_income} onChange={e => setField('total_income', e.target.value)} placeholder="0.00"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 font-semibold" />
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div>
            <h3 className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">Expense Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {expenseFields.map(f => (
                <div key={f}>
                  <label className="block text-xs text-slate-500 mb-1">{f}</label>
                  <input type="number" step="0.01" value={expBreak[f] || ''} onChange={e => setExpBreak(prev => ({ ...prev, [f]: e.target.value }))} placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Total Expenses</label>
                <input type="number" step="0.01" value={form.total_expenses} onChange={e => setField('total_expenses', e.target.value)} placeholder="0.00"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 font-semibold" />
              </div>
            </div>
          </div>

          {/* Profit/Loss */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Profit / Loss</h3>
            <div className="max-w-xs">
              <label className="block text-xs text-slate-500 mb-1">Net Profit/Loss</label>
              <input type="number" step="0.01" value={form.profit_loss} onChange={e => setField('profit_loss', e.target.value)} placeholder="0.00"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 font-semibold" />
            </div>
          </div>

          {/* Bank */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Bank & Cash</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[['bank_balance', 'Bank Balance'], ['momo_line_balance', 'Momo Line Balance'], ['total_available', 'Total Available'],
                ['petty_cash', 'Petty Cash'], ['operating_cash', 'Operating Cash']].map(([k, l]) => (
                <div key={k}>
                  <label className="block text-xs text-slate-500 mb-1">{l}</label>
                  <input type="number" step="0.01" value={form[k]} onChange={e => setField(k, e.target.value)} placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Portfolio Totals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[['total_shares', 'Total Shares'], ['total_loans', 'Total Loans'], ['total_members_deposit', 'Total Members Deposit']].map(([k, l]) => (
                <div key={k}>
                  <label className="block text-xs text-slate-500 mb-1">{l}</label>
                  <input type="number" step="0.01" value={form[k]} onChange={e => setField(k, e.target.value)} placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => setField('notes', e.target.value)} rows={2} placeholder="Additional notes..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none" />
          </div>

          <button onClick={addSheet} className="bg-green-600 text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-green-700">Save Daily Sheet</button>
        </div>
      )}

      {/* Sheets List */}
      {sorted.length === 0 && !showForm ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
          <Landmark size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No daily sheets yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map(s => {
            const isExpanded = expandedId === s.id
            return (
              <div key={s.id} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <button onClick={() => setExpandedId(isExpanded ? null : s.id)}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <Banknote size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-800">
                      {new Date(s.date + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span>Savings: {fmt(s.savings)}</span>
                      <span>Wdl: {fmt(s.withdrawals)}</span>
                      <span className={num(s.profit_loss) >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        P/L: {fmt(s.profit_loss)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400">Bank</div>
                    <div className="text-sm font-bold text-slate-700">{fmt(s.bank_balance)}</div>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4 animate-[fadeIn_0.2s_ease-out]">
                    {/* Daily Balancing */}
                    <div>
                      <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Daily Balancing</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Savings</span><span className="font-semibold text-slate-700">{fmt(s.savings)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Withdrawals</span><span className="font-semibold text-slate-700">{fmt(s.withdrawals)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Net Savings</span><span className={`font-semibold ${num(s.net_savings) >= 0 ? 'text-green-700' : 'text-red-600'}`}>{fmt(s.net_savings)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Physical Cash</span><span className="font-semibold text-slate-700">{fmt(s.physical_cash)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Momo Collection</span><span className="font-semibold text-slate-700">{fmt(s.momo_collection)}</span></div>
                      </div>
                    </div>

                    {/* Loans */}
                    <div>
                      <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Loans</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Disbursed</span><span className="font-semibold text-slate-700">{fmt(s.loan_disbursed)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Repayments</span><span className="font-semibold text-green-700">{fmt(s.loan_repayments)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Net Loan Balance</span><span className="font-semibold text-slate-700">{fmt(s.net_loan_balance)}</span></div>
                      </div>
                    </div>

                    {/* Profit/Loss */}
                    <div>
                      <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Profit / Loss</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                        <div className="bg-green-50 rounded-lg p-3"><span className="text-xs text-green-500 block">Total Income</span><span className="font-semibold text-green-700">{fmt(s.total_income)}</span></div>
                        <div className="bg-red-50 rounded-lg p-3"><span className="text-xs text-red-400 block">Total Expenses</span><span className="font-semibold text-red-600">{fmt(s.total_expenses)}</span></div>
                        <div className={`rounded-lg p-3 ${num(s.profit_loss) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                          <span className="text-xs text-slate-400 block">Net P/L</span>
                          <span className={`font-bold ${num(s.profit_loss) >= 0 ? 'text-green-700' : 'text-red-600'}`}>{fmt(s.profit_loss)}</span>
                        </div>
                      </div>
                      {/* Income breakdown */}
                      {s.income_breakdown && Object.keys(s.income_breakdown).length > 0 && (
                        <div className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-3 space-y-1">
                          <span className="font-semibold text-slate-400">Income details:</span>
                          {Object.entries(s.income_breakdown).filter(([, v]) => num(v) > 0).map(([k, v]) => (
                            <div key={k} className="flex justify-between"><span>{k}</span><span className="font-medium text-green-700">{fmt(v)}</span></div>
                          ))}
                        </div>
                      )}
                      {/* Expense breakdown */}
                      {s.expense_breakdown && Object.keys(s.expense_breakdown).length > 0 && (
                        <div className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-3 space-y-1">
                          <span className="font-semibold text-slate-400">Expense details:</span>
                          {Object.entries(s.expense_breakdown).filter(([, v]) => num(v) > 0).map(([k, v]) => (
                            <div key={k} className="flex justify-between"><span>{k}</span><span className="font-medium text-red-600">{fmt(v)}</span></div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bank & Cash */}
                    <div>
                      <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Bank & Cash</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Bank Balance</span><span className="font-bold text-slate-800">{fmt(s.bank_balance)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Momo Line</span><span className="font-semibold text-slate-700">{fmt(s.momo_line_balance)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Total Available</span><span className="font-bold text-slate-800">{fmt(s.total_available)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Petty Cash</span><span className="font-semibold text-slate-700">{fmt(s.petty_cash)}</span></div>
                        <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs text-slate-400 block">Operating Cash</span><span className="font-bold text-slate-800">{fmt(s.operating_cash)}</span></div>
                      </div>
                    </div>

                    {/* Portfolio */}
                    <div>
                      <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Portfolio</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                        <div className="bg-green-50 rounded-lg p-3"><span className="text-xs text-green-500 block">Total Shares</span><span className="font-bold text-green-700">{fmt(s.total_shares)}</span></div>
                        <div className="bg-amber-50 rounded-lg p-3"><span className="text-xs text-amber-500 block">Total Loans</span><span className="font-bold text-amber-700">{fmt(s.total_loans)}</span></div>
                        <div className="bg-blue-50 rounded-lg p-3"><span className="text-xs text-blue-500 block">Members Deposit</span><span className="font-bold text-blue-700">{fmt(s.total_members_deposit)}</span></div>
                      </div>
                    </div>

                    {/* Notes */}
                    {s.notes && (
                      <div className="bg-slate-50 rounded-lg p-3">
                        <span className="text-xs text-slate-400 font-semibold">Notes:</span>
                        <p className="text-sm text-slate-600 mt-1">{s.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button onClick={() => deleteSheet(s.id)} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
                        <Trash2 size={13} /> Delete Sheet
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
