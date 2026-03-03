import { Link } from 'react-router-dom'
import { AlertTriangle, GraduationCap, Hotel, Truck, Hammer, Cake, Landmark, Building2, Search, ArrowRight, Shield, MessageSquare } from 'lucide-react'

const channels = [
  { name: 'Schools', slug: 'schools', icon: GraduationCap, color: 'from-blue-600 to-blue-800', desc: 'Montessori & Galaxy schools' },
  { name: 'Nemok Lodge', slug: 'nemok-lodge', icon: Hotel, color: 'from-amber-600 to-amber-800', desc: 'Hospitality & accommodation' },
  { name: 'City Xpress', slug: 'city-xpress', icon: Truck, color: 'from-orange-600 to-orange-800', desc: 'Logistics & distribution' },
  { name: 'Amoah Traits', slug: 'amoah-traits', icon: Hammer, color: 'from-stone-600 to-stone-800', desc: 'Construction materials' },
  { name: 'Dage Bakery', slug: 'dage-bakery', icon: Cake, color: 'from-rose-600 to-rose-800', desc: 'Bakery & food production' },
  { name: 'Credit Union', slug: 'credit-union', icon: Landmark, color: 'from-green-600 to-green-800', desc: 'Financial services' },
  { name: 'General / HQ', slug: 'general', icon: Building2, color: 'from-slate-600 to-slate-800', desc: 'Group-wide or head office' },
]

export default function Home() {
  return (
    <div className="w-full">
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-950 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Shield size={15} /> Confidential & Secure
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Report a Problem or Suggestion</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Help us improve Dage Group. Submit issues, suggestions, complaints or feedback through the appropriate subsidiary channel below.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 text-sm text-slate-400">
              <MessageSquare size={15} /> Anonymous submissions welcome
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 text-sm text-slate-400">
              <Search size={15} /> Track your issue by reference
            </div>
          </div>
        </div>
      </section>

      {/* Channels Grid */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Subsidiaries</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Select a Channel</h2>
            <p className="text-gray-500 mt-2">Choose the subsidiary your issue or suggestion relates to.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {channels.map(ch => (
              <Link
                key={ch.slug}
                to={`/submit/${ch.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${ch.color} p-5 flex items-center gap-3`}>
                  <div className="bg-white/20 rounded-lg p-2.5">
                    <ch.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{ch.name}</h3>
                    <p className="text-white/70 text-xs">{ch.desc}</p>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Submit issue or suggestion</span>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Track Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-navy mb-3">Already Submitted?</h2>
          <p className="text-gray-500 mb-6">Track the status of your issue using your reference number.</p>
          <Link
            to="/track"
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
          >
            <Search size={16} /> Track My Issue
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-slate-400 text-center py-6 text-xs">
        &copy; {new Date().getFullYear()} Dage Group. All rights reserved.
      </footer>
    </div>
  )
}
