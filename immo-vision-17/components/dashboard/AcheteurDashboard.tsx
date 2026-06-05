'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Bell, Search, History, FileText, MapPin, Bed, Maximize2, Trash2, BellRing, ArrowRight } from 'lucide-react'

const FAVORITES = [
  {
    id: '1', slug: 'villa-piscine-royan-2024', title: 'Villa contemporaine avec piscine',
    city: 'Royan', price: 895000, surface: 185, bedrooms: 4,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80',
    savedAt: 'Il y a 2 jours',
  },
  {
    id: '2', slug: 'maison-vue-mer-saint-georges', title: 'Maison vue mer panoramique',
    city: 'Saint-Georges-de-Didonne', price: 1250000, surface: 220, bedrooms: 5,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
    savedAt: 'Il y a 5 jours',
  },
]

const SEARCHES = [
  { id: '1', name: 'Maison Royan ≤ 900k', filters: { city: 'Royan', maxPrice: 900000, type: 'MAISON' }, alert: true, lastMatch: '3 nouveaux biens' },
  { id: '2', name: 'Appartement Rochefort', filters: { city: 'Rochefort', type: 'APPARTEMENT' }, alert: false, lastMatch: '1 nouveau bien' },
]

const VISIT_HISTORY = [
  { property: 'Villa contemporaine avec piscine', city: 'Royan', date: '01 juin 2024', feedback: 'Excellent - potentiellement intéressé' },
  { property: 'Appartement T4 grande terrasse', city: 'Rochefort', date: '25 mai 2024', feedback: 'Bien mais prix trop élevé' },
]

function formatPrice(p: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(p)
}

export function AcheteurDashboard() {
  const [tab, setTab] = useState<'favorites' | 'searches' | 'history' | 'docs'>('favorites')
  const [favorites, setFavorites] = useState(FAVORITES)

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 glass rounded-2xl p-1 w-fit">
        {[
          { id: 'favorites', label: 'Favoris', icon: Heart },
          { id: 'searches', label: 'Alertes', icon: Bell },
          { id: 'history', label: 'Historique', icon: History },
          { id: 'docs', label: 'Documents', icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === id ? 'bg-gold-500/15 text-gold-400' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Favorites */}
      {tab === 'favorites' && (
        <div className="space-y-4">
          {favorites.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <Heart className="w-12 h-12 text-white/15 mx-auto mb-3" />
              <p className="text-white/40">Aucun favori pour le moment</p>
              <Link href="/biens" className="btn-gold inline-block mt-4 px-6 py-2.5 rounded-full text-sm font-semibold">
                Explorer les biens
              </Link>
            </div>
          ) : (
            favorites.map((f) => (
              <div key={f.id} className="glass rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                <div className="relative sm:w-44 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-white/35 text-xs flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" /> {f.city}
                    </p>
                    <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                    <div className="flex gap-4 text-white/40 text-xs">
                      <span><Maximize2 className="w-3 h-3 inline mr-0.5" />{f.surface} m²</span>
                      <span><Bed className="w-3 h-3 inline mr-0.5" />{f.bedrooms} ch.</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gold-400 font-bold text-xl">{formatPrice(f.price)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFavorites((prev) => prev.filter((x) => x.id !== f.id))}
                        className="p-2 glass rounded-xl text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/biens/${f.slug}`}
                        className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1"
                      >
                        Voir <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Searches/Alerts */}
      {tab === 'searches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white/40 text-sm">{SEARCHES.length} recherche{SEARCHES.length > 1 ? 's' : ''} sauvegardée{SEARCHES.length > 1 ? 's' : ''}</p>
            <button className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> Nouvelle recherche
            </button>
          </div>
          {SEARCHES.map((s) => (
            <div key={s.id} className="glass rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ s.alert ? 'bg-gold-500/15' : 'bg-white/5' }`}>
                  <BellRing className={`w-5 h-5 ${ s.alert ? 'text-gold-400' : 'text-white/30' }`} />
                </div>
                <div>
                  <p className="font-semibold text-white">{s.name}</p>
                  <p className="text-white/35 text-sm mt-0.5">{s.lastMatch}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-10 h-5 rounded-full transition-all ${ s.alert ? 'bg-gold-500' : 'bg-white/15' }`}>
                    <div className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${ s.alert ? 'translate-x-5' : '' }`} />
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visit history */}
      {tab === 'history' && (
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-5">Historique des visites</h3>
          <div className="space-y-4">
            {VISIT_HISTORY.map((v, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-white/5 last:border-0">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <History className="w-5 h-5 text-gold-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{v.property}</p>
                  <p className="text-white/40 text-xs mt-0.5">{v.city} · {v.date}</p>
                  <p className="text-white/55 text-sm mt-1">{v.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      {tab === 'docs' && (
        <div className="glass rounded-2xl p-8 text-center">
          <FileText className="w-12 h-12 text-white/15 mx-auto mb-3" />
          <p className="text-white/40">Vos documents apparaîtront ici une fois vos visites confirmées.</p>
        </div>
      )}
    </div>
  )
}
