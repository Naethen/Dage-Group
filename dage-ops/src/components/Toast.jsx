import { useEffect } from 'react'
import { CheckCircle, X, AlertTriangle } from 'lucide-react'

export default function Toast({ message, visible, onClose, type = 'success' }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 3500)
      return () => clearTimeout(t)
    }
  }, [visible, onClose])

  if (!visible) return null

  const Icon = type === 'success' ? CheckCircle : AlertTriangle
  const iconColor = type === 'success' ? 'text-green-500' : 'text-amber-500'

  return (
    <div className="fixed bottom-5 right-5 z-[100]" style={{ animation: 'slideUp 0.25s ease-out' }}>
      <div className="bg-slate-800 text-white rounded-xl shadow-2xl border border-slate-700 px-5 py-3.5 flex items-center gap-3 max-w-sm">
        <Icon size={18} className={`${iconColor} shrink-0`} />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-slate-400 hover:text-white shrink-0">
          <X size={15} />
        </button>
      </div>
    </div>
  )
}
