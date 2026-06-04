import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SEO_CITIES } from '@/lib/constants'
import { MapPin, TrendingUp, Home, ArrowRight } from 'lucide-react'

const CITY_DATA: Record<string, {
  description: string
  longDesc: string
  priceMin: number
  priceMax: number
  priceAvg: number
  stats: { label: string; value: string }[]
}> = {
  royan: {
    description: 'Consultant immobilier à Royan. Expert en vente de maisons, villas et appartements sur la Côte Sauvage.',
    longDesc: `Royan est une ville balnéaire de Charente-Maritime réputée pour ses plages, son architecture Art Déco et son marché immobilier dynamique. Immo Vision 17 vous accompagne pour vendre ou acheter votre bien à Royan avec une approche média premium : photos professionnelles, drone 4K, visite virtuelle 360° et vidéo cinématique. Le prix moyen au mé varie entre 3 500 et 4 500 € selon le quartier et la proximité des plages.`,
    priceMin: 2800,
    priceMax: 5200,
    priceAvg: 3900,
    stats: [
      { label: 'Prix moyen au m²', value: '3 900 €' },
      { label: 'Délai moyen de vente', value: '52 jours' },
      { label: 'Population', value: '18 000 hab.' },
      { label: 'Département', value: 'Charente-Maritime (17)' },
    ],
  },
  rochefort: {
    description: 'Expert immobilier à Rochefort. La ville cordiale vous attend avec un marché abordable et dynamique.',
    longDesc: `Rochefort, surnommée "La Ville Cordiale", est un marché immobilier attractif avec des prix accessibles et une qualité de vie reconnue. Immo Vision 17 intervient sur l'ensemble de la commune et les alentours pour la vente et l'estimation de maisons et appartements.`,
    priceMin: 1600,
    priceMax: 3200,
    priceAvg: 2100,
    stats: [
      { label: 'Prix moyen au m²', value: '2 100 €' },
      { label: 'Délai moyen de vente', value: '61 jours' },
      { label: 'Population', value: '25 000 hab.' },
      { label: 'Département', value: 'Charente-Maritime (17)' },
    ],
  },
  saintes: {
    description: 'Consultant immobilier à Saintes. Expertise sur les quartiers historiques et pavillonnaires.',
    longDesc: `Saintes, riche de son patrimoine gallo-romain, offre un marché immobilier varié. Des maisons de ville au centre historique aux pavillons en périphérie, Immo Vision 17 vous accompagne avec une stratégie de vente premium adaptée à votre bien.`,
    priceMin: 1400,
    priceMax: 2800,
    priceAvg: 1900,
    stats: [
      { label: 'Prix moyen au m²', value: '1 900 €' },
      { label: 'Délai moyen de vente', value: '71 jours' },
      { label: 'Population', value: '26 000 hab.' },
      { label: 'Département', value: 'Charente-Maritime (17)' },
    ],
  },
  'la-rochelle': {
    description: 'Consultant immobilier à La Rochelle. Expertise centre-ville, Minimes et périphérie rochellaise.',
    longDesc: `La Rochelle est l'une des villes les plus prisées de la côte atlantique. Son marché immobilier est tendu, en particulier dans les quartiers du Vieux Port, des Minimes et de La Genette. Immo Vision 17 vous offre une visibilité maximale grâce à un marketing digital performant.`,
    priceMin: 2500,
    priceMax: 6000,
    priceAvg: 3800,
    stats: [
      { label: 'Prix moyen au m²', value: '3 800 €' },
      { label: 'Délai moyen de vente', value: '43 jours' },
      { label: 'Population', value: '79 000 hab.' },
      { label: 'Département', value: 'Charente-Maritime (17)' },
    ],
  },
  'charente-maritime': {
    description: 'Consultant immobilier en Charente-Maritime. Couverture complète du département 17.',
    longDesc: `La Charente-Maritime (département 17) est l'un des départements les plus attractifs de France grâce à son littoral, son ensoleillement et sa qualité de vie. Immo Vision 17 couvre l'intégralité du département, de La Rochelle à Royan, en passant par Saintes, Rochefort et toutes les communes littorales et rurales.`,
    priceMin: 1200,
    priceMax: 5500,
    priceAvg: 2400,
    stats: [
      { label: 'Prix moyen au m²', value: '2 400 €' },
      { label: 'Délai moyen de vente', value: '55 jours' },
      { label: 'Population', value: '650 000 hab.' },
      { label: 'Département', value: '17' },
    ],
  },
}

export async function generateStaticParams() {
  return SEO_CITIES.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const data = CITY_DATA[params.city]
  if (!data) return {}
  const cityName = SEO_CITIES.find((c) => c.slug === params.city)?.name ?? params.city
  return {
    title: `Immobilier ${cityName} — Estimation & Vente | Immo Vision 17`,
    description: data.description,
    alternates: { canonical: `https://immovision17.fr/immobilier-${params.city}` },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const data = CITY_DATA[params.city]
  if (!data) notFound()

  const cityName = SEO_CITIES.find((c) => c.slug === params.city)?.name ?? params.city

  return (
    <div className="min-h-screen pt-24 pb-20 bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Immobilier {cityName}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Immobilier {cityName} — Consultant{' '}
            <span className="text-gold-gradient">Premium</span>
          </h1>

          <p className="text-white/55 text-lg leading-relaxed mb-10">{data.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {data.stats.map(({ label, value }) => (
              <div key={label} className="glass rounded-2xl p-4 text-center">
                <p className="text-gold-400 font-bold text-xl">{value}</p>
                <p className="text-white/40 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Long description */}
          <div className="glass rounded-2xl p-8 mb-10">
            <h2 className="font-display text-2xl font-semibold text-white mb-4">
              Le marché immobilier à {cityName}
            </h2>
            <p className="text-white/55 leading-relaxed">{data.longDesc}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/estimation" className="btn-gold flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold">
              Estimer mon bien à {cityName} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/biens" className="btn-outline flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold">
              <Home className="w-4 h-4" /> Voir les biens à {cityName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
