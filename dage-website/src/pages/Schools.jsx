import { useState } from 'react'
import { GraduationCap, Users, BookOpen, Star, MapPin, Phone, Mail, CheckCircle, ArrowRight, Shield, Heart, Lightbulb } from 'lucide-react'
import { submitForm } from '../lib/submitForm'
import Toast from '../components/Toast'

const schools = {
  montessori: {
    name: 'Divine Age Montessori School',
    tagline: 'Learning Through Discovery',
    description: 'Divine Age Montessori School is rooted in the philosophy that children are naturally curious and capable learners. Our Montessori-trained educators guide students through self-directed activities that foster independence, creativity, and a love for learning.',
    color: 'from-blue-600 to-blue-900',
    accent: 'blue',
    features: [
      { icon: Heart, title: 'Child-Centred Learning', desc: 'Every child learns at their own pace in a prepared environment designed to spark curiosity.' },
      { icon: Lightbulb, title: 'Hands-On Activities', desc: 'Concrete materials and real-world activities replace rote memorisation.' },
      { icon: Shield, title: 'Safe Environment', desc: 'Our campus is designed with pupil safety as the top priority — secure, clean, and nurturing.' },
      { icon: Users, title: 'Experienced Staff', desc: 'Montessori-certified teachers dedicated to each child\'s holistic development.' },
    ],
    levels: ['Nursery', 'Kindergarten', 'Lower Primary', 'Upper Primary'],
    stats: [
      { label: 'Students Enrolled', value: '300+' },
      { label: 'Qualified Teachers', value: '20+' },
      { label: 'Years of Excellence', value: '8+' },
      { label: 'Parent Satisfaction', value: '95%' },
    ],
  },
  galaxy: {
    name: 'Dage Galaxy School',
    tagline: 'Excellence. Character. Future.',
    description: 'Dage Galaxy School is committed to academic excellence, character development, and producing graduates who are confident, morally upright, and globally competitive. We combine rigorous academics with extracurricular enrichment.',
    color: 'from-indigo-600 to-indigo-900',
    accent: 'indigo',
    features: [
      { icon: BookOpen, title: 'Strong Academics', desc: 'Rigorous curriculum aligned with national standards and beyond — preparing students for higher education.' },
      { icon: Star, title: 'Holistic Development', desc: 'Sports, arts, leadership programmes, and clubs complement academic learning.' },
      { icon: Shield, title: 'Discipline & Safety', desc: 'A structured environment where discipline and mutual respect are core values.' },
      { icon: Users, title: 'Dedicated Educators', desc: 'Passionate teachers who invest in every student\'s success inside and outside the classroom.' },
    ],
    levels: ['Junior High School', 'Senior High School'],
    stats: [
      { label: 'Students Enrolled', value: '500+' },
      { label: 'Qualified Teachers', value: '35+' },
      { label: 'Years of Excellence', value: '6+' },
      { label: 'Pass Rate', value: '98%' },
    ],
  },
}

export default function Schools() {
  const [active, setActive] = useState('montessori')
  const school = schools[active]
  const [toast, setToast] = useState({ visible: false, message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const { success } = await submitForm(e.target, 'schools')
    setToast({ visible: true, message: success ? 'Enrollment inquiry submitted! Our admissions team will contact you within 24 hours.' : 'Something went wrong. Please try again.' })
    if (success) e.target.reset()
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${school.color} py-24 text-white transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <GraduationCap size={15} /> Education
          </div>
          <h1 className="text-5xl font-extrabold mb-4">{school.name}</h1>
          <p className="text-xl text-white/80 mb-10">{school.tagline}</p>

          {/* School Toggle */}
          <div className="inline-flex bg-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setActive('montessori')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${active === 'montessori' ? 'bg-white text-blue-800' : 'text-white hover:bg-white/10'}`}
            >
              Montessori School
            </button>
            <button
              onClick={() => setActive('galaxy')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${active === 'galaxy' ? 'bg-white text-indigo-800' : 'text-white hover:bg-white/10'}`}
            >
              Galaxy School
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {school.stats.map(({ label, value }) => (
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
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">About the School</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 mb-5">{school.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{school.description}</p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-navy mb-3">Levels Offered:</p>
                <div className="flex flex-wrap gap-2">
                  {school.levels.map((level) => (
                    <span key={level} className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium px-3 py-1 rounded-full">
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {school.features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h4 className="font-semibold text-navy text-sm mb-1">{title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Standards</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Why Parents Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              'Qualified and passionate teaching staff',
              'Safe, secure, and well-maintained campus',
              'Clear and enforced dress code and discipline policy',
              'Regular parent-teacher communication',
              'Competitive tuition with quality results',
              'Extracurricular activities and enrichment programs',
              'Registered with Ghana Education Service',
              'Strong moral and character development emphasis',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle size={17} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Admissions</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2 mb-3">Enrol Your Child Today</h2>
            <p className="text-gray-500">Fill in the form below and a member of our admissions team will contact you within 24 hours.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent / Guardian Name</label>
                <input name="name" type="text" placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
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
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Child's Name</label>
                <input name="child_name" type="text" placeholder="Child's full name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Child's Age</label>
                <input name="child_age" type="number" placeholder="Age" min="2" max="18" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School & Level</label>
              <select name="subject" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300">
                <option value="">Select school and level</option>
                <option>Divine Age Montessori — Nursery</option>
                <option>Divine Age Montessori — Kindergarten</option>
                <option>Divine Age Montessori — Lower Primary</option>
                <option>Divine Age Montessori — Upper Primary</option>
                <option>Dage Galaxy — Junior High School</option>
                <option>Dage Galaxy — Senior High School</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea name="message" rows={3} placeholder="Any special requirements or questions..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
            </div>
            <button type="submit" className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
              Submit Enquiry <ArrowRight size={16} />
            </button>
          </form>

          {/* Contact */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: 'Call Us', value: '+233 000 000 000' },
              { icon: Mail, label: 'Email Us', value: 'schools@dagegroup.com' },
              { icon: MapPin, label: 'Visit Us', value: 'Dage Schools Campus, Ghana' },
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
