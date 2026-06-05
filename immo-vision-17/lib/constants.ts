export const SITE_NAME = 'Immo Vision 17'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://immovision17.fr'
export const AGENT_PHONE = process.env.NEXT_PUBLIC_AGENT_PHONE ?? '+33600000000'
export const AGENT_EMAIL = process.env.NEXT_PUBLIC_AGENT_EMAIL ?? 'contact@immovision17.fr'

export const DEPARTMENT = '17'
export const DEPARTMENT_NAME = 'Charente-Maritime'

export const SEO_CITIES = [
  { name: 'Royan', slug: 'royan', lat: 45.6198, lng: -1.0278 },
  { name: 'Rochefort', slug: 'rochefort', lat: 45.9396, lng: -0.9601 },
  { name: 'Saintes', slug: 'saintes', lat: 45.7455, lng: -0.6329 },
  { name: 'La Rochelle', slug: 'la-rochelle', lat: 46.1591, lng: -1.1520 },
  { name: 'Saint-Georges-de-Didonne', slug: 'saint-georges-de-didonne', lat: 45.5942, lng: -0.9969 },
  { name: 'Saujon', slug: 'saujon', lat: 45.6764, lng: -0.9311 },
  { name: 'Brouage', slug: 'brouage', lat: 45.8620, lng: -1.0637 },
  { name: 'Pont-l\'Abbé-d\'Arnoult', slug: 'pont-labbe-darnoult', lat: 45.5786, lng: -0.8764 },
]

export const PROPERTY_TYPES = [
  { value: 'MAISON', label: 'Maison', emoji: '🏠' },
  { value: 'APPARTEMENT', label: 'Appartement', emoji: '🏢' },
  { value: 'TERRAIN', label: 'Terrain', emoji: '🌿' },
  { value: 'VILLA', label: 'Villa', emoji: '🏡' },
  { value: 'IMMEUBLE', label: 'Immeuble', emoji: '🏗️' },
  { value: 'AUTRE', label: 'Autre', emoji: '🏗️' },
] as const

export const CRM_STAGES = [
  { id: 'PROSPECT', label: 'Prospect', color: '#6366f1', emoji: '📌', probability: 10 },
  { id: 'ESTIMATION', label: 'Estimation', color: '#8b5cf6', emoji: '📊', probability: 25 },
  { id: 'VISITE', label: 'Visite', color: '#ec4899', emoji: '👀', probability: 40 },
  { id: 'MANDAT', label: 'Mandat', color: '#f59e0b', emoji: '📝', probability: 60 },
  { id: 'COMMERCIALISATION', label: 'Commercialisation', color: '#10b981', emoji: '📢', probability: 75 },
  { id: 'COMPROMIS', label: 'Compromis', color: '#3b82f6', emoji: '⚖️', probability: 90 },
  { id: 'VENDU', label: 'Vendu', color: '#C9A84C', emoji: '🏆', probability: 100 },
] as const

export const DPE_SCORES = [
  { score: 'A', color: '#009966', label: 'Très performant' },
  { score: 'B', color: '#55BB33', label: 'Performant' },
  { score: 'C', color: '#AACC00', label: 'Assez performant' },
  { score: 'D', color: '#FFCC00', label: 'Peu performant' },
  { score: 'E', color: '#FF9900', label: 'Médiocre' },
  { score: 'F', color: '#FF6600', label: 'Mauvais' },
  { score: 'G', color: '#CC0000', label: 'Très mauvais' },
] as const

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/immovision17',
  instagram: 'https://instagram.com/immovision17',
  youtube: 'https://youtube.com/@immovision17',
  tiktok: 'https://tiktok.com/@immovision17',
  linkedin: 'https://linkedin.com/in/immovision17',
} as const

export const PREMIUM_SERVICES = [
  { id: 'photos', label: 'Photos professionnelles', emoji: '📸' },
  { id: 'drone', label: 'Drone 4K', emoji: '🚁' },
  { id: 'vr', label: 'Visite virtuelle 360°', emoji: '🌐' },
  { id: 'video', label: 'Vidéo cinématique', emoji: '🎬' },
  { id: 'plan', label: 'Plans interactifs', emoji: '🗺️' },
  { id: 'social', label: 'Réseaux sociaux', emoji: '📱' },
] as const
