import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog Immobilier — Conseils & Actualités Charente-Maritime',
  description:
    'Conseils immobiliers, tendances du marché et actualités en Charente-Maritime. Royan, Saintes, Rochefort, La Rochelle.',
}

const SEO_CITIES = [
  { city: 'Royan', slug: 'immobilier-royan', pop: '18 000 hab.' },
  { city: 'Rochefort', slug: 'immobilier-rochefort', pop: '25 000 hab.' },
  { city: 'Saintes', slug: 'immobilier-saintes', pop: '26 000 hab.' },
  { city: 'La Rochelle', slug: 'immobilier-la-rochelle', pop: '79 000 hab.' },
  { city: 'Charente-Maritime', slug: 'immobilier-charente-maritime', pop: 'Département 17' },
]

const ARTICLES = [
  {
    slug: 'estimer-maison-charente-maritime',
    title: 'Comment estimer sa maison en Charente-Maritime en 2024 ?',
    excerpt: 'Guide complet pour évaluer la valeur de votre bien immobilier dans le département 17.',
    city: 'Charente-Maritime',
    category: 'Guide',
    readTime: '7 min',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
  {
    slug: 'marche-immobilier-royan-2024',
    title: 'Le marché immobilier à Royan en 2024 : tendances et prix',
    excerpt: 'Analyse détaillée des prix au m² à Royan, des tendances et des perspectives pour 2024.',
    city: 'Royan',
    category: 'Marché',
    readTime: '5 min',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    slug: 'vendre-maison-drone-photos-professionnelles',
    title: 'Pourquoi les photos pro et le drone accélèrent la vente de votre bien ?',
    excerpt: 'Des statistiques montrent que les biens photographiés professionnellement se vendent 32% plus vite.',
    city: null,
    category: 'Conseil',
    readTime: '6 min',
    date: '2024-04-28',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    slug: 'visite-virtuelle-immobilier-avantages',
    title: 'La visite virtuelle 360° : l\'outil qui transforme la vente immobilière',
    excerpt: 'Découvrez comment les visites virtuelles réduisent le nombre de visites physiques inutiles de 60%.',
    city: null,
    category: 'Innovation',
    readTime: '4 min',
    date: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    slug: 'mandat-exclusif-avantages',
    title: 'Mandat exclusif vs mandat simple : que choisir pour vendre vite ?',
    excerpt: 'Comprendre les différences et choisir la meilleure stratégie de vente pour votre bien.',
    city: null,
    category: 'Guide',
    readTime: '8 min',
    date: '2024-04-05',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    slug: 'investissement-immobilier-rochefort',
    title: 'Investir à Rochefort : les quartiers à fort potentiel',
    excerpt: 'Guide investisseur pour le marché rochefortais : rendements, quartiers prisés et opportunités.',
    city: 'Rochefort',
    category: 'Investissement',
    readTime: '6 min',
    date: '2024-03-22',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 bg-dark-900" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Blog & Conseils</span>
          </div>
          <h1 className="font-display text-5xl font-semibold text-white mb-4">
            L\'immobilier <span className="text-gold-gradient">décrypté</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Conseils d\'expert, tendances du marché et actualités immobilières en Charente-Maritime.
          </p>
        </div>

        {/* SEO City links */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {SEO_CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/${c.slug}`}
              className="glass px-4 py-2 rounded-full text-sm text-white/60 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200"
            >
              Immobilier {c.city}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
              <article className="glass rounded-2xl overflow-hidden property-card h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge-premium px-3 py-1 rounded-full text-xs">{article.category}</span>
                    {article.city && (
                      <span className="glass px-3 py-1 rounded-full text-xs text-white/60">{article.city}</span>
                    )}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-white/30 text-xs mb-3">
                    <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{article.readTime} de lecture</span>
                  </div>
                  <h2 className="font-semibold text-white text-lg leading-snug mb-2 group-hover:text-gold-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                  <div className="flex items-center gap-1 text-gold-500 text-sm font-medium mt-4">
                    Lire l\'article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
