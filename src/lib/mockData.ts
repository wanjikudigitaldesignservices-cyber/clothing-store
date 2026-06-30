export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  original_price?: number
  category: string
  gender: 'men' | 'women' | 'unisex'
  images: string[]
  colors: { name: string; hex: string }[]
  sizes: string[]
  badge?: string
  rating: number
  reviews: number
  in_stock: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Oxford Shirt',
    slug: 'classic-oxford-shirt',
    description: 'A timeless button-down oxford shirt crafted from premium cotton. Features a comfortable regular fit with a pointed collar. Perfect for both casual and semi-formal occasions.',
    price: 3500,
    original_price: 4500,
    category: 'shirts',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Navy', hex: '#1B1F3B' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Sale',
    rating: 4.7,
    reviews: 128,
    in_stock: true,
  },
  {
    id: '2',
    name: 'Slim Fit Chinos',
    slug: 'slim-fit-chinos',
    description: 'Modern slim-fit chinos made from stretch cotton twill. Comfortable enough for all-day wear with a sleek silhouette that pairs well with any top.',
    price: 4200,
    category: 'trousers',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Black', hex: '#000000' },
      { name: 'Olive', hex: '#556B2F' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.5,
    reviews: 89,
    in_stock: true,
  },
  {
    id: '3',
    name: 'Floral Wrap Dress',
    slug: 'floral-wrap-dress',
    description: 'A stunning floral wrap dress perfect for summer occasions. Features a flattering V-neckline, adjustable waist tie, and flowing midi-length skirt.',
    price: 5800,
    category: 'dresses',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'Floral Blue', hex: '#5B8FB9' },
      { name: 'Floral Pink', hex: '#E8A0BF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'New',
    rating: 4.9,
    reviews: 204,
    in_stock: true,
  },
  {
    id: '4',
    name: 'Oversized Denim Jacket',
    slug: 'oversized-denim-jacket',
    description: 'Classic oversized denim jacket with a modern twist. Washed for a vintage feel with brass button details and adjustable cuffs.',
    price: 6500,
    category: 'jackets',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'Light Wash', hex: '#87CEEB' },
      { name: 'Dark Wash', hex: '#1B3A5C' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Trending',
    rating: 4.8,
    reviews: 156,
    in_stock: true,
  },
  {
    id: '5',
    name: 'High-Waist Wide Leg Pants',
    slug: 'high-waist-wide-leg-pants',
    description: 'Elegant high-waisted wide-leg pants in a luxurious drape fabric. Features side pockets and a hidden zip closure for a clean front.',
    price: 4800,
    original_price: 6000,
    category: 'trousers',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Sale',
    rating: 4.6,
    reviews: 73,
    in_stock: true,
  },
  {
    id: '6',
    name: 'Premium Crew Neck T-Shirt',
    slug: 'premium-crew-neck-tshirt',
    description: 'Essential crew neck t-shirt made from 100% organic Supima cotton. Heavyweight 220gsm fabric with a relaxed fit.',
    price: 2200,
    category: 'tshirts',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Sage', hex: '#9DC183' },
      { name: 'Sand', hex: '#C2B280' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.4,
    reviews: 312,
    in_stock: true,
  },
  {
    id: '7',
    name: 'Tailored Blazer',
    slug: 'tailored-blazer',
    description: 'Impeccably tailored single-breasted blazer. Constructed from Italian wool blend with a half-canvas construction for a superior drape.',
    price: 12000,
    category: 'jackets',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Navy', hex: '#1B1F3B' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Premium',
    rating: 4.9,
    reviews: 67,
    in_stock: true,
  },
  {
    id: '8',
    name: 'Ribbed Knit Midi Skirt',
    slug: 'ribbed-knit-midi-skirt',
    description: 'A body-hugging ribbed knit skirt in a flattering midi length. Features an elasticated waistband and a subtle back slit for ease of movement.',
    price: 3200,
    category: 'skirts',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800&h=1000&fit=crop',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.3,
    reviews: 45,
    in_stock: true,
  },
]

export const CATEGORIES = [
  { name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop' },
  { name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=400&fit=crop' },
  { name: 'Trousers', slug: 'trousers', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=400&fit=crop' },
  { name: 'Jackets', slug: 'jackets', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=400&fit=crop' },
  { name: 'T-Shirts', slug: 'tshirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop' },
  { name: 'Skirts', slug: 'skirts', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=400&fit=crop' },
]

export function formatPrice(cents: number): string {
  return `KSh ${cents.toLocaleString()}`
}
