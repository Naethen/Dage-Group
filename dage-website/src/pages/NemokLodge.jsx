import { useState } from 'react'
import { Hotel, Star, Wifi, Coffee, Shield, MapPin, Phone, Mail, ArrowRight, CheckCircle, Users, Award } from 'lucide-react'
import { submitForm } from '../lib/submitForm'
import Toast from '../components/Toast'

const rooms = [
  { type: 'Standard Room', price: 'GH₵ 250/night', features: ['1 Queen Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free Wi-Fi'], tag: 'Popular' },
  { type: 'Deluxe Room', price: 'GH₵ 380/night', features: ['1 King Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free Wi-Fi', 'Flat Screen TV'], tag: 'Best Value' },
  { type: 'Executive Suite', price: 'GH₵ 550/night', features: ['King Bed + Sitting Area', 'Luxury Bathroom', 'Air Conditioning', 'Free Wi-Fi', 'Mini Fridge', 'Work Desk'], tag: 'Premium' },
]

const amenities = [
  { icon: Wifi, label: 'Free Wi-Fi' },
  { icon: Coffee, label: 'Restaurant & Bar' },
  { icon: Shield, label: '24/7 Security' },
  { icon: Users, label: 'Conference Room' },
  { icon: Star, label: 'Room Service' },
  { icon: Award, label: 'Clean & Sanitised' },
]

const stats = [
  { label: 'Rooms Available', value: '30+' },
  { label: 'Guest Rating', value: '4.7★' },
  { label: 'Years Operating', value: '5+' },
  { label: 'Events Hosted', value: '200+' },
]

export default function NemokLodge() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'nemok-lodge')
    setToast({ visible: true, message: success ? 'Booking inquiry submitted! Our team will confirm your reservation shortly.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-700 to-amber-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Hotel size={15} /> Hospitality
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Nemok Lodge</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Where comfort meets warmth. Experience genuine Ghanaian hospitality in a clean, safe, and welcoming environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book" className="inline-flex items-center gap-2 bg-white text-amber-800 font-semibold px-7 py-3 rounded-full hover:bg-amber-50 transition-colors shadow-md">
              Book a Room <ArrowRight size={16} />
            </a>
            <a href="#rooms" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors">
              View Rooms
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

      {/* About */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">About Nemok Lodge</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-5">Your Home Away From Home</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Nemok Lodge offers a premium yet affordable lodging experience for business travellers, tourists, and event guests. We pride ourselves on cleanliness, safety, and a standard of hospitality that keeps guests coming back.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our dedicated team of hospitality professionals is trained to deliver warm, attentive service — from the moment you check in to when you check out.
              </p>
              <div className="space-y-2">
                {[
                  'Professional and courteous front-desk staff',
                  'Daily housekeeping and sanitisation',
                  'Secure parking and 24/7 security',
                  'Conference and event facilities available',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <span className="text-sm font-medium text-navy">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Accommodation</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Our Rooms</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.type} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-amber-700 to-amber-900 h-36 flex items-center justify-center relative">
                  <Hotel size={48} className="text-white/40" />
                  <span className="absolute top-3 right-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">{room.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy mb-1">{room.type}</h3>
                  <p className="text-gold font-bold text-xl mb-4">{room.price}</p>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-green-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#book" className="block text-center bg-navy text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-900 transition-colors">
                    Book This Room
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Reservations</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 mb-3">Book Your Stay</h2>
            <p className="text-gray-500">Complete the form and our team will confirm your booking within a few hours.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="name" type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input name="phone" type="tel" placeholder="+233 ..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input name="email" type="email" placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select name="room_type" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                <option value="">Select room type</option>
                <option>Standard Room — GH₵ 250/night</option>
                <option>Deluxe Room — GH₵ 380/night</option>
                <option>Executive Suite — GH₵ 550/night</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-In Date</label>
                <input name="check_in" type="date" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out Date</label>
                <input name="check_out" type="date" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <input name="guests" type="number" min="1" max="6" placeholder="1" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea name="message" rows={3} placeholder="Any special requirements..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
            </div>
            <button type="submit" className="w-full bg-amber-700 text-white font-semibold py-3 rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center gap-2">
              Confirm Booking <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: 'Call Us', value: '+233 000 000 000' },
              { icon: Mail, label: 'Email Us', value: 'lodge@dagegroup.com' },
              { icon: MapPin, label: 'Find Us', value: 'Nemok Lodge, Ghana' },
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
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
