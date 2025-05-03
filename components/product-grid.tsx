"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/use-cart"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
          style={{ height: "fit-content" }}
        >
          <Link href={`/produit/${product.id}`} className="block relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full z-10"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite(product.id)
              }}
            >
              <Heart
                className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-pink-500 text-pink-500" : "text-gray-600"}`}
              />
            </Button>
            <Badge className="absolute top-2 left-2 bg-pink-500">{product.category}</Badge>
          </Link>

          <div className="p-4">
            <Link href={`/produit/${product.id}`} className="block">
              <h3 className="font-semibold text-lg mb-1 text-gray-800 hover:text-pink-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-pink-600 font-bold mb-3">{product.price}</p>
            </Link>
            <Button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center gap-2"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="h-4 w-4" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
