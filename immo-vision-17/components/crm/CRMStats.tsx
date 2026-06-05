import { Users, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Dossiers actifs', value: '12', change: '+3 ce mois' },
  { icon: TrendingUp, label: 'En compromis', value: '3', change: 'CA estimé : 945 k€' },
  { icon: Clock, label: 'Délai moyen', value: '42j', change: '-8j vs mois préc.' },
  { icon: CheckCircle2, label: 'Ventes réalisées', value: '7', change: 'Sur 90 jours' },
]

export function CRMStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, label, value, change }) => (
        <div key={label} className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <Icon className="w-5 h-5 text-gold-400" />
            <span className="text-white/25 text-xs">{change}</span>
          </div>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-white/40 text-sm mt-1">{label}</p>
        </div>
      ))}
    </div>
  )
}
