import { useState } from 'react'
import { submitForm } from '../lib/submitForm'
import { Hammer, Package, Building2, Users, TrendingUp, Phone, Mail, MapPin, ArrowRight, CheckCircle, Star } from 'lucide-react'
import Toast from '../components/Toast'

const products = [
  { name: 'Sandcrete Blocks', sizes: ['4 inch', '5 inch', '6 inch'], desc: 'High-density, durable sandcrete blocks suitable for residential, commercial, and industrial construction.', popular: true },
  { name: 'Laterite / Sand', sizes: ['Bulk Supply', 'Per Trip'], desc: 'Quality laterite and sharp sand for foundations, filling, and construction use. Available in bulk or single-trip quantities.', popular: false },
  { name: 'Gravel & Aggregates', sizes: ['Fine', 'Coarse', 'Mixed'], desc: 'Various grades of gravel and aggregates for concrete mixing, drainage, and road construction.', popular: false },
  { name: 'Cement (Retail)', sizes: ['Single Bags', 'Pallet Orders'], desc: 'Retail supply of major cement brands. Bulk discounts available for contractors and large-scale buyers.', popular: false },
]

const stats = [
  { label: 'Products Supplied', value: '10+' },
  { label: 'Construction Sites Served', value: '80+' },
  { label: 'Retail Partners', value: '30+' },
  { label: 'Years Active', value: '5+' },
]

const clientTypes = [
  { icon: Building2, title: 'Construction Sites', desc: 'Direct supply to active construction sites — residential, commercial, and government projects.' },
  { icon: Package, title: 'Retailers & Hardware Stores', desc: 'Wholesale supply to hardware shops and building material retailers across the region.' },
  { icon: Users, title: 'Individual Builders', desc: 'Self-builders and homeowners who need reliable, quality materials at fair prices.' },
  { icon: TrendingUp, title: 'Contractors & Developers', desc: 'Bulk supply for property developers and building contractors with ongoing project needs.' },
]

export default function AmoahTraits() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'amoah-traits')
    setToast({ visible: true, message: success ? 'Inquiry received! Our sales team will get back to you shortly.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-600 to-stone-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Hammer size={15} /> Construction Materials
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Amoah Traits</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Your trusted supplier of quality construction materials. From blocks to aggregates — we supply the building blocks of Ghana's future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#partner" className="inline-flex items-center gap-2 bg-white text-stone-800 font-semibold px-7 py-3 rounded-full hover:bg-stone-100 transition-colors shadow-md">
              Become a Partner <ArrowRight size={16} />
            </a>
            <a href="#products" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors">
              Our Products
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

      {/* Who We Serve */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Clients</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Who We Supply</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">We actively seek and serve a growing base of construction sites, retailers, and individual builders across Ghana.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientTypes.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-bold text-navy mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Our Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.name} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm relative">
                {product.popular && (
                  <span className="absolute top-4 right-4 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star size={11} /> Best Seller
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    <Hammer size={22} className="text-stone-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-lg mb-1">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.sizes.map((size) => (
                        <span key={size} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full">{size}</span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{product.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <p className="text-amber-800 font-medium text-sm">
              Need bulk pricing or a custom order? Contact us directly for tailored quotes for large volumes and ongoing supply agreements.
            </p>
          </div>
        </div>
      </section>

      {/* Why Amoah Traits */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Why Us</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-5">Quality You Can Build On</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Amoah Traits, we don't just sell materials — we build relationships. Our team actively visits construction sites and retailers to understand your needs and ensure you're getting the right product at the right price.
              </p>
              <div className="space-y-3">
                {[
                  'Consistent quality across all product lines',
                  'Competitive pricing with bulk discounts',
                  'Prompt delivery to site or retail location',
                  'Dedicated sales team visiting construction sites',
                  'Flexible payment terms for established partners',
                  'Reliable stock availability — no project delays',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-navy mb-6">Quick Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4" id="partner">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input name="name" type="text" placeholder="Your name or business name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input name="phone" type="tel" placeholder="+233 ..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">I Am A</label>
                  <select name="subject" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                    <option value="">Select type</option>
                    <option>Construction Site Manager</option>
                    <option>Hardware / Retail Store Owner</option>
                    <option>Property Developer</option>
                    <option>Building Contractor</option>
                    <option>Individual / Self-Builder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Products Needed</label>
                  <textarea name="message" rows={3} placeholder="e.g. 5-inch blocks x 1000, 3 trips of sharp sand..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
                </div>
                <button type="submit" className="w-full bg-stone-700 text-white font-semibold py-3 rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                  Send Inquiry <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Retailer Partnership */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Are You a Retailer?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We are actively expanding our retail network. If you own a hardware store or building materials shop, partner with Amoah Traits for reliable wholesale supply at competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+233000000000" className="flex items-center gap-2 justify-center bg-gold text-white font-semibold px-7 py-3 rounded-full hover:bg-amber-500 transition-colors">
              <Phone size={16} /> Call Our Sales Team
            </a>
            <a href="mailto:amoahtraits@dagegroup.com" className="flex items-center gap-2 justify-center border border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors">
              <Mail size={16} /> Email Us
            </a>
          </div>
        </div>
      </section>
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
