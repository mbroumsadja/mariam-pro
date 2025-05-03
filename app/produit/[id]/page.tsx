"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ShoppingCart, Heart, ArrowLeft, Star, Share2, Truck, Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/products"
import { useCart } from "@/lib/use-cart"
import ProductGrid from "@/components/product-grid"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("Rose")
  const [isFavorite, setIsFavorite] = useState(false)
  const [similarProducts, setSimilarProducts] = useState([])

  // Trouver le produit correspondant à l'ID
  const product = products.find((p) => p.id === params.id)

  // Rediriger vers la page d'accueil si le produit n'existe pas
  useEffect(() => {
    if (!product) {
      router.push("/")
    }
  }, [product, router])

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites && product) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.includes(product.id))
    }
  }, [product])

  // Trouver des produits similaires (même catégorie)
  useEffect(() => {
    if (product) {
      const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
      setSimilarProducts(similar)
    }
  }, [product])

  // Gérer l'ajout/suppression des favoris
  const toggleFavorite = () => {
    if (!product) return

    const storedFavorites = localStorage.getItem("favorites")
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isFavorite) {
      favorites = favorites.filter((id) => id !== product.id)
    } else {
      favorites.push(product.id)
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  // Gérer l'ajout au panier
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
    }
  }

  if (!product) {
    return null // Ou un composant de chargement
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center text-gray-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>

      {/* Section principale du produit */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <Badge className="absolute top-4 left-4 bg-pink-500">{product.category}</Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-md border cursor-pointer">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} vue ${i + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(12 avis)</span>
              </div>
            </div>

            <div className="text-2xl font-bold text-pink-600">{product.price}</div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600 mt-2">
                  {product.longDescription ||
                    "Ce produit de haute qualité est conçu pour répondre à vos besoins quotidiens. Fabriqué avec des matériaux premium, il offre durabilité et élégance pour une expérience utilisateur optimale."}
                </p>
              </div>

              {/* Sélection de couleur */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Couleur: {selectedColor}</h3>
                <div className="flex space-x-2">
                  {["Rose", "Noir", "Blanc", "Bleu"].map((color) => {
                    const colorClass = {
                      Rose: "bg-pink-400",
                      Noir: "bg-gray-900",
                      Blanc: "bg-white border",
                      Bleu: "bg-blue-500",
                    }[color]

                    return (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full ${colorClass} ${selectedColor === color ? "ring-2 ring-offset-2 ring-pink-500" : ""}`}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Couleur ${color}`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Quantité */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quantité</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={`flex-1 ${isFavorite ? "bg-pink-50 text-pink-600 border-pink-200" : "border-gray-200"}`}
                  onClick={toggleFavorite}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-600"}`} />
                  {isFavorite ? "Retiré des favoris" : "Ajouter aux favoris"}
                </Button>
              </div>

              {/* Partager */}
              <Button
                variant="ghost"
                className="text-gray-600 pl-0"
                onClick={() => navigator.share({ url: window.location.href, title: product.name })}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Partager ce produit
              </Button>

              {/* Avantages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-pink-500 mr-2" />
                  <span className="text-sm text-gray-600">Livraison rapide</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-pink-500 mr-2" />
                  <span className="text-sm text-gray-600">Garantie qualité</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 text-pink-500 mr-2" />
                  <span className="text-sm text-gray-600">Retours sous 30j</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets d'informations supplémentaires */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent mb-6">
            <TabsTrigger
              value="details"
              className="data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none"
            >
              Détails du produit
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none"
            >
              Spécifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none"
            >
              Avis clients
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-0">
            <div className="prose max-w-none">
              <p>
                {product.longDescription ||
                  `Le ${product.name} est un produit de qualité supérieure conçu pour répondre à vos besoins quotidiens. Fabriqué avec des matériaux soigneusement sélectionnés, il allie fonctionnalité et esthétique pour une expérience utilisateur optimale.`}
              </p>
              <p>
                Nos produits sont fabriqués selon les normes les plus strictes pour garantir leur durabilité et leur
                performance. Chaque article est soumis à des contrôles de qualité rigoureux avant d'être proposé à la
                vente.
              </p>
              <p>
                Que vous recherchiez un produit pour vous-même ou pour offrir, le {product.name} est un choix qui ne
                vous décevra pas. Son design élégant et sa qualité exceptionnelle en font un incontournable de notre
                collection.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-4">Caractéristiques</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Matériau</span>
                    <span className="font-medium">Premium</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-medium">Standard</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Poids</span>
                    <span className="font-medium">Léger</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Origine</span>
                    <span className="font-medium">Importé</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-4">Dans la boîte</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>1x {product.name}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Guide d'utilisation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Certificat d'authenticité</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">Avis clients</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">Basé sur 12 avis</span>
                  </div>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">Écrire un avis</Button>
              </div>

              <Separator />

              {/* Avis exemple */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Client satisfait</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < 5 - i ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      Il y a {i + 1} semaine{i > 0 ? "s" : ""}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {i === 0
                      ? `J'adore ce ${product.name}! La qualité est exceptionnelle et le rapport qualité-prix est excellent. Je recommande vivement ce produit à tous ceux qui recherchent un article fiable et élégant.`
                      : i === 1
                        ? `Ce ${product.name} a dépassé mes attentes. Il est exactement comme décrit et fonctionne parfaitement. La livraison a été rapide et l'emballage soigné.`
                        : `Bon produit dans l'ensemble. La qualité est au rendez-vous, même si le prix est un peu élevé. Je suis satisfait de mon achat et je n'hésiterai pas à commander à nouveau.`}
                  </p>
                  <Separator />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Produits similaires */}
      {similarProducts.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Vous aimerez aussi</h2>
          <ProductGrid products={similarProducts} />
        </div>
      )}

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
