import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const subsidiaries = [
  { name: 'Divine Age Montessori School', path: '/schools' },
  { name: 'Dage Galaxy School', path: '/schools' },
  { name: 'Nemok Lodge', path: '/nemok-lodge' },
  { name: 'City Xpress', path: '/city-xpress' },
  { name: 'Amoah Traits', path: '/amoah-traits' },
  { name: 'Dage Bakery', path: '/dage-bakery' },
  { name: 'Dage Credit Union', path: '/credit-union' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-bold text-white text-lg">
                D
              </div>
              <div>
                <span className="text-white font-bold text-xl">DAGE</span>
                <span className="text-gold font-bold text-xl"> GROUP</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              A diversified group of companies committed to excellence, growth, and community development across Ghana.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Our Companies */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Our Companies</h3>
            <ul className="space-y-2">
              {subsidiaries.map((s) => (
                <li key={s.name}>
                  <Link to={s.path} className="text-sm text-gray-400 hover:text-gold transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-gray-400 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-gold transition-colors">Contact</Link></li>
              <li><a href="/#subsidiaries" className="text-sm text-gray-400 hover:text-gold transition-colors">Our Businesses</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                Dage Group Headquarters, Ghana
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={15} className="text-gold shrink-0" />
                +233 000 000 000
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={15} className="text-gold shrink-0" />
                info@dagegroup.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Dage Group. All rights reserved.</p>
          <p className="text-xs text-gray-500">Building legacies, creating futures.</p>
        </div>
      </div>
    </footer>
  )
}
