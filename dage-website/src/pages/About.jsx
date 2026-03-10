import { Target, Eye, Heart, Users, Award, TrendingUp, Building2, Calendar, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  { icon: Heart, title: 'Integrity', desc: 'We conduct business with honesty, transparency, and ethical standards in all our dealings.' },
  { icon: Users, title: 'Community', desc: 'We are committed to uplifting the communities we serve through employment and quality services.' },
  { icon: Award, title: 'Excellence', desc: 'We strive for the highest standards in every product, service, and interaction.' },
  { icon: TrendingUp, title: 'Growth', desc: 'We continuously innovate and expand to create more value for stakeholders.' },
]

const milestones = [
  { year: '2014', title: 'Dage Group Founded', desc: 'The journey began with a vision to build diversified businesses that serve communities.' },
  { year: '2016', title: 'Divine Age Montessori Opens', desc: 'Our first school opened its doors, bringing quality Montessori education to the region.' },
  { year: '2018', title: 'Nemok Lodge Established', desc: 'Expanding into hospitality with a commitment to comfort and warm service.' },
  { year: '2019', title: 'City Xpress Launches', desc: 'Logistics and distribution services to power regional supply chains.' },
  { year: '2020', title: 'Amoah Traits Ventures', desc: 'Construction materials and supplies business established.' },
  { year: '2021', title: 'Dage Galaxy School', desc: 'A second school focused on academic excellence and holistic development.' },
  { year: '2022', title: 'Dage Bakery & Credit Union', desc: 'Food production and financial services added to the portfolio.' },
  { year: '2024', title: '7 Active Subsidiaries', desc: 'Dage Group now operates across 6 sectors with over 200 employees.' },
]

const leadership = [
  { name: 'Managing Director', role: 'Group CEO', desc: 'Oversees all subsidiary operations and strategic direction of Dage Group.' },
  { name: 'Operations Manager', role: 'Group Operations', desc: 'Coordinates day-to-day operations across all subsidiaries.' },
  { name: 'Finance Director', role: 'Group Finance', desc: 'Manages financial planning, reporting, and compliance.' },
]

export default function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-blue-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Building2 size={15} /> About Us
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Built on Purpose, Driven by Impact</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Dage Group is a Ghanaian conglomerate with a diversified portfolio spanning education, hospitality, logistics, construction, food production, and financial services.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200">
              <div className="w-14 h-14 rounded-xl bg-gold flex items-center justify-center mb-5">
                <Target size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To build and operate diversified businesses that deliver exceptional value to customers, create meaningful employment, and contribute positively to the economic and social development of the communities we serve.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-5">
                <Eye size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be a leading Ghanaian conglomerate recognized for excellence, integrity, and sustainable growth — building institutions that stand the test of time and create lasting impact for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2 mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              These principles guide every decision we make and every action we take across all our subsidiaries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Journey</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2 mb-4">Milestones & Growth</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From humble beginnings to a diversified conglomerate — here's how we've grown over the years.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-amber-200 hidden lg:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex flex-col lg:flex-row items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 inline-block">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className="text-gold" />
                        <span className="text-sm font-bold text-gold">{m.year}</span>
                      </div>
                      <h3 className="font-bold text-navy mb-1">{m.title}</h3>
                      <p className="text-sm text-gray-600">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-gold border-4 border-amber-100 shrink-0 z-10" />
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Team</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2 mb-4">Leadership</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Experienced professionals guiding Dage Group's strategic direction and operations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {leadership.map((leader) => (
              <div key={leader.role} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-blue-800 mx-auto mb-4 flex items-center justify-center">
                  <Users size={32} className="text-white/80" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-1">{leader.name}</h3>
                <p className="text-sm text-gold font-medium mb-3">{leader.role}</p>
                <p className="text-sm text-gray-600">{leader.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '7', label: 'Active Subsidiaries' },
              { value: '10+', label: 'Years in Business' },
              { value: '200+', label: 'Employees' },
              { value: '6', label: 'Industry Sectors' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-extrabold text-gold mb-1">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-navy mb-4">Ready to Work With Us?</h2>
          <p className="text-gray-500 mb-8">Explore our subsidiaries or reach out to discuss partnership opportunities.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-500 transition-colors"
            >
              Explore Companies <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-navy text-navy font-semibold px-8 py-3.5 rounded-full hover:bg-navy hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
