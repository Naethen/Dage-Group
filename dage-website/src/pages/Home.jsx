import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitForm } from '../lib/submitForm'
import {
  GraduationCap, Hotel, Truck, Hammer, Cake, Landmark,
  ArrowRight, TrendingUp, Users, Building2, Star, ChevronRight, Mail, Phone, MapPin
} from 'lucide-react'
import Toast from '../components/Toast'

const subsidiaries = [
  {
    name: 'Divine Age Montessori School',
    short: 'Montessori School',
    icon: GraduationCap,
    description: 'Nurturing young minds through the Montessori philosophy — hands-on, child-led learning in a safe and inspiring environment.',
    path: '/schools',
    color: 'from-blue-600 to-blue-800',
    tag: 'Education',
  },
  {
    name: 'Dage Galaxy School',
    short: 'Galaxy School',
    icon: GraduationCap,
    description: 'Academic excellence and holistic development, shaping confident and capable students ready for a global future.',
    path: '/schools',
    color: 'from-indigo-600 to-indigo-800',
    tag: 'Education',
  },
  {
    name: 'Nemok Lodge',
    short: 'Nemok Lodge',
    icon: Hotel,
    description: 'A premier hospitality experience offering comfortable rooms, warm service, and a welcoming atmosphere for every guest.',
    path: '/nemok-lodge',
    color: 'from-amber-600 to-amber-800',
    tag: 'Hospitality',
  },
  {
    name: 'City Xpress',
    short: 'City Xpress',
    icon: Truck,
    description: 'Reliable and efficient logistics and distribution services powering supply chains across the region.',
    path: '/city-xpress',
    color: 'from-orange-600 to-orange-800',
    tag: 'Logistics',
  },
  {
    name: 'Amoah Traits',
    short: 'Amoah Traits',
    icon: Hammer,
    description: 'Quality construction materials and supplies delivering value to building sites and retail partners nationwide.',
    path: '/amoah-traits',
    color: 'from-stone-600 to-stone-800',
    tag: 'Construction',
  },
  {
    name: 'Dage Bakery',
    short: 'Dage Bakery',
    icon: Cake,
    description: 'Freshly baked products crafted with care — bringing taste, quality, and nourishment to communities every day.',
    path: '/dage-bakery',
    color: 'from-rose-600 to-rose-800',
    tag: 'Food & Beverage',
  },
  {
    name: 'Dage Credit Union',
    short: 'Credit Union',
    icon: Landmark,
    description: 'Member-focused financial services supporting savings, credit, and economic empowerment for our community.',
    path: '/credit-union',
    color: 'from-green-700 to-green-900',
    tag: 'Finance',
  },
]

const stats = [
  { label: 'Active Subsidiaries', value: '7', icon: Building2 },
  { label: 'Years in Business', value: '10+', icon: TrendingUp },
  { label: 'Employees', value: '200+', icon: Users },
  { label: 'Customer Rating', value: '4.8★', icon: Star },
]

