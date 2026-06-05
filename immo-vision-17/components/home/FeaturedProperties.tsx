'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Bed, Bath, Maximize2, MapPin, Eye, Plane } from 'lucide-react'

const PROPERTIES = [
  {
    id: '1',
    slug: 'villa-piscine-royan-2024',
    title: 'Villa contemporaine avec piscine',
    city: 'Royan',
    price: 895000,
    surface: 185,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    hasDrone: true,
    hasVR: true,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    badge: 'Exclusivité',
    badgeColor: 'badge-premium',
  },
  {
    id: '2',
    slug: 'maison-vue-mer-saint-georges',
    title: 'Maison vue mer panoramique',
    city: 'Saint-Georges-de-Didonne',
    price: 1250000,
    surface: 220,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 3,
    hasPool: false,
    hasDrone: true,
    hasVR: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    badge: 'Coup de cœur',
    badgeColor: 'bg-rose-500/20 border border-rose-400/30 text-rose-300',
  },
  {
    id: '3',
    slug: 'appartement-terrasse-rochefort',
    title: 'Appartement T4 avec grande terrasse',
    city: 'Rochefort',
    price: 320000,
    surface: 92,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    hasPool: false,
    hasDrone: true,
    hasVR: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    badge: 'Nouveau',
    badgeColor: 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300',
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

export function FeaturedProperties() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-padding bg-dark-800" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-4">
              <span className="text-gold-400 text-sm font-medium uppercase tracking-widest">Sélection</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
              Biens en <span className="text-gold-gradient">exclusivité</span>
            </h2>
          </div>
          <Link
            href="/biens"
            className="hidden md:flex items-center gap-2 text-gold-400 text-sm font-medium hover:gap-3 transition-all"
          >
            Voir tous les biens
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link href={`/biens/${p.slug}`} className="block group property-card glass rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.badgeColor}`}>{p.badge}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {p.hasDrone && (
                      <span className="glass px-2.5 py-1 rounded-lg text-xs text-white/70 flex items-center gap-1">
                        <Plane className="w-3 h-3" /> Drone
                      </span>
                    )}
                    {p.hasVR && (
                      <span className="glass px-2.5 py-1 rounded-lg text-xs text-white/70 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> 360°
                      </span>
                    )}
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.city}
                  </div>
                  <h3 className="font-semibold text-white text-[15px] leading-snug mb-3 group-hover:text-gold-400 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/45 text-xs mb-4">
                    <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" /> {p.surface} m²</span>
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.bedrooms} ch.</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.bathrooms} sdb</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-400 font-bold text-xl">{formatPrice(p.price)}</span>
                    <span className="text-white/30 text-xs font-medium group-hover:text-gold-400 transition-colors flex items-center gap-1">
                      Voir le bien <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/biens" className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm">
            Voir tous les biens <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
