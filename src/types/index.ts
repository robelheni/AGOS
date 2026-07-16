export interface Service {
  id: string
  slug: string
  title: string
  category: string
  shortDescription: string
  fullDescription: string
  heroImage: string
  heroAlt: string
  options: ServiceOption[]
  applications: string[]
  materials: string[]
  process: string[]
  placeholderNote?: string
  faq: FAQ[]
  relatedServices: string[]
}

export interface ServiceOption {
  name: string
  description: string
}

export interface Project {
  id: string
  slug: string
  title: string
  clientLabel: string
  industry: string
  category: string
  description: string
  fullDescription: string
  heroImage: string
  heroAlt: string
  images: string[]
  servicesUsed: string[]
  productionDetails: string[]
  featured: boolean
}

export interface Industry {
  id: string
  slug: string
  name: string
  description: string
  image: string
  services: string[]
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}
