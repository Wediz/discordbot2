'use client'

import { useState, useMemo } from 'react'

export function MortgageCalculator({ defaultPrice }: { defaultPrice: number }) {
  const [price, setPrice] = useState(defaultPrice)
  const [apport, setApport] = useState(Math.round(defaultPrice * 0.1))
  const [rate, setRate] = useState(3.7)
  const [years, setYears] = useState(20)

  const monthly = useMemo(() => {
    const principal = price - apport
    if (principal <= 0) return 0
    const r = rate / 100 / 12
    const n = years * 12
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  }, [price, apport, rate, years])

  const totalCost = monthly * years * 12
  const totalInterest = totalCost - (price - apport)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-white/45 text-xs font-medium uppercase tracking-wider block mb-2">Prix d\'achat (€)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="text-white/45 text-xs font-medium uppercase tracking-wider block mb-2">Apport (€)</label>
          <input
            type="number"
            value={apport}
            onChange={(e) => setApport(+e.target.value)}
            className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="text-white/45 text-xs font-medium uppercase tracking-wider block mb-2">Taux (%)</label>
          <input
            type="number"
            value={rate}
            step={0.05}
            onChange={(e) => setRate(+e.target.value)}
            className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="text-white/45 text-xs font-medium uppercase tracking-wider block mb-2">Durée (ans)</label>
          <select
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
          >
            {[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} ans</option>)}
          </select>
        </div>
      </div>

      <div className="glass-gold rounded-xl p-4 text-center">
        <p className="text-white/45 text-xs uppercase tracking-wider mb-1">Mensualité estimée</p>
        <p className="text-gold-400 font-bold text-3xl">
          {monthly > 0
            ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(monthly)
            : '—'}
          <span className="text-base font-normal text-gold-400/60">/mois</span>
        </p>
        <p className="text-white/30 text-xs mt-1">
          Coût total : {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(totalCost)}
          {' '}· Intérêts : {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(totalInterest)}
        </p>
      </div>

      <p className="text-white/20 text-xs text-center">
        Simulation non contractuelle. Taux indicatif, sous réserve d\'acceptation bancaire.
      </p>
    </div>
  )
}
