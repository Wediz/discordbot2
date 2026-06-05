'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Eye, Phone, Calendar, TrendingUp, Users, Star,
  MapPin, Share2, ChevronUp, ChevronDown, Bell, FileText
} from 'lucide-react'

const WEEKLY_VIEWS = [42, 58, 71, 49, 83, 95, 112]
const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const CONTACT_HISTORY = [
  { type: 'call', name: 'M. Laurent B.', date: '2024-06-03 14h30', note: 'Très intéressé, demande visite samedi' },
  { type: 'form', name: 'Mme Sophie M.', date: '2024-06-02 09h15', note: 'Demande de dossier complet envoyée' },
  { type: 'visit', name: 'Famille Durand', date: '2024-06-01 11h00', note: 'Visite effectuée — retour positif' },
  { type: 'call', name: 'Pierre & Alice V.', date: '2024-05-31 16h45', note: 'Questions sur le diagnostic énergétique' },
]

const VISITS_PLANNED = [
  { name: 'Famille Martin', date: 'Sam 08 juin 2024', time: '10h00', status: 'confirmed' },
  { name: 'M. Leblanc', date: 'Sam 08 juin 2024', time: '14h30', status: 'pending' },
  { name: 'Mme Garnier', date: 'Dim 09 juin 2024', time: '11h00', status: 'confirmed' },
]

const STATS = [
  { icon: Eye, label: 'Vues totales', value: '1 284', delta: '+12%', positive: true },
  { icon: Phone, label: 'Contacts reçus', value: '23', delta: '+5', positive: true },
  { icon: Calendar, label: 'Visites planifiées', value: '3', delta: 'Cette semaine', positive: true },
  { icon: Star, label: 'Note portails', value: '4.8/5', delta: 'Excellent', positive: true },
]

export function VendeurDashboard() {
  const [period, setPeriod] = useState<'week' | 'month'>('week')
  const maxViews = Math.max(...WEEKLY_VIEWS)

  return (
    <div className="space-y-6">
      {/* Property card */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-52 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80"
              alt="Votre bien"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 badge-premium px-2.5 py-1 rounded-full text-xs">Exclusivité</span>
          </div>
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h2 className="font-semibold text-white text-xl mb-1">Villa contemporaine avec piscine</h2>
              <p className="text-white/40 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> 15 allée des Pins, Royan
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-gold-400 font-bold text-2xl">895 000 €</p>
              <div className="flex gap-2">
                <button className="glass px-3 py-2 rounded-xl text-xs text-white/60 flex items-center gap-1.5 hover:text-white transition-colors">
                  <Share2 className="w-3.5 h-3.5" /> Partager
                </button>
                <button className="glass px-3 py-2 rounded-xl text-xs text-white/60 flex items-center gap-1.5 hover:text-white transition-colors">
                  <FileText className="w-3.5 h-3.5" /> Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, label, value, delta, positive }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className="w-5 h-5 text-gold-400" />
              <div className={`flex items-center gap-0.5 text-xs ${ positive ? 'text-emerald-400' : 'text-red-400' }`}>
                {positive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {delta}
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-white/35 text-sm mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Views chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Vues de l\'annonce</h3>
            <div className="flex gap-1.5">
              {(['week', 'month'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    period === p ? 'bg-gold-500/15 text-gold-400' : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {p === 'week' ? '7j' : '30j'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {WEEKLY_VIEWS.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-white/30 text-xs">{v}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxViews) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                  className="w-full rounded-t-md chart-bar"
                  style={{ background: `linear-gradient(to top, #C9A84C, #E4C570)`, minHeight: 4 }}
                />
                <span className="text-white/25 text-xs">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visits planned */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white">Visites planifiées</h3>
            <span className="badge-premium px-2.5 py-1 rounded-full text-xs">{VISITS_PLANNED.length}</span>
          </div>
          <div className="space-y-3">
            {VISITS_PLANNED.map((v, i) => (
              <div key={i} className={`p-3 rounded-xl border ${ v.status === 'confirmed' ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-white/8' }`}>
                <p className="font-medium text-white text-sm">{v.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{v.date} · {v.time}</p>
                <span className={`text-xs font-medium mt-1 inline-block ${ v.status === 'confirmed' ? 'text-emerald-400' : 'text-amber-400' }`}>
                  {v.status === 'confirmed' ? '✓ Confirmée' : '⧗ En attente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact history */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Historique des contacts</h3>
          <button className="text-white/30 hover:text-gold-400 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {CONTACT_HISTORY.map((c, i) => (
            <div key={i} className="flex items-start gap-4 py-3 border-b border-white/5 last:border-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                c.type === 'call' ? 'bg-blue-500/15 text-blue-400' :
                c.type === 'visit' ? 'bg-emerald-500/15 text-emerald-400' :
                'bg-gold-500/15 text-gold-400'
              }`}>
                {c.type === 'call' && <Phone className="w-4 h-4" />}
                {c.type === 'visit' && <Eye className="w-4 h-4" />}
                {c.type === 'form' && <FileText className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{c.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{c.note}</p>
              </div>
              <p className="text-white/25 text-xs flex-shrink-0">{c.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing performance */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-5">Performance marketing</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { platform: 'SeLoger', views: 542, icon: '🏠' },
            { platform: 'Leboncoin', views: 389, icon: '🏷️' },
            { platform: 'Facebook', views: 224, icon: '📱' },
            { platform: 'Instagram', views: 129, icon: '📸' },
          ].map(({ platform, views, icon }) => (
            <div key={platform} className="text-center p-4 glass rounded-xl">
              <span className="text-2xl">{icon}</span>
              <p className="text-white font-semibold mt-2">{views}</p>
              <p className="text-white/35 text-xs">{platform}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
