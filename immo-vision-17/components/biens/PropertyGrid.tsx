'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutGrid, List, MapPin, Bed, Bath, Maximize2, Eye, Plane, ArrowRight, Heart } from 'lucide-react'

const MOCK_PROPERTIES = [
  {
    id: '1',
    slug: 'villa-piscine-royan-2024',
    title: 'Villa contemporaine avec piscine',
    city: 'Royan',
    price: 895000,
    surface: 185,
    terrain: 650,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    hasDrone: true,
    hasVR: true,
    exclusive: true,
    type: 'VILLA',
    dpeScore: 'B',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
  {
    id: '2',
    slug: 'maison-vue-mer-saint-georges',
    title: 'Maison vue mer panoramique',
    city: 'Saint-Georges-de-Didonne',
    price: 1250000,
    surface: 220,
    terrain: 850,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 3,
    hasPool: false,
    hasDrone: true,
    hasVR: true,
    exclusive: false,
    type: 'MAISON',
    dpeScore: 'C',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    id: '3',
    slug: 'appartement-terrasse-rochefort',
    title: 'Appartement T4 grande terrasse',
    city: 'Rochefort',
    price: 320000,
    surface: 92,
    terrain: null,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    hasPool: false,
    hasDrone: true,
    hasVR: true,
    exclusive: false,
    type: 'APPARTEMENT',
    dpeScore: 'D',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    id: '4',
    slug: 'maison-jardin-saintes',
    title: 'Belle maison de bourg avec jardin',
    city: 'Saintes',
    price: 280000,
    surface: 140,
    terrain: 420,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 2,
    hasPool: false,
    hasDrone: true,
    hasVR: false,
    exclusive: false,
    type: 'MAISON',
    dpeScore: 'E',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  },
  {
    id: '5',
    slug: 'terrain-constructible-brouage',
    title: 'Terrain constructible vue nature',
    city: 'Brouage',
    price: 95000,
    surface: 0,
    terrain: 1200,
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
    hasPool: false,
    hasDrone: true,
    hasVR: false,
    exclusive: true,
    type: 'TERRAIN',
    dpeScore: null,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    id: '6',
    slug: 'villa-luxe-la-rochelle',
    title: 'Villa de luxe à deux pas du vieux port',
    city: 'La Rochelle',
    price: 1890000,
    surface: 310,
    terrain: 1100,
    rooms: 9,
    bedrooms: 5,
    bathrooms: 4,
    hasPool: true,
    hasDrone: true,
    hasVR: true,
    exclusive: true,
    type: 'VILLA',
    dpeScore: 'A',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

const DPE_COLORS: Record<string, string> = {
  A: 'dpe-a', B: 'dpe-b', C: 'dpe-c', D: 'dpe-d', E: 'dpe-e', F: 'dpe-f', G: 'dpe-g',
}

export function PropertyGrid() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/40 text-sm">
          <span className="text-white font-semibold">{MOCK_PROPERTIES.length}</span> biens trouvés
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-all ${ view === 'grid' ? 'bg-gold-500/10 text-gold-400' : 'text-white/30 hover:text-white/60' }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-all ${ view === 'list' ? 'bg-gold-500/10 text-gold-400' : 'text-white/30 hover:text-white/60' }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={view === 'grid' ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
        {MOCK_PROPERTIES.map((p) => (
          <Link key={p.id} href={`/biens/${p.slug}`} className="group block">
            {view === 'grid' ? (
              <div className="glass rounded-2xl overflow-hidden property-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
                  {p.exclusive && (
                    <span className="absolute top-3 left-3 badge-premium px-3 py-1 rounded-full text-xs">Exclusivité</span>
                  )}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {p.hasDrone && <span className="glass px-2 py-1 rounded-lg text-xs text-white/60"><Plane className="w-3 h-3 inline" /></span>}
                    {p.hasVR && <span className="glass px-2 py-1 rounded-lg text-xs text-white/60"><Eye className="w-3 h-3 inline" /></span>}
                  </div>
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute bottom-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${ favorites.includes(p.id) ? 'fill-gold-500 text-gold-500' : 'text-white/50' }`} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-white/35 text-xs mb-1.5">
                    <MapPin className="w-3 h-3" /> {p.city}
                    {p.dpeScore && (
                      <span className={`ml-auto px-2 py-0.5 rounded text-xs font-bold text-white ${DPE_COLORS[p.dpeScore]}`}>DPE {p.dpeScore}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-gold-400 transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-3 text-white/40 text-xs mb-3">
                    <span><Maximize2 className="w-3 h-3 inline mr-0.5" />{p.surface > 0 ? `${p.surface} m²` : `${p.terrain} m² terrain`}</span>
                    {p.bedrooms > 0 && <span><Bed className="w-3 h-3 inline mr-0.5" />{p.bedrooms}</span>}
                    {p.bathrooms > 0 && <span><Bath className="w-3 h-3 inline mr-0.5" />{p.bathrooms}</span>}
                  </div>
                  <p className="text-gold-400 font-bold text-lg">{formatPrice(p.price)}</p>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl overflow-hidden property-card flex gap-0">
                <div className="relative w-52 flex-shrink-0 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {p.exclusive && (
                    <span className="absolute top-2 left-2 badge-premium px-2 py-0.5 rounded-full text-xs">Exclu</span>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-white/35 text-xs mb-1">
                      <MapPin className="w-3 h-3" /> {p.city}
                    </div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-4 text-white/40 text-sm">
                      {p.surface > 0 && <span>{p.surface} m²</span>}
                      {p.terrain && <span>{p.terrain} m² terrain</span>}
                      {p.bedrooms > 0 && <span>{p.bedrooms} ch.</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gold-400 font-bold text-xl">{formatPrice(p.price)}</p>
                    <span className="text-white/30 text-sm group-hover:text-gold-400 transition-colors flex items-center gap-1">
                      Détails <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
