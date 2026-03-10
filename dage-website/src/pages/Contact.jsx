import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ArrowRight, Building2, GraduationCap, Hotel, Truck, Hammer, Cake, Landmark } from 'lucide-react'
import { submitForm } from '../lib/submitForm'
import Toast from '../components/Toast'

const subsidiaryContacts = [
  {
    name: 'Divine Age Montessori School',
    icon: GraduationCap,
    color: 'bg-blue-100 text-blue-700',
    phone: '+233 000 000 001',
    email: 'montessori@dagegroup.com',
    address: 'Kumasi, Ghana',
    hours: 'Mon-Fri: 7:00 AM - 4:00 PM',
  },
  {
    name: 'Dage Galaxy School',
    icon: GraduationCap,
    color: 'bg-indigo-100 text-indigo-700',
    phone: '+233 000 000 002',
    email: 'galaxy@dagegroup.com',
    address: 'Kumasi, Ghana',
    hours: 'Mon-Fri: 7:00 AM - 4:00 PM',
  },
  {
    name: 'Nemok Lodge',
    icon: Hotel,
    color: 'bg-amber-100 text-amber-700',
    phone: '+233 000 000 003',
    email: 'lodge@dagegroup.com',
    address: 'Kumasi, Ghana',
    hours: '24/7 Reception',
  },
  {
    name: 'City Xpress',
    icon: Truck,
    color: 'bg-orange-100 text-orange-700',
    phone: '+233 000 000 004',
    email: 'logistics@dagegroup.com',
    address: 'Kumasi, Ghana',
    hours: 'Mon-Sat: 6:00 AM - 6:00 PM',
  },
  {
    name: 'Amoah Traits Ventures',
    icon: Hammer,
    color: 'bg-stone-100 text-stone-700',
    phone: '+233 000 000 005',
    email: 'construction@dagegroup.com',
    address: 'Kumasi, Ghana',
    hours: 'Mon-Sat: 7:00 AM - 5:00 PM',
  },
  {
    name: 'Dage Bakery',
    icon: Cake,
    color: 'bg-rose-100 text-rose-700',
    phone: '+233 000 000 006',
    email: 'bakery@dagegroup.com',
    address: 'Kumasi, Ghana',
    hours: 'Daily: 5:00 AM - 8:00 PM',
  },
  {
    name: 'Dage Credit Union',
    icon: Landmark,
    color: 'bg-green-100 text-green-700',
    phone: '+233 000 000 007',
    email: 'creditunion@dagegroup.com',
    address: 'Kumasi, Ghana',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
  },
]

export default function Contact() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'contact')
    setToast({ visible: true, message: success ? 'Thank you! Your message has been received. We\'ll get back to you shortly.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-blue-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Mail size={15} /> Contact Us
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Get In Touch</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have a question, partnership idea, or enquiry? We'd love to hear from you. Reach out to our headquarters or any of our subsidiaries directly.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Headquarters</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-6">Dage Group Head Office</h2>
              
              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy mb-1">Address</div>
                    <div className="text-gray-600">Dage Group Headquarters<br />Kumasi, Ashanti Region, Ghana</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy mb-1">Phone</div>
                    <div className="text-gray-600">+233 000 000 000</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy mb-1">Email</div>
                    <div className="text-gray-600">info@dagegroup.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy mb-1">Office Hours</div>
                    <div className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-500">
                  <MapPin size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Map will be displayed here</p>
                  <p className="text-xs text-gray-400">Google Maps integration coming soon</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Send a Message</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-6">We'll Respond Within 24 Hours</h2>
              
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl border border-gray-100 p-8 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input name="first_name" type="text" required placeholder="John" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input name="last_name" type="text" required placeholder="Doe" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input name="email" type="email" required placeholder="john@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input name="phone" type="tel" placeholder="+233 000 000 000" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <select name="subject" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white text-gray-700">
                    <option value="">Select a topic</option>
                    <option>General Inquiry</option>
                    <option>Partnership Opportunity</option>
                    <option>Investment Inquiry</option>
                    <option>Careers</option>
                    <option>Schools Admission</option>
                    <option>Nemok Lodge Booking</option>
                    <option>City Xpress Services</option>
                    <option>Amoah Traits Orders</option>
                    <option>Dage Bakery</option>
                    <option>Credit Union Membership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea name="message" rows={5} required placeholder="How can we help you?" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none bg-white" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-navy text-white font-semibold py-3.5 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiary Contacts */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Direct Lines</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2 mb-4">Contact Our Subsidiaries</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Reach out directly to any of our seven subsidiaries for specific inquiries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {subsidiaryContacts.map((sub) => {
              const Icon = sub.icon
              return (
                <div key={sub.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sub.color}`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-navy text-sm leading-tight">{sub.name}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={13} className="text-gray-400 shrink-0" />
                      {sub.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={13} className="text-gray-400 shrink-0" />
                      <span className="truncate">{sub.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={13} className="text-gray-400 shrink-0" />
                      {sub.hours}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
