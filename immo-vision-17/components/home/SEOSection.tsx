import Link from 'next/link'

const SEO_DATA = [
  {
    city: 'Royan',
    slug: 'royan',
    desc: 'Consultant immobilier à Royan. Ventes de maisons, appartements et villas sur la côte sauvage.',
    priceRange: '2 800 – 5 200 €/m²',
  },
  {
    city: 'Rochefort',
    slug: 'rochefort',
    desc: 'Expert immobilier à Rochefort. Accompagnement personnalisé pour vendre ou acheter dans la ville cordiale.',
    priceRange: '1 600 – 3 200 €/m²',
  },
  {
    city: 'Saintes',
    slug: 'saintes',
    desc: 'Estimation et vente immobilière à Saintes. Expertise sur les quartiers historiques et pavillonnaires.',
    priceRange: '1 400 – 2 800 €/m²',
  },
  {
    city: 'La Rochelle',
    slug: 'la-rochelle',
    desc: 'Consultant immobilier à La Rochelle. Expertise centre-ville, Minimes et périphérie.',
    priceRange: '2 500 – 6 000 €/m²',
  },
  {
    city: 'Charente-Maritime',
    slug: 'charente-maritime',
    desc: 'Couverture complète du département 17. De La Rochelle à Royan, expertise locale garantie.',
    priceRange: '1 200 – 5 500 €/m²',
  },
]

export function SEOSection() {
  return (
    <section className="py-20 bg-dark-900 border-t border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl font-semibold text-white text-center mb-4">
          Votre consultant immobilier en{' '}
          <span className="text-gold-gradient">Charente-Maritime</span>
        </h2>
        <p className="text-white/40 text-center max-w-2xl mx-auto mb-12">
          Expertise locale et marketing premium sur l’ensemble du département 17.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SEO_DATA.map((item) => (
            <Link
              key={item.slug}
              href={`/immobilier-${item.slug}`}
              className="glass rounded-2xl p-5 group hover:border-gold-500/20 transition-all duration-200"
            >
              <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">
                Immobilier {item.city}
              </h3>
              <p className="text-white/35 text-xs leading-relaxed mb-3">{item.desc}</p>
              <p className="text-gold-500/60 text-xs font-medium">{item.priceRange}</p>
            </Link>
          ))}
        </div>

        {/* Rich content for SEO */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-white mb-4">
            Pourquoi choisir Immo Vision 17 pour vendre votre bien ?
          </h2>
          <div className="text-white/40 text-sm leading-relaxed space-y-4">
            <p>
              Immo Vision 17 est un consultant immobilier indépendant opérant en Charente-Maritime (département 17),
              partenaire du réseau national <strong className="text-white/60">Efficity</strong>. Notre approche se
              distingue radicalement des agences immobilières traditionnelles : chaque bien confié bénéficie d’un
              traitement média premium complet — photos professionnelles reflex, vidéo et drone 4K, visite virtuelle
              360°, plans interactifs — sans supplément.
            </p>
            <p>
              Nous intervenons sur l’ensemble du département : <strong className="text-white/60">immobilier Royan</strong>,
              {' '}<strong className="text-white/60">immobilier Rochefort</strong>,
              {' '}<strong className="text-white/60">immobilier Saintes</strong>,
              {' '}<strong className="text-white/60">immobilier La Rochelle</strong> et les communes alentours.
            </p>
            <p>
              Notre stratégie de <strong className="text-white/60">marketing digital</strong> assure une visibilité
              maximale : diffusion sur tous les portails immobiliers (SeLoger, Leboncoin, PAP, Logic-Immo),
              publication sur les réseaux sociaux (Facebook, Instagram, TikTok, YouTube) et campagnes publicitaires
              ciblées. Nos clients vendent en moyenne en <strong className="text-white/60">45 jours</strong>, contre
              90 jours pour une agence traditionnelle.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
