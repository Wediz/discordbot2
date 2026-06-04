'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/drone-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/20 via-transparent to-dark-900" />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'url(/images/grain.png)', backgroundSize: '200px' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex items-center gap-2.5 glass-gold rounded-full px-5 py-2.5 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
          <span className="text-gold-400 text-sm font-medium tracking-wide">
            Consultant Immobilier Premium · Charente-Maritime
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-semibold text-white leading-[1.04] tracking-tight mb-6"
        >
          Votre bien mérite{' '}
          <span className="text-gold-gradient">plus qu’une</span>
          <br className="hidden md:block" />
          <em className="not-italic"> simple annonce.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/55 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Photos professionnelles, drone, visite virtuelle 360°, vidéo immersive
          et stratégie digitale pour vendre dans les meilleures conditions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/estimation"
            className="btn-gold flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold group"
          >
            Estimer mon bien gratuitement
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/biens"
            className="btn-outline flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold"
          >
            <Play className="w-4 h-4 fill-gold-500 text-gold-500" />
            Voir nos biens
          </Link>
        </motion.div>

        {/* Media tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-12"
        >
          {['📸 Photos Pro', '🚁 Drone 4K', '🌐 Visite 360°', '🎬 Vidéo Cinéma', '📱 Digital'].map((tag) => (
            <span key={tag} className="glass px-4 py-2 rounded-full text-xs font-medium text-white/50">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-gold-500/50" />
        </motion.div>
      </motion.div>

      {/* Efficity badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-6 glass rounded-xl px-4 py-2.5 text-right"
      >
        <p className="text-white/30 text-xs leading-none mb-0.5">Partenaire officiel</p>
        <p className="text-white font-semibold text-sm leading-none">Efficity</p>
      </motion.div>
    </section>
  )
}
