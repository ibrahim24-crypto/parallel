'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]

  const [activeLink, setActiveLink] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const projects = [
    { title: 'Custom Prototype', category: '3D Printing', image: '🔩' },
    { title: 'Metal Signage', category: 'Laser Cutting', image: '📋' },
    { title: 'Precision Parts', category: 'CNC Machining', image: '🛠️' },
    { title: 'Art Installation', category: 'Laser Cutting', image: '🎨' },
    { title: 'Production Run', category: '3D Printing', image: '📦' },
    { title: 'Industrial Fixture', category: 'CNC Machining', image: '📐' },
  ]

  const filteredProjects = projects.filter(p => filter === 'All' ? true : p.category === filter)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 50)

      // update active section
      const sections = ['home','services','portfolio','about','contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveLink(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#','')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openSchedule = () => { setModalOpen(true) }
  const closeSchedule = () => { setModalOpen(false) }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      setToast('Please enter name and email')
      setTimeout(() => setToast(''), 2500)
      return
    }
    // ponytail: no backend — simulate success
    setToast('Request sent — we\'ll reach out!')
    setForm({ name: '', email: '', message: '' })
    setModalOpen(false)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white overflow-x-hidden">
      {/* Animated Top Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-green-500/20 py-4' 
          : 'bg-black/30 backdrop-blur-sm py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-black text-lg transform group-hover:scale-110 group-hover:rotate-12 transition duration-300">
              P
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-green-400 to-orange-500 bg-clip-text text-transparent group-hover:opacity-80 transition duration-300">PARALLEL</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`relative transition duration-300 text-sm font-semibold uppercase tracking-wide group ${activeLink === link.href.replace('#','') ? 'text-white' : 'text-gray-300 hover:text-green-400'}`}>
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-md bg-black/30 hover:bg-black/40 transition">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            <button onClick={openSchedule} className="group relative px-4 py-2 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg font-bold text-sm text-white overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
              Schedule Demo
            </button>
          </div>

          {mobileOpen && (
            <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md md:hidden px-6 py-4 z-40">
              <div className="flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <a key={i} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }} className="text-white py-2 border-b border-white/5">{link.label}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Dynamic background blobs with parallax */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-green-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', transform: `translateY(${scrollY * 0.3}px)` }}></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-br from-green-600/15 to-orange-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s', transform: `translateY(${scrollY * -0.2}px)` }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-green-500/10 to-orange-500/10 rounded-full blur-3xl" style={{ animationDuration: '6s', transform: `translate(-50%, calc(-50% + ${scrollY * 0.5}px))` }}></div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative px-6">
        <div className="text-center space-y-8 max-w-4xl animate-fade-in-up">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-orange-500 rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
            <div className="relative flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-orange-500 rounded-3xl flex items-center justify-center text-5xl font-black animate-float shadow-2xl shadow-green-500/50">
                P
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
            PARALLEL
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Advanced manufacturing solutions for <span className="text-green-400 font-semibold">3D Printing</span>, <span className="text-orange-400 font-semibold">Laser Cutting</span> & <span className="text-green-400 font-semibold">CNC Machining</span>
          </p>
          
          <div className="flex gap-4 justify-center pt-8 flex-wrap animate-fade-in-up stagger-3">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-orange-500 rounded-xl font-bold text-lg text-white overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 active:scale-95">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-600 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            </button>
            <button className="px-8 py-4 border-2 border-green-500 rounded-xl font-bold text-lg hover:bg-green-500/10 transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 active:scale-95">
              Learn More
            </button>
          </div>

          {/* Animated scroll indicator */}
          <div className="pt-16" style={{ animation: 'bounce 2s infinite' }}>
            <svg className="w-6 h-6 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center py-20 relative px-6">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-6xl md:text-7xl font-black mb-20 text-center animate-fade-in-up">
            Our Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '3D Printing',
                icon: '🖨️',
                description: 'High-precision 3D printing with advanced materials. From prototypes to production parts.',
                features: ['Professional Resins', 'Metals & Composites', '24h Turnaround', 'Quality Assured']
              },
              {
                title: 'Laser Cutting',
                icon: '✂️',
                description: 'Precision laser cutting for any material. Create intricate designs with accuracy.',
                features: ['Custom Designs', 'Multiple Materials', 'Fast Processing', 'Complex Geometries']
              },
              {
                title: 'CNC Machining',
                icon: '⚙️',
                description: 'Professional CNC machining for metal & plastic. Industrial-grade precision.',
                features: ['Aluminum & Steel', 'Multi-axis', 'Tight Tolerances', 'Scalable Production']
              }
            ].map((service, i) => (
              <div 
                key={i}
                className="group bg-gradient-to-br from-green-500/15 to-orange-600/15 border border-green-500/30 rounded-2xl overflow-hidden hover:border-orange-400 transition duration-500 hover-lift animate-scale-in stagger-1 cursor-pointer backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="h-32 bg-gradient-to-br from-green-500/20 to-orange-500/20 group-hover:from-green-500/40 group-hover:to-orange-500/40 transition duration-500 flex items-center justify-center text-7xl transform group-hover:scale-110 duration-500">
                  {service.icon}
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-black group-hover:text-orange-400 transition duration-300">{service.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition duration-300 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="pt-4 space-y-2">
                    {service.features.map((feature, j) => (
                      <div key={j} className="text-sm text-gray-400 flex items-center gap-3 transform transition duration-300 group-hover:translate-x-1 group-hover:text-orange-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-orange-400 transition"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen flex items-center py-20 relative px-6">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-6xl md:text-7xl font-black mb-20 text-center animate-fade-in-up">
            Featured Projects
          </h2>
          
          <div className="flex justify-center gap-3 mb-8">
            {['All','3D Printing','Laser Cutting','CNC Machining'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === f ? 'bg-gradient-to-r from-green-500 to-orange-500 text-white shadow-lg' : 'bg-black/30 text-gray-300 hover:bg-black/40'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-green-500/15 to-orange-900/20 border border-green-500/30 rounded-2xl overflow-hidden hover:border-orange-400 transition duration-500 hover-lift animate-scale-in stagger-1 backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-square bg-gradient-to-br from-green-500/20 to-orange-600/20 group-hover:from-green-500/40 group-hover:to-orange-500/40 transition duration-500 flex items-center justify-center text-8xl transform group-hover:scale-125 duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-orange-500/20 to-orange-500/0 transform group-hover:-translate-x-full duration-500"></div>
                  {project.image}
                </div>
                <div className="p-6 space-y-3">
                  <span className="inline-block px-4 py-1 bg-green-500/30 text-orange-300 rounded-full text-xs font-black uppercase tracking-widest">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-black group-hover:text-orange-400 transition duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20 relative px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 w-full">
          <div className="space-y-8 animate-slide-in-left">
            <h2 className="text-6xl md:text-7xl font-black leading-tight">
              About<br />Parallel
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Parallel is a premier manufacturing solutions provider combining cutting-edge technology with expert craftsmanship. We deliver precision, speed, and quality in every project.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Inspired by industry leaders like Bambu Lab, we use state-of-the-art equipment to serve your needs from rapid prototyping to production-scale manufacturing.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-8">
              {[
                { number: '500+', label: 'Projects' },
                { number: '98%', label: 'Satisfaction' },
                { number: '24h', label: 'Turnaround' },
                { number: '50+', label: 'Clients' }
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-gradient-to-br from-green-500/20 to-orange-600/20 border border-green-500/30 rounded-xl hover:border-orange-400 transition duration-300 hover:bg-green-500/30 animate-scale-in stagger-1 backdrop-blur-sm" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="text-3xl font-black text-orange-400">{stat.number}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-widest font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <h3 className="text-4xl font-black mb-8">Why Choose Us?</h3>
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Rapid turnaround without quality compromise' },
              { icon: '🎯', title: 'Precision', desc: 'Micron-level accuracy on every project' },
              { icon: '🏆', title: 'Excellence', desc: 'Years of manufacturing expertise' },
              { icon: '💎', title: 'Premium', desc: 'Competitive pricing, premium results' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gradient-to-r from-green-500/10 to-orange-600/10 border border-green-500/30 rounded-xl hover:border-orange-400 hover:from-green-500/20 hover:to-orange-600/20 transition duration-300 transform hover:translate-x-2 animate-fade-in-up stagger-1 backdrop-blur-sm group cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex gap-4 group-hover:gap-6 transition duration-300">
                  <div className="text-3xl flex-shrink-0 transform group-hover:scale-125 group-hover:text-orange-400 transition duration-300">{item.icon}</div>
                  <div>
                    <h4 className="font-black text-lg mb-1 group-hover:text-orange-400 transition duration-300">{item.title}</h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition duration-300">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 relative px-6">
        <div className="max-w-6xl mx-auto w-full text-center space-y-12">
          <div className="animate-fade-in-up space-y-6">
            <h2 className="text-6xl md:text-7xl font-black leading-tight">
              Let's Build<br />Your Future
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to bring your vision to life? Our team is eager to discuss your next manufacturing project.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up stagger-2">
            <a href="mailto:ibrahimezzine09@gmail.com" className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-orange-500 rounded-xl font-bold text-lg text-white overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 active:scale-95">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-600 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            </a>
            <a href="#" className="px-8 py-4 border-2 border-green-500 rounded-xl font-bold text-lg hover:bg-green-500/10 transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
              Schedule Demo
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-12">
            {[
              { label: 'Phone', value: '+212 5XX XXX XXX', icon: '📞' },
              { label: 'Email', value: 'ibrahimezzine09@gmail.com', icon: '✉️' },
              { label: 'Location', value: 'Marrakech, Morocco', icon: '📍', link: 'https://www.google.com/maps/place/Parallel+Builds/@31.6811196,-8.0487584,17z/data=!3m1!4b1!4m17!1m10!4m9!1m6!1m2!1s0xdafedff2ed4564b:0xc15b8cfe332b2c31!2sParallel+Builds,+N+31,+Lot+Mabrour+Fatna,+31+secteur+017967,+Marrakech+40000!2m2!1d-8.0438875!2d31.6811197!1m0!3e2!3m5!1s0xdafedff2ed4564b:0xc15b8cfe332b2c31!8m2!3d31.6811197!4d-8.0438875!16s%2Fg%2F11nc5s3tp8?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D' }
            ].map((contact, i) => (
              <a 
                key={i}
                href={contact.link || '#'}
                target={contact.link ? '_blank' : undefined}
                rel={contact.link ? 'noopener noreferrer' : undefined}
                className="p-8 bg-gradient-to-br from-green-500/15 to-orange-600/15 border border-green-500/30 rounded-xl hover:border-orange-400 hover:from-green-500/25 hover:to-orange-600/25 transition duration-300 animate-fade-in-up stagger-1 backdrop-blur-sm group cursor-pointer" 
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition duration-300">{contact.icon}</div>
                <div className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-semibold">{contact.label}</div>
                <div className="font-black text-lg text-orange-400 group-hover:text-orange-300 transition duration-300">{contact.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeSchedule}></div>
          <form onSubmit={submitForm} className="relative bg-neutral-900 p-6 rounded-2xl w-full max-w-md z-10">
            <h3 className="text-2xl font-black mb-4">Schedule Demo</h3>
            <label className="text-sm text-gray-300">Name</label>
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-3 rounded-md bg-black/20 mb-3" />
            <label className="text-sm text-gray-300">Email</label>
            <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full p-3 rounded-md bg-black/20 mb-3" />
            <label className="text-sm text-gray-300">Details</label>
            <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full p-3 rounded-md bg-black/20 mb-3" rows={4} />
            <div className="flex gap-3 justify-end mt-4">
              <button type="button" onClick={closeSchedule} className="px-4 py-2 bg-black/20 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded">Send</button>
            </div>
          </form>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-black/80 text-white px-4 py-2 rounded">{toast}</div>
      )}

      {/* Footer */}
      <footer className="bg-black/80 border-t border-green-600/30 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-green-500 font-black text-2xl mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-orange-500 rounded-2xl animate-pulse"></div>
                PARALLEL
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Advanced manufacturing solutions for the future.</p>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-sm text-green-400">Services</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">3D Printing</a></li>
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">Laser Cutting</a></li>
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">CNC Machining</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-sm text-green-400">Company</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">Portfolio</a></li>
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-sm text-green-400">Social</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">Twitter</a></li>
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">LinkedIn</a></li>
                <li><a href="#" className="hover:text-orange-400 transition duration-300 transform hover:translate-x-1 inline-block">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-600/30 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Parallel Manufacturing. Precision. Speed. Excellence.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {scrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-green-500/50 transition duration-300 transform hover:scale-110 z-40 animate-fade-in-up"
        >
          ↑
        </button>
      )}
    </div>
  )
}