export default function Home() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'home')
    setToast({ visible: true, message: success ? 'Thank you! Your message has been received. We\'ll get back to you shortly.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-navy min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-block bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 text-gold text-sm font-medium mb-6 tracking-wide">
            Diversified. Trusted. Growing.
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Welcome to<br />
            <span className="text-gold">Dage Group</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            A dynamic conglomerate spanning education, hospitality, logistics, construction, food, and finance — united by a commitment to excellence and community impact across Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#subsidiaries"
              className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/30"
            >
              Explore Our Companies <ArrowRight size={18} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              About Us
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <Icon size={22} className="text-gold" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-navy mb-1">{value}</div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiaries Grid */}
      <section id="subsidiaries" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Portfolio</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2 mb-4">Seven Companies, One Vision</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From classrooms to construction sites, from hotel rooms to bakery shelves — Dage Group is active where communities need us most.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsidiaries.map((sub) => {
              const Icon = sub.icon
              return (
                <Link
                  key={sub.name}
                  to={sub.path}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className={`bg-gradient-to-br ${sub.color} p-6 flex items-center gap-4`}>
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-white/70 font-medium uppercase tracking-widest">{sub.tag}</span>
                      <h3 className="text-white font-bold text-lg leading-tight">{sub.short}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{sub.description}</p>
                    <div className="flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn More <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Who We Are</span>
              <h2 className="text-4xl font-extrabold text-navy mt-2 mb-6">Built on Purpose, Driven by Impact</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Dage Group is a Ghanaian conglomerate with a diversified portfolio of businesses serving education, hospitality, logistics, construction, food production, and financial services. We believe in building institutions that stand the test of time.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our group operates seven active subsidiaries, each a leader in its sector. We are committed to creating employment, elevating standards, and contributing meaningfully to the communities we serve.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                  <div className="text-2xl font-extrabold text-navy mb-1">7</div>
                  <div className="text-sm text-gray-600">Active Subsidiaries</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <div className="text-2xl font-extrabold text-navy mb-1">Ghana</div>
                  <div className="text-sm text-gray-600">Proudly Ghanaian</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {subsidiaries.slice(0, 4).map((sub) => {
                const Icon = sub.icon
                return (
                  <div key={sub.name} className={`bg-gradient-to-br ${sub.color} rounded-2xl p-6 flex flex-col gap-3`}>
                    <Icon size={28} className="text-white/80" />
                    <div className="text-white font-semibold text-sm">{sub.short}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2 mb-4">Contact Dage Group</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Have a question, partnership idea, or enquiry? We'd love to hear from you.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <div className="font-semibold text-navy mb-1">Headquarters</div>
                  <div className="text-gray-500 text-sm">Dage Group, Ghana</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <div className="font-semibold text-navy mb-1">Phone</div>
                  <div className="text-gray-500 text-sm">+233 000 000 000</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <div className="font-semibold text-navy mb-1">Email</div>
                  <div className="text-gray-500 text-sm">info@dagegroup.com</div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input name="first_name" type="text" placeholder="John" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input name="last_name" type="text" placeholder="Doe" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" placeholder="john@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select name="subject" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-500">
                  <option value="">Select a subsidiary</option>
                  <option>Dage Group (General)</option>
                  <option>Schools</option>
                  <option>Nemok Lodge</option>
                  <option>City Xpress</option>
                  <option>Amoah Traits</option>
                  <option>Dage Bakery</option>
                  <option>Credit Union</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" rows={4} placeholder="Your message..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
              </div>
              <button
                type="submit"
                className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
              >
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">What People Say</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2 mb-4">Trusted by Our Community</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Hear from customers, parents, guests, and partners who have experienced the Dage Group difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Divine Age Montessori has transformed my child's learning experience. The teachers are dedicated and the environment is perfect for young learners.",
                name: "Mrs. Adwoa Mensah",
                role: "Parent, Montessori School",
                color: "border-blue-200 bg-blue-50",
              },
              {
                quote: "Nemok Lodge exceeded our expectations. Clean rooms, friendly staff, and excellent service. We'll definitely be back for our next visit to Kumasi.",
                name: "Mr. Kwame Asante",
                role: "Guest, Nemok Lodge",
                color: "border-amber-200 bg-amber-50",
              },
              {
                quote: "City Xpress has been our reliable logistics partner for over 2 years. On-time deliveries and professional service every time.",
                name: "Ama Sarpong",
                role: "Business Owner",
                color: "border-orange-200 bg-orange-50",
              },
            ].map((t, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${t.color}`}>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-gold fill-gold" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-navy text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to partner with Dage Group?</h2>
          <p className="text-gray-400 mb-8">Explore our subsidiaries or reach out directly. We are always open to collaboration, investment, and growth opportunities.</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-500 transition-colors"
          >
            Get In Touch <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
