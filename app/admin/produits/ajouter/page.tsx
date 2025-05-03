"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, X, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AddProductPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    longDescription: "",
    inStock: true,
    colors: [] as string[],
    sizes: [] as string[],
    features: [""] as string[],
  })

  const [images, setImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      inStock: checked,
    })
  }

  const handleColorToggle = (color: string) => {
    setFormData({
      ...formData,
      colors: formData.colors.includes(color)
        ? formData.colors.filter((c) => c !== color)
        : [...formData.colors, color],
    })
  }

  const handleSizeToggle = (size: string) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.includes(size) ? formData.sizes.filter((s) => s !== size) : [...formData.sizes, size],
    })
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData({
      ...formData,
      features: updatedFeatures,
    })
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    })
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures.splice(index, 1)
    setFormData({
      ...formData,
      features: updatedFeatures,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)

      // Limiter à 5 images
      const newImages = [...images, ...filesArray].slice(0, 5)
      setImages(newImages)

      // Créer des URLs pour les aperçus
      const newImageUrls = newImages.map((file) => URL.createObjectURL(file))
      setImagePreviewUrls(newImageUrls)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newImageUrls = [...imagePreviewUrls]
    URL.revokeObjectURL(newImageUrls[index]) // Libérer l'URL
    newImageUrls.splice(index, 1)
    setImagePreviewUrls(newImageUrls)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation basique
    if (!formData.name || !formData.price || !formData.category || !formData.description) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Ici, vous implémenteriez la logique réelle d'ajout de produit
    console.log("Données du formulaire:", formData)
    console.log("Images:", images)

    toast({
      title: "Produit ajouté",
      description: "Le produit a été ajouté avec succès.",
    })

    // Rediriger vers la liste des produits
    router.push("/admin/produits")
  }

  const availableColors = [
    { name: "Rose", class: "bg-pink-400" },
    { name: "Rouge", class: "bg-red-500" },
    { name: "Noir", class: "bg-gray-900" },
    { name: "Blanc", class: "bg-white border" },
    { name: "Bleu", class: "bg-blue-500" },
    { name: "Vert", class: "bg-green-500" },
    { name: "Bordeaux", class: "bg-red-800" },
    { name: "Beige", class: "bg-yellow-100" },
  ]

  const availableSizes = ["XS", "S", "M", "L", "XL"]

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Ajouter un produit</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
              <CardDescription>Entrez les informations essentielles du produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="ex: Rouge à Lèvres Bio"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix *</Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="ex: 5000 FCFA"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cosmétiques">Cosmétiques</SelectItem>
                      <SelectItem value="Vêtements">Vêtements</SelectItem>
                      <SelectItem value="Ustensiles">Ustensiles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description courte *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brève description du produit"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Description détaillée</Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  placeholder="Description complète du produit"
                  rows={5}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="inStock" checked={formData.inStock} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="inStock">En stock</Label>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
              <CardDescription>Ajoutez jusqu'à 5 images pour votre produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Aperçu ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {imagePreviewUrls.length < 5 && (
                  <label className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-gray-300 hover:border-pink-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center p-4">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Ajouter une image</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">Formats acceptés: JPG, PNG. Taille maximale: 5 MB.</p>
            </CardContent>
          </Card>

          {/* Attributs */}
          <Card>
            <CardHeader>
              <CardTitle>Couleurs et tailles</CardTitle>
              <CardDescription>Définissez les variantes disponibles pour ce produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Couleurs disponibles</Label>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${color.class} ${
                        formData.colors.includes(color.name) ? "ring-2 ring-pink-500 ring-offset-2" : ""
                      }`}
                      onClick={() => handleColorToggle(color.name)}
                      aria-label={`Couleur ${color.name}`}
                    >
                      {formData.colors.includes(color.name) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`h-4 w-4 ${["Blanc", "Beige"].includes(color.name) ? "text-black" : "text-white"}`}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tailles disponibles</Label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`min-w-[40px] h-10 px-3 border rounded-md flex items-center justify-center ${
                        formData.sizes.includes(size)
                          ? "bg-pink-500 text-white border-pink-500"
                          : "border-gray-200 hover:border-pink-200"
                      }`}
                      onClick={() => handleSizeToggle(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Caractéristiques */}
          <Card>
            <CardHeader>
              <CardTitle>Caractéristiques</CardTitle>
              <CardDescription>Ajoutez les caractéristiques principales du produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Caractéristique ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    disabled={formData.features.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFeature} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Ajouter une caractéristique
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
            Enregistrer le produit
          </Button>
        </div>
      </form>
    </div>
  )
}
