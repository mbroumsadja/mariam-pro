"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Mettre à jour l'état avec la correspondance actuelle
    const updateMatches = () => {
      setMatches(media.matches)
    }

    // Définir la valeur initiale
    updateMatches()

    // Ajouter un écouteur pour les changements
    media.addEventListener("change", updateMatches)

    // Nettoyer l'écouteur
    return () => {
      media.removeEventListener("change", updateMatches)
    }
  }, [query])

  return matches
}
