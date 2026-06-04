import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number,
  options?: { currency?: string; locale?: string }
): string {
  return new Intl.NumberFormat(options?.locale ?? 'fr-FR', {
    style: 'currency',
    currency: options?.currency ?? 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatSurface(surface: number): string {
  return `${surface.toLocaleString('fr-FR')} m²`
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString('fr-FR', options ?? {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0) return 0
  const r = annualRate / 100 / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    MAISON: 'Maison',
    APPARTEMENT: 'Appartement',
    TERRAIN: 'Terrain',
    VILLA: 'Villa',
    IMMEUBLE: 'Immeuble',
    LOCAL: 'Local',
    PARKING: 'Parking',
    AUTRE: 'Autre',
  }
  return labels[type] ?? type
}

export function getDPEColor(score: string): string {
  const colors: Record<string, string> = {
    A: '#009966',
    B: '#55BB33',
    C: '#AACC00',
    D: '#FFCC00',
    E: '#FF9900',
    F: '#FF6600',
    G: '#CC0000',
  }
  return colors[score] ?? '#666666'
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
