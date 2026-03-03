import { useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

export default function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 4000)
      return () => clearTimeout(t)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-[slideUp_0.3s_ease-out]">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-5 py-4 flex items-center gap-3 max-w-sm">
        <CheckCircle size={20} className="text-green-500 shrink-0" />
        <p className="text-sm text-gray-700 font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
