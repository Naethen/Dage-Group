import { useState } from 'react'
import { submitForm } from '../lib/submitForm'
import { Landmark, Shield, TrendingUp, Users, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import Toast from '../components/Toast'

const services = [
  { icon: TrendingUp, title: 'Savings Accounts', desc: 'Grow your money with competitive interest rates and flexible savings plans designed for members.' },
  { icon: Landmark, title: 'Loans & Credit', desc: 'Access affordable loans with favourable terms — personal, business, and emergency credit facilities.' },
  { icon: Shield, title: 'Member Benefits', desc: 'Exclusive member benefits, dividends, and financial advisory services to help you build wealth.' },
  { icon: Users, title: 'Community Focus', desc: 'A member-owned institution — your savings stay in the community and empower fellow members.' },
]

export default function CreditUnion() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'credit-union')
    setToast({ visible: true, message: success ? 'Interest registered! We\'ll contact you when membership enrolment opens.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Landmark size={15} /> Financial Services
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Dage Credit Union</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Member-focused financial services built on trust, transparency, and community empowerment. Your financial partner for life.
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-3 bg-white/15 border border-white/30 rounded-2xl px-6 py-4 mt-4">
            <Clock size={24} className="text-green-300" />
            <div className="text-left">
              <div className="text-white font-bold text-lg">Full Portal Coming Soon</div>
              <div className="text-green-200 text-sm">Member portal & online services launching shortly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Our Services</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Dage Credit Union is committed to providing accessible, affordable, and member-centred financial services to our growing community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-green-700" />
                </div>
                <h3 className="font-bold text-navy mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">About Us</span>
          <h2 className="text-3xl font-extrabold text-navy mt-2 mb-6">Built By Members, For Members</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Dage Credit Union is a cooperative financial institution owned and governed by its members. Unlike traditional banks, every member has an equal voice — and every shilling saved stays within the community to support loans, dividends, and shared growth.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            We are committed to financial inclusion, responsible lending, and helping every member achieve their savings and credit goals. Our full online portal — including member account access, loan applications, and financial tools — is currently in development and will launch shortly.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-full px-5 py-2.5 text-sm font-medium">
            <Clock size={15} /> Online portal launching soon — check back or contact us for membership info
          </div>
        </div>
      </section>

      {/* Membership Interest Form */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Join Us</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 mb-3">Register Your Interest</h2>
            <p className="text-gray-500">Leave your details and we'll contact you as soon as membership enrolment opens.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="name" type="text" placeholder="Your full name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input name="phone" type="tel" placeholder="+233 ..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input name="email" type="email" placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I'm Interested In</label>
              <select name="subject" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300">
                <option value="">Select service</option>
                <option>Savings Account</option>
                <option>Personal Loan</option>
                <option>Business Loan</option>
                <option>General Membership</option>
                <option>More Information</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea name="message" rows={3} placeholder="Any questions or specific needs..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none" />
            </div>
            <button type="submit" className="w-full bg-green-800 text-white font-semibold py-3 rounded-lg hover:bg-green-900 transition-colors flex items-center justify-center gap-2">
              Register Interest <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: 'Call Us', value: '+233 000 000 000' },
              { icon: Mail, label: 'Email Us', value: 'creditunion@dagegroup.com' },
              { icon: MapPin, label: 'Visit Us', value: 'Dage Credit Union Office, Ghana' },
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

      {/* Bottom CTA */}
      <section className="bg-green-800 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Your Financial Future Starts Here</h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">
            Join a growing community of members building wealth together. Dage Credit Union — saving together, growing together.
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-500 transition-colors">
            Register Your Interest <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  )
}
