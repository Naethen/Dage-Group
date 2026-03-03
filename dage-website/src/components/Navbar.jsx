import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const subsidiaries = [
  { name: 'Schools', path: '/schools' },
  { name: 'Nemok Lodge', path: '/nemok-lodge' },
  { name: 'City Xpress', path: '/city-xpress' },
  { name: 'Amoah Traits', path: '/amoah-traits' },
  { name: 'Dage Bakery', path: '/dage-bakery' },
  { name: 'Credit Union', path: '/credit-union' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-xl' : 'bg-navy shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-bold text-white text-lg shadow-md group-hover:scale-105 transition-transform">
              D
            </div>
            <div className="leading-tight">
              <span className="text-white font-bold text-lg tracking-wide">DAGE</span>
              <span className="text-gold font-bold text-lg tracking-wide"> GROUP</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-gold' : 'text-gray-300 hover:text-white'}`}
            >
              Home
            </Link>

            {/* Subsidiaries Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Our Companies <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-1 border border-gray-100 animate-[fadeIn_0.15s_ease-out]">
                  {subsidiaries.map((s) => (
                    <Link
                      key={s.path}
                      to={s.path}
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${isActive(s.path) ? 'text-gold font-semibold bg-amber-50' : 'text-gray-700 hover:bg-gray-50 hover:text-navy'}`}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/#about"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>

            <a
              href="/#contact"
              className="text-sm font-medium bg-gold/20 border border-gold/30 text-gold px-4 py-1.5 rounded-full hover:bg-gold hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-navy border-t border-white/10 px-4 py-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`block py-2 text-sm font-medium ${isActive('/') ? 'text-gold' : 'text-gray-300'}`}
          >
            Home
          </Link>
          <p className="text-xs text-gray-500 uppercase tracking-widest pt-2 pb-1">Our Companies</p>
          {subsidiaries.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm pl-3 ${isActive(s.path) ? 'text-gold font-semibold' : 'text-gray-300'}`}
            >
              {s.name}
            </Link>
          ))}
          <a href="/#about" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-300">
            About
          </a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-300">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
