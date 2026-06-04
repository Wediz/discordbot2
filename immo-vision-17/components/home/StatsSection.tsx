'use client'

import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { value: 98, suffix: '%', label: 'Taux de satisfaction client', desc: 'Vendeurs accompagnés' },
  { value: 45, suffix: 'j', label: 'Délai moyen de vente', desc: 'Contre 90j en agence traditionnelle' },
  { value: 100, suffix: '%', label: 'Média premium inclus', desc: 'Drone, 360°, vidéo — sans supplément' },
  { value: 3, suffix: 'x', label: 'Plus de visites qualifiées', desc: 'Grâce au marketing digital ciblé' },
]

export function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section ref={ref} className="py-16 bg-dark-800 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="stat-number">
                {inView ? (
                  <CountUp end={stat.value} duration={2} delay={i * 0.2} />
                ) : (
                  '0'
                )}
                <span className="text-gold-400">{stat.suffix}</span>
              </p>
              <p className="text-white font-semibold text-sm mt-2">{stat.label}</p>
              <p className="text-white/35 text-xs mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
