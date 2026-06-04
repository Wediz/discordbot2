import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Immo Vision 17 database...')

  // Seed sample properties
  const properties = [
    {
      slug: 'villa-piscine-royan-2024',
      title: 'Villa contemporaine avec piscine',
      description: 'Superbe villa contemporaine de 185 m² située dans un quartier calme de Royan, 10 min des plages.',
      type: 'VILLA' as const,
      status: 'AVAILABLE' as const,
      exclusive: true,
      featured: true,
      price: 895000,
      surface: 185,
      terrain: 650,
      rooms: 6,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2018,
      address: '15 allée des Pins',
      city: 'Royan',
      zipCode: '17200',
      department: '17',
      lat: 45.6198,
      lng: -1.0278,
      hasPool: true,
      hasGarage: true,
      hasGarden: true,
      hasTerrace: true,
      hasSeaView: false,
      heating: 'Pompe à chaleur + plancher chauffant',
      orientation: 'Sud-Ouest',
      dpeScore: 'B',
      gesScore: 'A',
      publishedAt: new Date(),
    },
    {
      slug: 'appartement-terrasse-rochefort',
      title: 'Appartement T4 grande terrasse',
      description: 'Bel appartement de 92 m² avec terrasse de 25 m² en plein centre de Rochefort.',
      type: 'APPARTEMENT' as const,
      status: 'AVAILABLE' as const,
      exclusive: false,
      featured: true,
      price: 320000,
      surface: 92,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2005,
      address: '8 rue Victor Hugo',
      city: 'Rochefort',
      zipCode: '17300',
      department: '17',
      lat: 45.9396,
      lng: -0.9601,
      hasPool: false,
      hasGarage: false,
      hasTerrace: true,
      hasBalcony: true,
      hasGarden: false,
      hasSeaView: false,
      dpeScore: 'D',
      gesScore: 'D',
      publishedAt: new Date(),
    },
  ]

  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: {},
      create: property,
    })
  }

  // Seed blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'marche-immobilier-royan-2024' },
    update: {},
    create: {
      slug: 'marche-immobilier-royan-2024',
      title: 'Le marché immobilier à Royan en 2024',
      excerpt: 'Analyse des prix au m² à Royan, tendances et perspectives pour 2024.',
      content: '# Marché immobilier Royan 2024\n\nRoyan est une destination prisée...',
      city: 'Royan',
      category: 'Marché',
      published: true,
      publishedAt: new Date(),
    },
  })

  console.log('✅ Seeding terminé !')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
