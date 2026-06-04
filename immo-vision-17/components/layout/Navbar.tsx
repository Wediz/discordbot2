'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Home, Building2, Calculator, Users, BookOpen, MessageCircle } from 'lucide-react'

const navLinks = [
  {
    label: 'Biens',
    href: '/biens',
    icon: Home,
    sub: [
      { label: 'Tous les biens', href: '/biens', desc: 'Maisons, appartements, terrains' },
      { label: 'Maisons', href: '/biens?type=MAISON', desc: 'Maisons individuelles' },
      { label: 'Appartements', href: '/biens?type=APPARTEMENT', desc: 'T2 à T5 et plus' },
      { label: 'Terrains & Villas', href: '/biens?type=TERRAIN', desc: 'Terrains constructibles' },
    ],
  },
  {
    label: 'Estimation',
    href: '/estimation',
    icon: Calculator,
  },
  {
    label: 'Services',
    href: '/#services',
    icon: Building2,
    sub: [
      { label: 'Photos professionnelles', href: '/#services', desc: 'Mise en valeur HD' },
      { label: 'Drone 4K', href: '/#services', desc: 'Vues aériennes' },
      { label: 'Visite virtuelle 360°', href: '/#services', desc: 'Immersion totale' },
      { label: 'Vidéo cinématique', href: '/#services', desc: 'Storytelling immobilier' },
    ],
  },
  {
    label: 'Espace Vendeur',
    href: '/espace-vendeur',
    icon: Users,
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: BookOpen,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: MessageCircle,
  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-shadow duration-300">
              <span className="font-display font-bold text-dark-900 text-base leading-none">IV</span>
            </div>
            <div className="leading-none">
              <span className="font-display font-semibold text-white text-xl tracking-wide">Immo Vision</span>
              <span className="text-gold-500 font-bold text-xl"> 17</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {link.sub && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === link.label ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {link.sub && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass rounded-2xl py-2 w-60 shadow-premium overflow-hidden"
                    >
                      {link.sub.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors duration-150 group/sub"
                        >
                          <span className="text-sm font-medium text-white group-hover/sub:text-gold-400 transition-colors">{sub.label}</span>
                          <span className="text-xs text-white/35 mt-0.5">{sub.desc}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33600000000"
              className="flex items-center gap-2 text-sm text-white/55 hover:text-gold-400 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">06 XX XX XX XX</span>
            </a>
            <Link
              href="/estimation"
              className="btn-gold px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              Estimer mon bien
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="lg:hidden p-2 rounded-xl glass text-white hover:text-gold-400 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 mobile-nav"
          >
            <div className="h-full overflow-y-auto pt-20 px-6 pb-10">
              <div className="space-y-1 mt-6">
                {navLinks.map((link, i) => {
                  const Icon = link.icon
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 py-4 border-b border-white/5 transition-colors ${
                          pathname === link.href ? 'text-gold-400' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xl font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 space-y-3"
              >
                <Link
                  href="/estimation"
                  className="btn-gold block text-center w-full py-4 rounded-2xl text-base font-semibold"
                >
                  Estimer mon bien gratuitement
                </Link>
                <a
                  href="tel:+33600000000"
                  className="btn-outline flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-base font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  06 XX XX XX XX
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-white/5"
              >
                <p className="text-white/25 text-xs text-center">Partenaire officiel Efficity</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
