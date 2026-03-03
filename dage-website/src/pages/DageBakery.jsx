import { useState } from 'react'
import { submitForm } from '../lib/submitForm'
import { Cake, MapPin, Phone, Mail, ArrowRight, CheckCircle, Star, TrendingUp, Users, Package } from 'lucide-react'
import Toast from '../components/Toast'

const products = [
  { name: 'Artisan Breads', desc: 'Freshly baked daily — whole wheat, white, and specialty loaves for homes and businesses.' },
  { name: 'Pastries & Buns', desc: 'Sweet and savoury pastries, cream buns, and rolls baked fresh every morning.' },
  { name: 'Cakes & Celebration', desc: 'Custom celebration cakes for birthdays, weddings, corporate events, and special occasions.' },
  { name: 'Chin Chin & Snacks', desc: 'Traditional Ghanaian snacks packed and sold at retail outlets and through direct orders.' },
  { name: 'Bulk / Wholesale', desc: 'Bulk orders for schools, hotels, restaurants, and event caterers — consistent quality at scale.' },
  { name: 'Seasonal Specials', desc: 'Limited edition bakes for Christmas, Easter, and other festive seasons.' },
]

const locations = [
  { name: 'Main Bakery & Shop', address: 'Dage Bakery HQ, Ghana', status: 'Open', hours: 'Mon–Sat: 6am–8pm | Sun: 7am–5pm' },
  { name: 'Expansion Location 2', address: 'Coming Soon — New Site TBA', status: 'Coming Soon', hours: '—' },
  { name: 'Expansion Location 3', address: 'Coming Soon — New Site TBA', status: 'Coming Soon', hours: '—' },
]

const stats = [
  { label: 'Products Baked Daily', value: '500+' },
  { label: 'Happy Customers', value: '1,000+' },
  { label: 'Years of Baking', value: '3+' },
  { label: 'Product Lines', value: '10+' },
]

export default function DageBakery() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'dage-bakery')
    setToast({ visible: true, message: success ? 'Order/inquiry submitted! We\'ll get back to you shortly.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-600 to-rose-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Cake size={15} /> Food & Beverage
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Dage Bakery</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Baked with love, served with pride. From our ovens to your table — quality, freshness, and flavour in every bite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#order" className="inline-flex items-center gap-2 bg-white text-rose-800 font-semibold px-7 py-3 rounded-full hover:bg-rose-50 transition-colors shadow-md">
              Place an Order <ArrowRight size={16} />
            </a>
            <a href="#locations" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors">
              Our Locations
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-navy mb-1">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">What We Bake</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Our Products</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Every product is made with quality ingredients and baked fresh daily to ensure taste and consistency.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-4">
                  <Cake size={22} className="text-rose-500" />
                </div>
                <h3 className="font-bold text-navy mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dage Bakery */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Promise</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-5">Freshness You Can Taste</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Dage Bakery, we believe that great baked goods start with great ingredients and skilled bakers. Everything we produce is made fresh daily in a clean, hygienic environment that meets food safety standards.
              </p>
              <div className="space-y-3">
                {[
                  'Baked fresh every morning — no day-old stock',
                  'Quality ingredients sourced locally and responsibly',
                  'Hygienic production environment',
                  'Consistent taste and portion sizes',
                  'Bulk and wholesale orders welcome',
                  'Custom cakes for any occasion',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Star, label: 'Quality First', desc: 'Only the best ingredients go into our products — every single day.' },
                { icon: TrendingUp, label: 'Expanding Fast', desc: 'Growing to new locations to bring Dage Bakery closer to every community.' },
                { icon: Users, label: 'Community Focused', desc: 'We employ locally and give back to the communities we operate in.' },
                { icon: Package, label: 'Wholesale Ready', desc: 'Bulk supply to schools, hotels, restaurants, and event organisers.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-rose-500" />
                  </div>
                  <h4 className="font-semibold text-navy text-sm mb-1">{label}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Where To Find Us</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Our Locations</h2>
            <p className="text-gray-500 mt-3">Currently operating from our main location, with exciting expansions on the way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div key={loc.name} className={`rounded-2xl p-6 border shadow-sm ${loc.status === 'Open' ? 'bg-white border-gray-100' : 'bg-gray-100 border-gray-200 opacity-75'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                    <MapPin size={18} className="text-rose-500" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${loc.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                    {loc.status}
                  </span>
                </div>
                <h3 className="font-bold text-navy mb-1">{loc.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{loc.address}</p>
                <p className="text-xs text-gray-400">{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order / Expansion Inquiry */}
      <section id="order" className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Orders & Inquiries</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 mb-3">Place an Order or Inquiry</h2>
            <p className="text-gray-500">For custom cakes, bulk orders, wholesale supply, or franchise/expansion inquiries — fill in the form below.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="name" type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input name="phone" type="tel" placeholder="+233 ..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
              <select name="subject" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300">
                <option value="">Select type</option>
                <option>Product Order</option>
                <option>Custom Cake</option>
                <option>Wholesale / Bulk Supply</option>
                <option>Franchise / Expansion Inquiry</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
              <textarea name="message" rows={4} placeholder="Describe your order or inquiry..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none" />
            </div>
            <button type="submit" className="w-full bg-rose-700 text-white font-semibold py-3 rounded-lg hover:bg-rose-800 transition-colors flex items-center justify-center gap-2">
              Submit <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: 'Call Us', value: '+233 000 000 000' },
              { icon: Mail, label: 'Email Us', value: 'bakery@dagegroup.com' },
              { icon: MapPin, label: 'Visit Us', value: 'Dage Bakery HQ, Ghana' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                <Icon size={18} className="text-gold mx-auto mb-2" />
                <div className="text-xs font-semibold text-navy mb-0.5">{label}</div>
                <div className="text-xs text-gray-500">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion Banner */}
      <section className="bg-rose-800 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <TrendingUp size={36} className="text-white/60 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-4">We Are Expanding!</h2>
          <p className="text-rose-200 mb-6 max-w-2xl mx-auto">
            Dage Bakery is growing beyond our first location. We are actively seeking new sites and franchise partners to bring our products to more communities across Ghana. Interested in partnering with us?
          </p>
          <a href="#order" className="inline-flex items-center gap-2 bg-white text-rose-800 font-semibold px-7 py-3 rounded-full hover:bg-rose-50 transition-colors">
            Franchise Inquiry <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
