'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Camera, Radar, Globe, Video, Share2, BarChart3, Heart, Zap } from 'lucide-react'

const services = [
  {
    icon: Camera,
    title: 'Photos Professionnelles',
    description: 'Matériel reflex professionnel, éclairage HDR, retouche haut de gamme. Chaque pièce mise en valeur.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Radar,
    title: 'Drone 4K',
    description: 'Vues aériennes spectaculaires qui révèlent l\'environnement, le terrain et la localisation du bien.',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    icon: Globe,
    title: 'Visite Virtuelle 360°',
    description: 'Immersion complète dans le bien, accessible 24h/24 depuis n\'importe quel appareil.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Video,
    title: 'Vidéo Cinématique',
    description: 'Narration visuelle avec stabilisation, musique et montage professionnel de qualité cinéma.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Share2,
    title: 'Marketing Digital',
    description: 'Diffusion multi-canal sur Facebook, Instagram, TikTok, YouTube avec ciblage précis.',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: BarChart3,
    title: 'Tableau de Bord',
    description: 'Suivi temps réel : vues, contacts, visites planifiées. Transparence totale.',
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    icon: Heart,
    title: 'Accompagnement Humain',
    description: 'Un conseiller dédié, joignable 7j/7, présent à chaque étape de votre vente.',
    gradient: 'from-gold-500 to-gold-400',
  },
  {
    icon: Zap,
    title: 'Réactivité Maximale',
    description: 'Réponse dans l\'heure, mise en ligne sous 48h après signature du mandat.',
    gradient: 'from-yellow-500 to-amber-500',
  },
]

export function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" className="section-padding bg-dark-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-5"
          >
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">Nos Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-semibold text-white mb-4"
          >
            Une approche <span className="text-gold-gradient">média premium</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/45 text-lg max-w-2xl mx-auto"
          >
            Chaque bien bénéficie d’un traitement média complet, sans supplément.
            C’est notre promesse, c’est notre différence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="glass rounded-2xl p-6 group hover:border-gold-500/20 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-[15px] mb-2 leading-snug">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
