'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Phone } from 'lucide-react'

export function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section ref={ref} className="section-padding bg-dark-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative glass rounded-3xl overflow-hidden p-12 md:p-20 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/8 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
              <span className="text-gold-400 text-sm font-medium">Estimation gratuite · Sans engagement</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-semibold text-white max-w-3xl mx-auto leading-tight mb-6">
              Prêt à vendre votre bien{' '}
              <span className="text-gold-gradient">dans les meilleures conditions</span>&nbsp;?
            </h2>

            <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
              Obtenez une estimation précise et découvrez comment notre approche média
              premium peut valoriser votre bien.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/estimation"
                className="btn-gold flex items-center gap-2.5 px-10 py-4 rounded-full text-base font-semibold group"
              >
                Estimer mon bien gratuitement
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+33600000000"
                className="btn-outline flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold"
              >
                <Phone className="w-4 h-4" />
                Appeler maintenant
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
