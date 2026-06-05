'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Maximize2, Bed, Bath, Calendar, Thermometer, Compass, Trees, Car,
  Droplets, Phone, Mail, Video, Globe, FileText, Calculator, ChevronDown, ChevronUp,
  Check, Star, Plane, Eye
} from 'lucide-react'
import { MortgageCalculator } from '@/components/biens/MortgageCalculator'

interface Property {
  title: string
  city: string
  zipCode: string
  address: string
  price: number
  surface: number
  terrain?: number | null
  rooms: number
  bedrooms: number
  bathrooms: number
  yearBuilt?: number | null
  hasPool: boolean
  hasGarage: boolean
  hasGarden: boolean
  hasTerrace: boolean
  hasSeaView: boolean
  heating?: string | null
  orientation?: string | null
  dpeScore?: string | null
  gesScore?: string | null
  annualEnergy?: number | null
  description: string
  virtualTourUrl?: string | null
  videoUrl?: string | null
  exclusive: boolean
}

const DPE_COLORS: Record<string, string> = { A: '#009966', B: '#55BB33', C: '#AACC00', D: '#FFCC00', E: '#FF9900', F: '#FF6600', G: '#CC0000' }

function formatPrice(p: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(p)
}

export function PropertyDetail({ property: p }: { property: Property }) {
  const [showCalc, setShowCalc] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [tab, setTab] = useState<'desc' | 'vr' | 'video' | 'plan'>('desc')

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span>{p.address}</span>
              {p.exclusive && <span className="ml-2 badge-premium px-3 py-1 rounded-full text-xs">Exclusivité</span>}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-white mb-2">{p.title}</h1>
            <p className="text-gold-400 font-bold text-3xl">{formatPrice(p.price)}</p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Maximize2, label: 'Surface', value: `${p.surface} m²` },
              { icon: Bed, label: 'Chambres', value: p.bedrooms.toString() },
              { icon: Bath, label: 'S.d.b', value: p.bathrooms.toString() },
              { icon: Calendar, label: 'Année', value: p.yearBuilt?.toString() ?? 'N/A' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-xl p-4 text-center">
                <Icon className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{value}</p>
                <p className="text-white/35 text-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* Media Tabs */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex border-b border-white/5">
              {[
                { key: 'desc', label: 'Description', icon: FileText },
                { key: 'vr', label: 'Visite 360°', icon: Eye },
                { key: 'video', label: 'Vidéo', icon: Video },
                { key: 'plan', label: 'Plan', icon: Globe },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key as typeof tab)}
                  className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium transition-all flex-1 justify-center border-b-2 ${
                    tab === key
                      ? 'border-gold-500 text-gold-400 bg-gold-500/5'
                      : 'border-transparent text-white/40 hover:text-white/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === 'desc' && (
                <div className="text-white/65 text-sm leading-relaxed whitespace-pre-line">{p.description}</div>
              )}
              {tab === 'vr' && (
                <div className="aspect-video rounded-xl overflow-hidden bg-dark-800">
                  {p.virtualTourUrl ? (
                    <iframe src={p.virtualTourUrl} className="w-full h-full" allow="fullscreen" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                      <Eye className="w-12 h-12 mb-3" />
                      <p>Visite virtuelle disponible sur demande</p>
                    </div>
                  )}
                </div>
              )}
              {tab === 'video' && (
                <div className="aspect-video rounded-xl overflow-hidden bg-dark-800">
                  {p.videoUrl ? (
                    <iframe src={p.videoUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                      <Video className="w-12 h-12 mb-3" />
                      <p>Vidéo disponible prochainement</p>
                    </div>
                  )}
                </div>
              )}
              {tab === 'plan' && (
                <div className="aspect-video rounded-xl overflow-hidden bg-dark-800 flex items-center justify-center">
                  <p className="text-white/30">Plan du bien disponible sur demande</p>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-5">Caractéristiques</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: Trees, label: 'Jardin', active: p.hasGarden },
                { icon: Droplets, label: 'Piscine', active: p.hasPool },
                { icon: Car, label: 'Garage', active: p.hasGarage },
                { icon: Star, label: 'Vue mer', active: p.hasSeaView },
                { icon: Plane, label: 'Terrasse', active: p.hasTerrace },
                { icon: Thermometer, label: p.heating ?? 'Chauffage', active: !!p.heating },
              ]
                .filter((f) => f.active)
                .map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 py-2">
                    <Check className="w-4 h-4 text-gold-500" />
                    <span className="text-white/70 text-sm">{label}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* DPE */}
          {p.dpeScore && (
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-5">Diagnostic énergétique</h2>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                  style={{ background: DPE_COLORS[p.dpeScore] }}
                >
                  {p.dpeScore}
                </div>
                <div>
                  <p className="text-white font-medium">Classe énergétique {p.dpeScore}</p>
                  {p.annualEnergy && (
                    <p className="text-white/45 text-sm">{p.annualEnergy} kWh/m²/an</p>
                  )}
                  {p.gesScore && (
                    <p className="text-white/45 text-sm">GES : Classe {p.gesScore}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mortgage Calculator Toggle */}
          <div className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-white">Calculateur de mensualité</span>
              </div>
              {showCalc ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
            </button>
            {showCalc && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <MortgageCalculator defaultPrice={p.price} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Price */}
          <div className="glass-gold rounded-2xl p-6">
            <p className="text-white/45 text-sm mb-1">Prix de vente</p>
            <p className="text-gold-400 font-bold text-3xl mb-1">{formatPrice(p.price)}</p>
            <p className="text-white/30 text-xs">
              {Math.round(p.price / p.surface).toLocaleString('fr-FR')} €/m²
            </p>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={() => setShowContact(true)}
              className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Planifier une visite
            </button>
            <button className="btn-outline w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Recevoir le dossier complet
            </button>
            <a
              href="tel:+33600000000"
              className="btn-ghost w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 glass"
            >
              <Phone className="w-4 h-4" /> Être rappelé
            </a>
          </div>

          {/* Agent card */}
          <div className="glass rounded-2xl p-5">
            <p className="text-white/35 text-xs uppercase tracking-wider mb-3">Votre conseiller</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                <span className="font-display font-bold text-dark-900">IV</span>
              </div>
              <div>
                <p className="font-semibold text-white">Immo Vision 17</p>
                <p className="text-white/40 text-xs">Partenaire Efficity</p>
              </div>
            </div>
            <div className="space-y-2">
              <a href="tel:+33600000000" className="flex items-center gap-2 text-white/60 text-sm hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" /> 06 XX XX XX XX
              </a>
              <a href="mailto:contact@immovision17.fr" className="flex items-center gap-2 text-white/60 text-sm hover:text-gold-400 transition-colors">
                <Mail className="w-4 h-4" /> contact@immovision17.fr
              </a>
            </div>
          </div>

          {/* Premium badge */}
          <div className="glass-gold rounded-2xl p-4 text-center">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">✨ Média Premium Inclus</p>
            <div className="flex justify-center gap-4 text-white/50 text-xs">
              <span>📸 Photos Pro</span>
              <span>🚁 Drone</span>
              <span>🌐 360°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowContact(false)}>
          <div className="glass rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-2xl font-semibold text-white mb-6">Planifier une visite</h3>
            <form className="space-y-4">
              <input placeholder="Votre nom" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
              <input placeholder="Téléphone" type="tel" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
              <input placeholder="Email" type="email" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
              <input type="date" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
              <textarea placeholder="Message (optionnel)" rows={3} className="input-premium w-full px-4 py-3 rounded-xl text-sm resize-none" />
              <button type="submit" className="btn-gold w-full py-3.5 rounded-xl font-semibold">
                Confirmer la demande de visite
              </button>
              <button type="button" onClick={() => setShowContact(false)} className="btn-ghost w-full py-2.5 rounded-xl text-sm">
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
