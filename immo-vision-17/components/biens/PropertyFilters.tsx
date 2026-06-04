'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'

const CITIES = ['Royan', 'Rochefort', 'Saintes', 'La Rochelle', 'Saint-Georges-de-Didonne', 'Saujon', 'Brouage']
const TYPES = [
  { value: 'MAISON', label: 'Maison' },
  { value: 'APPARTEMENT', label: 'Appartement' },
  { value: 'TERRAIN', label: 'Terrain' },
  { value: 'VILLA', label: 'Villa' },
]

export function PropertyFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [city, setCity] = useState(searchParams.get('city') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [minSurface, setMinSurface] = useState(searchParams.get('minSurface') || '')
  const [hasPool, setHasPool] = useState(searchParams.get('hasPool') === 'true')
  const [hasSeaView, setHasSeaView] = useState(searchParams.get('hasSeaView') === 'true')
  const [mobileOpen, setMobileOpen] = useState(false)

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (type) params.set('type', type)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (minSurface) params.set('minSurface', minSurface)
    if (hasPool) params.set('hasPool', 'true')
    if (hasSeaView) params.set('hasSeaView', 'true')
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    setCity(''); setType(''); setMinPrice(''); setMaxPrice('')
    setMinSurface(''); setHasPool(false); setHasSeaView(false)
    router.push(pathname)
  }

  const hasActiveFilters = !!(city || type || minPrice || maxPrice || minSurface || hasPool || hasSeaView)

  const FiltersContent = () => (
    <div className="space-y-5">
      {/* City */}
      <div>
        <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">Ville</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
        >
          <option value="">Toutes les villes</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">Type</label>
        <div className="grid grid-cols-2 gap-2">
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(type === t.value ? '' : t.value)}
              className={`py-2 rounded-xl text-sm font-medium transition-all border ${
                type === t.value
                  ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                  : 'border-white/10 text-white/50 hover:border-white/20'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">Budget</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min €"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input-premium px-3 py-2.5 rounded-xl text-sm w-full"
          />
          <input
            type="number"
            placeholder="Max €"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input-premium px-3 py-2.5 rounded-xl text-sm w-full"
          />
        </div>
      </div>

      {/* Surface */}
      <div>
        <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">Surface min (m²)</label>
        <input
          type="number"
          placeholder="Ex : 80"
          value={minSurface}
          onChange={(e) => setMinSurface(e.target.value)}
          className="input-premium px-3 py-2.5 rounded-xl text-sm w-full"
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Options</label>
        <div className="space-y-2.5">
          {[
            { label: '🏊 Piscine', value: hasPool, setter: setHasPool },
            { label: '🌊 Vue mer', value: hasSeaView, setter: setHasSeaView },
          ].map(({ label, value, setter }) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => setter(!value)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  value ? 'bg-gold-500 border-gold-500' : 'border-white/20 group-hover:border-white/40'
                }`}
              >
                {value && <span className="text-dark-900 text-xs font-bold">✓</span>}
              </div>
              <span className="text-white/60 text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <button onClick={applyFilters} className="btn-gold w-full py-3 rounded-xl text-sm font-semibold">
          Appliquer les filtres
        </button>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn-ghost w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
            <X className="w-4 h-4" /> Réinitialiser
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden w-full btn-outline flex items-center justify-between px-4 py-3 rounded-xl mb-4"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="w-4 h-4" />
          Filtres{hasActiveFilters ? ' (actifs)' : ''}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Desktop */}
      <div className="hidden lg:block glass rounded-2xl p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gold-400" />
            Filtrer
          </h3>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Tout effacer
            </button>
          )}
        </div>
        <FiltersContent />
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="lg:hidden glass rounded-2xl p-5 mb-6">
          <FiltersContent />
        </div>
      )}
    </>
  )
}
