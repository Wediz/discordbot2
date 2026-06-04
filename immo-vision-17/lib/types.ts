export type PropertyType =
  | 'MAISON'
  | 'APPARTEMENT'
  | 'TERRAIN'
  | 'VILLA'
  | 'IMMEUBLE'
  | 'LOCAL'
  | 'PARKING'
  | 'AUTRE'

export type PropertyStatus = 'AVAILABLE' | 'UNDER_OFFER' | 'SOLD' | 'WITHDRAWN'

export type PropertyCondition = 'NEUF' | 'BON_ETAT' | 'A_RAFRAICHIR' | 'A_RENOVER'

export type SaleProject =
  | 'URGENT'
  | 'DANS_3_MOIS'
  | 'DANS_6_MOIS'
  | 'PLUS_DE_6_MOIS'
  | 'REFLEXION'

export type CRMStage =
  | 'PROSPECT'
  | 'ESTIMATION'
  | 'VISITE'
  | 'MANDAT'
  | 'COMMERCIALISATION'
  | 'COMPROMIS'
  | 'VENDU'

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'ARCHIVED'

export interface PropertyImage {
  id: string
  url: string
  alt?: string
  order: number
  isPrimary: boolean
}

export interface Property {
  id: string
  slug: string
  title: string
  description: string
  type: PropertyType
  status: PropertyStatus
  exclusive: boolean
  featured: boolean
  price: number
  priceReduced?: number
  surface: number
  terrain?: number
  rooms: number
  bedrooms: number
  bathrooms: number
  floor?: number
  yearBuilt?: number
  address: string
  city: string
  zipCode: string
  department: string
  lat?: number
  lng?: number
  hasPool: boolean
  hasGarage: boolean
  hasTerrace: boolean
  hasBalcony: boolean
  hasGarden: boolean
  hasSeaView: boolean
  heating?: string
  orientation?: string
  dpeScore?: string
  gesScore?: string
  annualEnergy?: number
  images: PropertyImage[]
  videoUrl?: string
  virtualTourUrl?: string
  droneVideoUrl?: string
  floorPlanUrl?: string
  viewCount: number
  contactCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface EstimationLead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  surface: number
  type: PropertyType
  rooms: number
  condition: PropertyCondition
  project: SaleProject
  estimatedPrice?: number
  status: LeadStatus
  createdAt: string
}

export interface CRMDeal {
  id: string
  title: string
  stage: CRMStage
  value?: number
  probability: number
  notes?: string
  nextAction?: string
  nextActionDate?: string
  lead?: EstimationLead
  property?: Property
  activities: CRMActivity[]
  createdAt: string
  updatedAt: string
}

export interface CRMActivity {
  id: string
  dealId: string
  type: 'CALL' | 'EMAIL' | 'VISIT' | 'MEETING' | 'NOTE' | 'DOCUMENT' | 'TASK'
  title: string
  notes?: string
  date: string
}

export interface PropertyFilters {
  city?: string
  type?: PropertyType
  minPrice?: number
  maxPrice?: number
  minSurface?: number
  maxSurface?: number
  rooms?: number
  bedrooms?: number
  hasPool?: boolean
  hasSeaView?: boolean
  hasGarden?: boolean
  hasGarage?: boolean
  dpeScore?: string[]
  page?: number
  limit?: number
  sortBy?: 'price_asc' | 'price_desc' | 'surface_desc' | 'recent'
}

export interface APIResponse<T> {
  success: boolean
  data: T
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  error?: string
}
