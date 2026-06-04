'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const promises = [
  'Photos reflex professionnel + retouche HDR',
  'Drone 4K — vues aériennes et plan du terrain',
  'Visite virtuelle 360° interactive',
  'Vidéo cinématique immersive',
  'Plans interactifs du bien',
  'Publication sur tous les portails immo',
  'Diffusion sur réseaux sociaux',
  'Tableau de bord vendeur en temps réel',
]

export function PromiseSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
              <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">Notre Promesse</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              Chaque bien bénéficie d’un{' '}
              <span className="text-gold-gradient">traitement média premium</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Pas de supplément. Pas d’option payante. Pas de compromis.
              Votre bien reçoit le même traitement qu’une propriété de luxe,
              parce qu’il le mérite.
            </p>
            <Link
              href="/estimation"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold group"
            >
              Commencer maintenant
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8"
          >
            <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-6">Inclus dans chaque mandat</p>
            <div className="space-y-4">
              {promises.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-gold-400 text-sm font-semibold">
                + 0 € de supplément — Inclus dans notre commission standard.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
