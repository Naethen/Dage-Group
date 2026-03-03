import { useState } from 'react'
import { submitForm } from '../lib/submitForm'
import { Truck, Package, MapPin, Phone, Mail, ArrowRight, CheckCircle, Users, TrendingUp, Clock, Shield, Briefcase } from 'lucide-react'
import Toast from '../components/Toast'

const stats = [
  { label: 'Trucks in Fleet', value: '15+' },
  { label: 'Routes Covered', value: '20+' },
  { label: 'Deliveries/Month', value: '500+' },
  { label: 'Years Operating', value: '4+' },
]

const services = [
  {
    icon: Package,
    title: 'Goods Distribution',
    desc: 'Reliable distribution of goods from warehouses and manufacturers to retailers, markets, and end consumers across the region.',
  },
  {
    icon: Truck,
    title: 'Trucking & Haulage',
    desc: 'Heavy-duty haulage for bulk goods, construction materials, and large cargo — delivered safely and on time.',
  },
  {
    icon: MapPin,
    title: 'Scheduled Routes',
    desc: 'Optimised, scheduled delivery routes that ensure consistent and predictable delivery timelines for our clients.',
  },
  {
    icon: Clock,
    title: 'Express Delivery',
    desc: 'Time-sensitive deliveries handled with urgency. Our City Xpress service is built for speed without compromising safety.',
  },
]

const whyUs = [
  'Experienced and licensed drivers',
  'GPS-tracked fleet for accountability',
  'Flexible delivery schedules',
  'Competitive and transparent pricing',
  'Reliable and punctual — always',
  'Servicing both urban and rural routes',
]

const careers = [
  { role: 'Truck Driver', type: 'Full-Time', desc: 'Valid Ghana driving license (Class C or above) required. Must have 2+ years of commercial driving experience.' },
  { role: 'Loading Assistant', type: 'Full-Time', desc: 'Physical fitness required. Responsible for safe loading, unloading, and securing cargo on vehicles.' },
  { role: 'Dispatch Coordinator', type: 'Full-Time', desc: 'Organise and track deliveries, liaise between drivers and clients, manage route scheduling.' },
]

export default function CityXpress() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleHireSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'city-xpress-hire')
    setToast({ visible: true, message: success ? 'Truck hire request received! Our dispatch team will contact you within 24 hours.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  async function handleApplySubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'city-xpress-apply')
    setToast({ visible: true, message: success ? 'Application submitted! Our HR team will review and get back to you.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Truck size={15} /> Logistics & Distribution
          </div>
          <h1 className="text-5xl font-extrabold mb-4">City Xpress</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Fast, reliable, and efficient logistics solutions powering supply chains across Ghana. We move your goods — you grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#hire" className="inline-flex items-center gap-2 bg-white text-orange-800 font-semibold px-7 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-md">
              Hire a Truck <ArrowRight size={16} />
            </a>
            <a href="#careers" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors">
              Join Our Team
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

      {/* Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-orange-600" />
                </div>
                <h3 className="font-bold text-navy mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose City Xpress */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-5">Built for Reliability</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                City Xpress was built on one promise: your goods arrive safely, on time, every time. We invest in our fleet, our drivers, and our systems so your supply chain never misses a beat.
              </p>
              <div className="space-y-3">
                {whyUs.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: 'Safe & Insured', desc: 'All cargo handled with care. Our drivers are trained in safe transport.' },
                { icon: TrendingUp, label: 'Growing Network', desc: 'Expanding routes and capacity to serve more clients every quarter.' },
                { icon: Clock, label: 'On-Time Delivery', desc: '95%+ on-time delivery rate across all active routes.' },
                { icon: Users, label: 'Expert Team', desc: 'Professional drivers, loaders, and coordinators keeping things moving.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-navy text-sm mb-1">{label}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hire a Truck */}
      <section id="hire" className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Client Inquiry</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 mb-3">Hire a Truck</h2>
            <p className="text-gray-500">Tell us about your logistics needs and we'll get back to you with a quote within 24 hours.</p>
          </div>
          <form onSubmit={handleHireSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="name" type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input name="business" type="text" placeholder="Your company" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input name="phone" type="tel" placeholder="+233 ..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Goods</label>
              <input name="product" type="text" placeholder="e.g. Cement bags, electronics, foodstuff..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input name="pickup" type="text" placeholder="Pickup location" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Location</label>
                <input name="delivery" type="text" placeholder="Delivery location" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input name="date" type="date" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea name="message" rows={3} placeholder="Any specific requirements, frequency, volume..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
            </div>
            <button type="submit" className="w-full bg-orange-700 text-white font-semibold py-3 rounded-lg hover:bg-orange-800 transition-colors flex items-center justify-center gap-2">
              Submit Inquiry <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Join The Team</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 mb-3">Career Opportunities</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We are growing fast and looking for dedicated individuals to join the City Xpress family.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {careers.map((job) => (
              <div key={job.role} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Briefcase size={18} className="text-orange-600" />
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2.5 py-1 rounded-full">{job.type}</span>
                </div>
                <h3 className="font-bold text-navy mb-2">{job.role}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{job.desc}</p>
                <a href="#apply" className="inline-flex items-center gap-1 text-orange-600 text-sm font-semibold hover:text-orange-800">
                  Apply Now <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          {/* Apply Form */}
          <div id="apply" className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-navy text-center mb-6">Apply for a Position</h3>
            <form onSubmit={handleApplySubmit} className="bg-gray-50 rounded-2xl border border-gray-100 p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input name="name" type="text" placeholder="Your full name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input name="phone" type="tel" placeholder="+233 ..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Applying For</label>
                <select name="role" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
                  <option value="">Select position</option>
                  <option>Truck Driver</option>
                  <option>Loading Assistant</option>
                  <option>Dispatch Coordinator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input name="experience" type="number" min="0" placeholder="e.g. 3" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell Us About Yourself</label>
                <textarea name="message" rows={4} placeholder="Brief background, qualifications, why you want to join City Xpress..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
              </div>
              <button type="submit" className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
                Submit Application <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="bg-orange-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Ready to move your goods?</h3>
              <p className="text-orange-200 text-sm">Contact our dispatch team directly for urgent delivery needs.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+233000000000" className="flex items-center gap-2 bg-white text-orange-800 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-orange-50 transition-colors">
                <Phone size={15} /> +233 000 000 000
              </a>
              <a href="mailto:cityxpress@dagegroup.com" className="flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-white/10 transition-colors">
                <Mail size={15} /> cityxpress@dagegroup.com
              </a>
            </div>
          </div>
        </div>
      </section>
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
