import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-white py-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <AlertTriangle size={22} className="text-gold" />
          <span className="font-extrabold text-lg tracking-tight">Dage Problems</span>
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-navy mb-2">404</h1>
          <p className="text-gray-500 mb-6">Page not found</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
