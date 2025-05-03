"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProductGrid from "@/components/product-grid"
import FilterSidebar, { type Filters } from "@/components/filter-sidebar"
import { products } from "@/lib/products"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ShopPage() {
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState("")

  // État pour les filtres
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 50000], // Valeurs par défaut
    colors: [],
    sizes: [],
    inStock: false,
  })

  // État pour les produits filtrés
  const [filteredProducts, setFilteredProducts] = useState(products)

  // État pour le tri
  const [sortOption, setSortOption] = useState("featured")

  // Vérifier si on est sur mobile
  const isMobile = !useMediaQuery("(min-width: 768px)")

  // État pour le drawer de filtres sur mobile
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  // Initialiser les plages de prix
  useEffect(() => {
    const minPrice = Math.min(...products.map((p) => Number.parseInt(p.price.replace(/[^\d]/g, ""))))
    const maxPrice = Math.max(...products.map((p) => Number.parseInt(p.price.replace(/[^\d]/g, ""))))
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }))
  }, [])

  // Filtrer les produits quand les filtres ou la recherche changent
  useEffect(() => {
    let result = [...products]

    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Filtrer par catégorie
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category))
    }

    // Filtrer par prix
    result = result.filter((product) => {
      const price = Number.parseInt(product.price.replace(/[^\d]/g, ""))
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Filtrer par couleur
    if (filters.colors.length > 0) {
      result = result.filter((product) => product.colors?.some((color) => filters.colors.includes(color)))
    }

    // Filtrer par taille
    if (filters.sizes.length > 0) {
      result = result.filter((product) => product.sizes?.some((size) => filters.sizes.includes(size)))
    }

    // Filtrer par stock
    if (filters.inStock) {
      result = result.filter((product) => product.inStock !== false)
    }

    // Trier les produits
    switch (sortOption) {
      case "price-asc":
        result.sort(
          (a, b) => Number.parseInt(a.price.replace(/[^\d]/g, "")) - Number.parseInt(b.price.replace(/[^\d]/g, "")),
        )
        break
      case "price-desc":
        result.sort(
          (a, b) => Number.parseInt(b.price.replace(/[^\d]/g, "")) - Number.parseInt(a.price.replace(/[^\d]/g, "")),
        )
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      // Par défaut, on garde l'ordre original (featured)
    }

    setFilteredProducts(result)
  }, [searchQuery, filters, sortOption])

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    const minPrice = Math.min(...products.map((p) => Number.parseInt(p.price.replace(/[^\d]/g, ""))))
    const maxPrice = Math.max(...products.map((p) => Number.parseInt(p.price.replace(/[^\d]/g, ""))))

    setFilters({
      categories: [],
      priceRange: [minPrice, maxPrice],
      colors: [],
      sizes: [],
      inStock: false,
    })
    setSearchQuery("")
  }

  // Fermer le drawer de filtres sur mobile
  const closeFilterDrawer = () => {
    setIsFilterDrawerOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-pink-500">Élégance Boutique</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-pink-500 transition-colors">
              Accueil
            </a>
            <a href="/boutique" className="text-pink-500 font-medium">
              Boutique
            </a>
            <a href="#contact" className="text-gray-700 hover:text-pink-500 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
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
                className="h-6 w-6 text-gray-700 hover:text-pink-500 cursor-pointer"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
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

      {/* Shop Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Notre Boutique</h1>

          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 border-pink-200 focus:border-pink-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {isMobile && (
              <Sheet open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="border-pink-200">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                  <div className="p-6 h-full overflow-y-auto">
                    <FilterSidebar
                      filters={filters}
                      setFilters={setFilters}
                      onApplyFilters={closeFilterDrawer}
                      onResetFilters={resetFilters}
                      isMobile={true}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <select
              className="border border-pink-200 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Recommandés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar pour les filtres (desktop) */}
          {!isMobile && (
            <div className="w-full md:w-64 shrink-0">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onApplyFilters={() => {}}
                onResetFilters={resetFilters}
                className="sticky top-24"
              />
            </div>
          )}

          {/* Contenu principal */}
          <div className="flex-1">
            {/* Résultats */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Grille de produits */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-6">Essayez de modifier vos filtres ou votre recherche.</p>
                <Button onClick={resetFilters} className="bg-pink-500 hover:bg-pink-600">
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
