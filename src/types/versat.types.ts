export interface VersatNavLink {
  label: string
  href: string
}

export interface VersatFeature {
  icon: string
  title: string
  description: string
}

export interface VersatTestimonial {
  name: string
  role: string
  company: string
  text: string
}

export interface VersatPlan {
  name: string
  price: string
  description: string
  features: string[]
  highlighted: boolean
}