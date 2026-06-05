'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie & Pierre D.',
    city: 'Royan',
    text: 'Nous avons vendu notre maison en 18 jours grâce au travail exceptionnel : photos splendides, vidéo professionnelle, visite virtuelle... Le bien était mis en valeur comme jamais.',
    rating: 5,
    price: '425 000 €',
    days: 18,
    type: 'Maison 5 pièces',
  },
  {
    name: 'Jean-Luc F.',
    city: 'Rochefort',
    text: 'Impressionné par la réactivité et le professionnalisme. Le drone a complètement transformé la perception de mon bien. Les acheteurs étaient déjà convaincus avant la visite physique.',
    rating: 5,
    price: '285 000 €',
    days: 24,
    type: 'Appartement T4',
  },
  {
    name: 'Sophie & Marc L.',
    city: 'Saintes',
    text: 'Le tableau de bord vendeur en temps réel est une révolution. On voyait exactement qui visitait notre annonce et quand. La transparence est totale, et le prix obtenu a dépassé nos espérances.',
    rating: 5,
    price: '380 000 €',
    days: 31,
    type: 'Villa avec jardin',
  },
  {
    name: 'Catherine B.',
    city: 'La Rochelle',
    text: 'Ancien agent immobilier, je savais exactement ce que je cherchais. Immo Vision 17 dépasse largement les standards du secteur. Photos, vidéo, accompagnement humain : tout est parfait.',
    rating: 5,
    price: '590 000 €',
    days: 42,
    type: 'Maison 7 pièces',
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [auto])

  const prev = () => { setAuto(false); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length) }
  const next = () => { setAuto(false); setCurrent((c) => (c + 1) % testimonials.length) }

  const t = testimonials[current]

  return (
    <section className="section-padding bg-dark-900 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold-500/4 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-5">
            <span className="text-gold-400 text-sm font-medium uppercase tracking-widest">Témoignages</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            Ils nous ont fait{' '}
            <span className="text-gold-gradient">confiance</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative glass rounded-3xl p-8 md:p-12">
            <Quote className="absolute top-8 left-8 w-10 h-10 text-gold-500/15" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-1.5 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 font-light">
                  « {t.text} »
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-white/40 text-sm">{t.city} · {t.type}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-gold-400 font-bold text-lg">{t.price}</p>
                      <p className="text-white/30 text-xs">Prix de vente</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gold-400 font-bold text-lg">{t.days}j</p>
                      <p className="text-white/30 text-xs">Délai de vente</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/30 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAuto(false); setCurrent(i) }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-2 bg-gold-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/30 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
