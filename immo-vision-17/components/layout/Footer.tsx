import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

const cities = [
  { name: 'Royan', slug: 'royan' },
  { name: 'Rochefort', slug: 'rochefort' },
  { name: 'Saintes', slug: 'saintes' },
  { name: 'La Rochelle', slug: 'la-rochelle' },
  { name: 'Brouage', slug: 'brouage' },
  { name: 'Saint-Georges-de-Didonne', slug: 'saint-georges-de-didonne' },
  { name: 'Saujon', slug: 'saujon' },
  { name: 'Pont-l\'Abbé-d\'Arnoult', slug: 'pont-labbe-darnoult' },
]

const services = [
  { name: 'Photos professionnelles', href: '/#services' },
  { name: 'Drone 4K', href: '/#services' },
  { name: 'Visite virtuelle 360°', href: '/#services' },
  { name: 'Vidéo cinématique', href: '/#services' },
  { name: 'Plans aériens', href: '/#services' },
  { name: 'Réseaux sociaux', href: '/#services' },
  { name: 'Marketing digital', href: '/#services' },
]

const links = [
  { name: 'Nos biens', href: '/biens' },
  { name: 'Estimation gratuite', href: '/estimation' },
  { name: 'Espace Vendeur', href: '/espace-vendeur' },
  { name: 'Espace Acheteur', href: '/espace-acheteur' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Mentions légales', href: '/mentions-legales' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-900">
      {/* Main footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="font-display font-bold text-dark-900 text-base">IV</span>
              </div>
              <div>
                <span className="font-display font-semibold text-white text-lg">Immo Vision</span>
                <span className="text-gold-500 font-bold text-lg"> 17</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Consultant immobilier indépendant en Charente-Maritime. Partenaire Efficity.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:+33600000000" className="flex items-center gap-2 text-white/50 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" />
                06 XX XX XX XX
              </a>
              <a href="mailto:contact@immovision17.fr" className="flex items-center gap-2 text-white/50 hover:text-gold-400 transition-colors">
                <Mail className="w-4 h-4" />
                contact@immovision17.fr
              </a>
              <p className="flex items-start gap-2 text-white/40">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Charente-Maritime (17)
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/30 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/30 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/30 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Services Premium</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-white/40 text-sm hover:text-gold-400 transition-colors gold-line">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-white/40 text-sm hover:text-gold-400 transition-colors gold-line">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Cities */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Zones d\'intervention</h3>
            <ul className="space-y-2.5">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/immobilier-${c.slug}`}
                    className="text-white/40 text-sm hover:text-gold-400 transition-colors gold-line"
                  >
                    Immobilier {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 glass-gold rounded-xl p-4">
              <p className="text-gold-400/80 text-xs font-medium uppercase tracking-widest mb-1">Partenaire officiel</p>
              <p className="text-white font-semibold">Efficity</p>
              <p className="text-white/35 text-xs mt-1">Réseau immobilier national</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            &copy; {new Date().getFullYear()} Immo Vision 17. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="text-white/25 text-sm hover:text-white/50 transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="text-white/25 text-sm hover:text-white/50 transition-colors">Confidentialité</Link>
            <Link href="/cookies" className="text-white/25 text-sm hover:text-white/50 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
