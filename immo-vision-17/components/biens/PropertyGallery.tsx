'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from 'lucide-react'

interface Image { id: string; url: string; alt?: string }

export function PropertyGallery({ images }: { images: Image[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)

  const open = (i: number) => { setLightbox(i); setCurrent(i) }
  const close = () => setLightbox(null)
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <>
      {/* Gallery Grid */}
      <div className="relative">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[60vh] max-h-[600px]">
          {/* Main image */}
          <div
            className="col-span-2 row-span-2 relative overflow-hidden cursor-zoom-in"
            onClick={() => open(0)}
          >
            <img src={images[0]?.url} alt={images[0]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-dark-900/0 hover:bg-dark-900/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Side images */}
          {images.slice(1, 5).map((img, i) => (
            <div
              key={img.id}
              className="relative overflow-hidden cursor-zoom-in"
              onClick={() => open(i + 1)}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              {i === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">+{images.length - 5} photos</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions overlay */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="glass px-4 py-2 rounded-xl text-sm text-white/70 flex items-center gap-2 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" /> Partager
          </button>
          <button
            onClick={() => open(0)}
            className="btn-gold px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <ZoomIn className="w-4 h-4" /> Voir toutes les photos
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-900/98 flex items-center justify-center"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]?.url}
                alt={images[current]?.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                  className={`transition-all rounded-full ${ i === current ? 'w-6 h-2 bg-gold-500' : 'w-2 h-2 bg-white/30' }`}
                />
              ))}
            </div>

            <div className="absolute bottom-6 right-6 text-white/40 text-sm">
              {current + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
