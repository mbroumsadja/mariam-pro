"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronUp, Check, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"

// Types pour les filtres
export interface Filters {
  categories: string[]
  priceRange: [number, number]
  colors: string[]
  sizes: string[]
  inStock: boolean
}

interface FilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  onApplyFilters: () => void
  onResetFilters: () => void
  className?: string
  isMobile?: boolean
}

export default function FilterSidebar({
  filters,
  setFilters,
  onApplyFilters,
  onResetFilters,
  className,
  isMobile = false,
}: FilterSidebarProps) {
  // États pour les accordéons
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    colors: true,
    sizes: !isMobile,
    other: !isMobile,
  })

  // Extraire les valeurs uniques des produits
  const allCategories = Array.from(new Set(products.map((p) => p.category)))
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors || [])))
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes || [])))

  // Trouver le prix min et max
  const minProductPrice = Math.min(...products.map((p) => Number.parseInt(p.price.replace(/[^\d]/g, ""))))
  const maxProductPrice = Math.max(...products.map((p) => Number.parseInt(p.price.replace(/[^\d]/g, ""))))

  // État local pour le prix (pour le slider)
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange)

  // Mettre à jour le prix local quand les filtres changent
  useEffect(() => {
    setLocalPriceRange(filters.priceRange)
  }, [filters.priceRange])

  // Fonctions pour gérer les changements de filtres
  const toggleCategory = (category: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    })
  }

  const toggleColor = (color: string) => {
    setFilters({
      ...filters,
      colors: filters.colors.includes(color) ? filters.colors.filter((c) => c !== color) : [...filters.colors, color],
    })
  }

  const toggleSize = (size: string) => {
    setFilters({
      ...filters,
      sizes: filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size],
    })
  }

  const toggleInStock = () => {
    setFilters({
      ...filters,
      inStock: !filters.inStock,
    })
  }

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]])
  }

  const applyPriceRange = () => {
    setFilters({
      ...filters,
      priceRange: localPriceRange,
    })
  }

  // Fonction pour basculer les sections
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    })
  }

  // Compter les filtres actifs
  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] > minProductPrice || filters.priceRange[1] < maxProductPrice ? 1 : 0)

  // Fonction pour formater le prix
  const formatPrice = (price: number) => `${price.toLocaleString()} FCFA`

  return (
    <div className={cn("bg-white", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sliders className="h-5 w-5 mr-2 text-pink-500" />
          <h2 className="text-lg font-medium">Filtres</h2>
          {activeFilterCount > 0 && <Badge className="ml-2 bg-pink-500">{activeFilterCount}</Badge>}
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onApplyFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {filters.categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="flex items-center gap-1 bg-pink-50 text-pink-700 border-pink-200"
              >
                {category}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(category)} />
              </Badge>
            ))}
            {filters.colors.map((color) => (
              <Badge
                key={color}
                variant="outline"
                className="flex items-center gap-1 bg-pink-50 text-pink-700 border-pink-200"
              >
                {color}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleColor(color)} />
              </Badge>
            ))}
            {filters.sizes.map((size) => (
              <Badge
                key={size}
                variant="outline"
                className="flex items-center gap-1 bg-pink-50 text-pink-700 border-pink-200"
              >
                {size}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleSize(size)} />
              </Badge>
            ))}
            {(filters.priceRange[0] > minProductPrice || filters.priceRange[1] < maxProductPrice) && (
              <Badge variant="outline" className="flex items-center gap-1 bg-pink-50 text-pink-700 border-pink-200">
                {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, priceRange: [minProductPrice, maxProductPrice] })}
                />
              </Badge>
            )}
            {filters.inStock && (
              <Badge variant="outline" className="flex items-center gap-1 bg-pink-50 text-pink-700 border-pink-200">
                En stock
                <X className="h-3 w-3 cursor-pointer" onClick={toggleInStock} />
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-pink-500 hover:text-pink-700 p-0 h-auto"
            onClick={onResetFilters}
          >
            Réinitialiser tous les filtres
          </Button>
        </div>
      )}

      <Separator className="my-4" />

      {/* Catégories */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("categories")}
        >
          Catégories
          {openSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {openSections.categories && (
          <div className="space-y-2">
            {allCategories.map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  className="border-pink-200 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Prix */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("price")}
        >
          Prix
          {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {openSections.price && (
          <div className="space-y-4">
            <div className="px-2">
              <Slider
                defaultValue={[minProductPrice, maxProductPrice]}
                min={minProductPrice}
                max={maxProductPrice}
                step={500}
                value={[localPriceRange[0], localPriceRange[1]]}
                onValueChange={handlePriceChange}
                onValueCommit={applyPriceRange}
                className="my-6"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{formatPrice(localPriceRange[0])}</span>
              <span className="text-sm">{formatPrice(localPriceRange[1])}</span>
            </div>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Couleurs */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("colors")}
        >
          Couleurs
          {openSections.colors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {openSections.colors && (
          <div className="grid grid-cols-2 gap-2">
            {allColors.map((color) => {
              // Mapper les noms de couleurs aux classes Tailwind
              const colorClass =
                {
                  Rose: "bg-pink-400",
                  Rouge: "bg-red-500",
                  Noir: "bg-gray-900",
                  Blanc: "bg-white border",
                  Bleu: "bg-blue-500",
                  "Bleu marine": "bg-blue-900",
                  "Bleu ciel": "bg-blue-300",
                  "Bleu nuit": "bg-blue-800",
                  Vert: "bg-green-500",
                  "Vert menthe": "bg-green-300",
                  Bordeaux: "bg-red-800",
                  Beige: "bg-yellow-100",
                  Corail: "bg-red-400",
                  Brun: "bg-yellow-800",
                  "Gris anthracite": "bg-gray-700",
                  Standard: "bg-gray-200",
                }[color] || "bg-gray-200"

              return (
                <div key={color} className="flex items-center">
                  <button
                    className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${colorClass} ${
                      filters.colors.includes(color) ? "ring-2 ring-pink-500 ring-offset-2" : ""
                    }`}
                    onClick={() => toggleColor(color)}
                    aria-label={`Couleur ${color}`}
                  >
                    {filters.colors.includes(color) && (
                      <Check
                        className={`h-3 w-3 ${["Blanc", "Beige", "Standard"].includes(color) ? "text-black" : "text-white"}`}
                      />
                    )}
                  </button>
                  <span className="text-sm">{color}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {allSizes.length > 0 && (
        <>
          <Separator className="my-4" />
          {/* Tailles */}
          <div className="mb-4">
            <button
              className="flex items-center justify-between w-full text-left font-medium mb-2"
              onClick={() => toggleSection("sizes")}
            >
              Tailles
              {openSections.sizes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {openSections.sizes && (
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    className={`min-w-[40px] h-10 px-3 border rounded-md flex items-center justify-center ${
                      filters.sizes.includes(size)
                        ? "bg-pink-500 text-white border-pink-500"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <Separator className="my-4" />

      {/* Autres filtres */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection("other")}
        >
          Autres filtres
          {openSections.other ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {openSections.other && (
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={toggleInStock}
                className="border-pink-200 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
              />
              <label
                htmlFor="in-stock"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                En stock uniquement
              </label>
            </div>
          </div>
        )}
      </div>

      {isMobile && (
        <div className="mt-6 flex gap-2">
          <Button variant="outline" className="flex-1 border-pink-200 text-pink-500" onClick={onResetFilters}>
            Réinitialiser
          </Button>
          <Button className="flex-1 bg-pink-500 hover:bg-pink-600" onClick={onApplyFilters}>
            Appliquer ({activeFilterCount})
          </Button>
        </div>
      )}
    </div>
  )
}
