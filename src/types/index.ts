export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  stock: number
  featured: boolean
  isNew: boolean
  isSale: boolean
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  stock: number
}

export interface CartItem {
  product: Product
  quantity: number
  variant?: ProductVariant
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

export interface Review {
  id: string
  productId: string
  author: string
  avatar: string
  rating: number
  comment: string
  date: string
  verified: boolean
}
