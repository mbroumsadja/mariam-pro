export interface Product {
  id: string
  name: string
  price: string
  category: "Cosmétiques" | "Vêtements" | "Ustensiles"
  image: string
  description: string
  longDescription?: string
  features?: string[]
  colors?: string[]
  sizes?: string[]
  inStock?: boolean
}

export interface CartItem extends Product {
  quantity: number
}
