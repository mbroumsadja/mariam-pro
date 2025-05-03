"use client"
import { ShoppingCart, Search, Instagram, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import ProductGrid from "@/components/product-grid"
import CartDrawer from "@/components/cart-drawer"
import WhatsAppButton from "@/components/whatsapp-button"
import { products } from "@/lib/products"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-pink-500">Élégance Boutique</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-pink-500 transition-colors">
              Accueil
            </a>
            <a href="#shop" className="text-gray-700 hover:text-pink-500 transition-colors">
              Boutique
            </a>
            <a href="#contact" className="text-gray-700 hover:text-pink-500 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-pink-500 cursor-pointer" />
              <Badge className="absolute -top-2 -right-2 bg-pink-500 hover:bg-pink-600">0</Badge>
            </div>
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-pink-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Votre style, votre cuisine, votre beauté
            </h1>
            <p className="text-lg text-gray-600 mb-8">Découvrez notre collection exclusive de produits pour femmes</p>
            <Button
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-full text-lg"
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            >
              Découvrez nos produits
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100/50 to-white/0 pointer-events-none" />
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Collection</h2>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="pl-10 border-pink-200 focus:border-pink-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
              <Button variant="outline" className="border-pink-200 text-pink-500 hover:bg-pink-50">
                Tous
              </Button>
              <Button variant="outline" className="border-pink-200 text-gray-700 hover:bg-pink-50">
                Cosmétiques
              </Button>
              <Button variant="outline" className="border-pink-200 text-gray-700 hover:bg-pink-50">
                Vêtements
              </Button>
              <Button variant="outline" className="border-pink-200 text-gray-700 hover:bg-pink-50">
                Ustensiles
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col space-y-4">
              <Input type="text" placeholder="Votre nom" className="border-pink-200" />
              <Input type="email" placeholder="Votre email" className="border-pink-200" />
              <textarea
                placeholder="Votre message"
                className="w-full p-3 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={4}
              ></textarea>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">Envoyer</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-pink-500">Élégance Boutique</h3>
              <p className="text-gray-600 mt-2">© 2025 Élégance Boutique. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/+1234567890?text=Je%20veux%20commander"
                className="text-gray-600 hover:text-green-500"
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Cart Drawer (hidden by default) */}
      <CartDrawer />
    </div>
  )
}
