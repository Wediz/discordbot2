'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Calendar, MoreHorizontal, Plus, ChevronRight } from 'lucide-react'

const STAGES = [
  { id: 'PROSPECT', label: 'Prospect', color: '#6366f1', emoji: '📌' },
  { id: 'ESTIMATION', label: 'Estimation', color: '#8b5cf6', emoji: '📊' },
  { id: 'VISITE', label: 'Visite', color: '#ec4899', emoji: '👀' },
  { id: 'MANDAT', label: 'Mandat', color: '#f59e0b', emoji: '📝' },
  { id: 'COMMERCIALISATION', label: 'Commercialisation', color: '#10b981', emoji: '📢' },
  { id: 'COMPROMIS', label: 'Compromis', color: '#3b82f6', emoji: '⚖️' },
  { id: 'VENDU', label: 'Vendu', color: '#C9A84C', emoji: '🏆' },
]

const INITIAL_DEALS = [
  {
    id: 'd1', stage: 'PROSPECT', title: 'M. et Mme Dupont', address: '15 allée des Pins, Royan',
    price: 895000, phone: '06 12 34 56 78', date: '2024-06-02', priority: 'high', daysInStage: 2,
  },
  {
    id: 'd2', stage: 'ESTIMATION', title: 'Jean-Luc F.', address: '8 rue Victor Hugo, Rochefort',
    price: 285000, phone: '06 98 76 54 32', date: '2024-05-28', priority: 'medium', daysInStage: 7,
  },
  {
    id: 'd3', stage: 'MANDAT', title: 'Sophie Marchand', address: '3 impasse du Moulin, Saintes',
    price: 380000, phone: '07 11 22 33 44', date: '2024-05-20', priority: 'high', daysInStage: 14,
  },
  {
    id: 'd4', stage: 'COMMERCIALISATION', title: 'Pierre & Anna L.', address: '21 quai Dupeyrou, La Rochelle',
    price: 590000, phone: '06 55 44 33 22', date: '2024-05-15', priority: 'high', daysInStage: 19,
  },
  {
    id: 'd5', stage: 'VISITE', title: 'Catherine B.', address: '7 rue des Théàtres, Royan',
    price: 425000, phone: '06 77 88 99 00', date: '2024-05-29', priority: 'medium', daysInStage: 6,
  },
  {
    id: 'd6', stage: 'COMPROMIS', title: 'Marc & Julie P.', address: '44 avenue de l\'Océan, Saujon',
    price: 310000, phone: '07 00 11 22 33', date: '2024-05-10', priority: 'high', daysInStage: 24,
  },
  {
    id: 'd7', stage: 'VENDU', title: 'Richard N.', address: '12 allée des Roses, Rochefort',
    price: 195000, phone: '06 44 55 66 77', date: '2024-04-30', priority: 'low', daysInStage: 0,
  },
  {
    id: 'd8', stage: 'ESTIMATION', title: 'Hélène & Thomas V.', address: '9 rue du Port, Brouage',
    price: 245000, phone: '07 33 44 55 66', date: '2024-06-01', priority: 'low', daysInStage: 3,
  },
]

const PRIORITY_COLORS = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-green-500',
}

function formatPrice(p: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(p)
}

export function CRMPipeline() {
  const [deals, setDeals] = useState(INITIAL_DEALS)
  const [dragId, setDragId] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const onDragStart = (id: string) => setDragId(id)
  const onDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    setDragOver(stageId)
  }
  const onDrop = (stageId: string) => {
    if (!dragId) return
    setDeals((prev) => prev.map((d) => d.id === dragId ? { ...d, stage: stageId, daysInStage: 0 } : d))
    setDragId(null)
    setDragOver(null)
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: `${STAGES.length * 300}px` }}>
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.id)
          const stageValue = stageDeals.reduce((sum, d) => sum + d.price, 0)
          const isDragOver = dragOver === stage.id

          return (
            <div
              key={stage.id}
              className={`pipeline-column flex-1 min-w-[280px] flex flex-col transition-all duration-200 ${ isDragOver ? 'scale-[1.01]' : '' }`}
              onDragOver={(e) => onDragOver(e, stage.id)}
              onDrop={() => onDrop(stage.id)}
              onDragLeave={() => setDragOver(null)}
            >
              {/* Stage header */}
              <div className={`glass rounded-xl px-4 py-3 mb-3 border ${ isDragOver ? 'border-gold-500/40' : 'border-white/5' } transition-colors`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{stage.emoji}</span>
                    <span className="font-semibold text-white text-sm">{stage.label}</span>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: stage.color + '33', color: stage.color }}>
                      {stageDeals.length}
                    </span>
                  </div>
                  <button className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/40 hover:text-gold-400 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {stageDeals.length > 0 && (
                  <p className="text-white/30 text-xs mt-1">{formatPrice(stageValue)}</p>
                )}
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-2.5">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => onDragStart(deal.id)}
                    onClick={() => setExpanded(expanded === deal.id ? null : deal.id)}
                    className={`deal-card glass rounded-xl p-4 cursor-grab active:cursor-grabbing ${ dragId === deal.id ? 'opacity-50' : '' }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[deal.priority as keyof typeof PRIORITY_COLORS]}`} />
                        <p className="font-medium text-white text-sm">{deal.title}</p>
                      </div>
                      <button className="text-white/25 hover:text-white/60 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-white/35 text-xs mb-2 leading-snug">{deal.address}</p>
                    <p className="text-gold-400 font-semibold text-sm mb-3">{formatPrice(deal.price)}</p>

                    {expanded === deal.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/5 pt-3 mt-1 space-y-2"
                      >
                        <a href={`tel:${deal.phone}`} className="flex items-center gap-2 text-white/50 text-xs hover:text-gold-400 transition-colors">
                          <Phone className="w-3.5 h-3.5" /> {deal.phone}
                        </a>
                        <p className="flex items-center gap-2 text-white/40 text-xs">
                          <Calendar className="w-3.5 h-3.5" /> Depuis le {new Date(deal.date).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-white/30 text-xs">{deal.daysInStage > 0 ? `${deal.daysInStage}j dans cette étape` : 'Vente réalisée 🏆'}</p>
                        <div className="flex gap-2 pt-1">
                          <button className="btn-ghost flex-1 py-1.5 rounded-lg text-xs glass flex items-center justify-center gap-1">
                            <Phone className="w-3 h-3" /> Appeler
                          </button>
                          <button className="btn-ghost flex-1 py-1.5 rounded-lg text-xs glass flex items-center justify-center gap-1">
                            <Mail className="w-3 h-3" /> Email
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-white/20 text-xs">
                        {deal.daysInStage > 0 ? `${deal.daysInStage}j` : '✓'}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 text-white/20 transition-transform ${ expanded === deal.id ? 'rotate-90' : '' }`} />
                    </div>
                  </div>
                ))}

                {isDragOver && (
                  <div className="border-2 border-dashed border-gold-500/40 rounded-xl h-16 flex items-center justify-center">
                    <span className="text-gold-400/60 text-xs">Déposer ici</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
