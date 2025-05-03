"use client"

import { Phone } from "lucide-react"

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    window.open("https://wa.me/+1234567890?text=Je%20veux%20commander", "_blank")
  }

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110"
      aria-label="Contacter sur WhatsApp"
    >
      <Phone className="h-6 w-6" />
    </button>
  )
}
