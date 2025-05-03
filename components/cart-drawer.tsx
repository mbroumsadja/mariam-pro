"use client"

import { useState, useEffect } from "react"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import Image from "next/image"

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

  // Close the drawer when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest(".cart-drawer") && !target.closest(".cart-trigger")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [isOpen])

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleCheckout = () => {
    // Create WhatsApp message with cart items
    const items = cart.map((item) => `${item.quantity}x ${item.name} (${item.price})`).join("\n")
    const message = `Bonjour, je veux commander :\n${items}\n\nTotal: ${totalPrice} FCFA`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/+1234567890?text=${encodedMessage}`, "_blank")
  }

  return (
    <>
      {/* Cart Trigger Button */}
      <button className="cart-trigger fixed top-4 right-4 z-40 md:hidden" onClick={() => setIsOpen(true)}>
        <ShoppingBag className="h-6 w-6 text-pink-500" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />}

      {/* Cart Drawer */}
      <div
        className={`cart-drawer fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Votre Panier</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex border-b pb-4">
                    <div className="w-20 h-20 relative rounded overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-pink-600">{item.price}</p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-pink-600">{totalPrice} FCFA</span>
            </div>
            <Button
              className="w-full bg-pink-500 hover:bg-pink-600 mb-2"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Passer commande
            </Button>
            <Button
              variant="outline"
              className="w-full border-pink-200 text-pink-500"
              disabled={cart.length === 0}
              onClick={clearCart}
            >
              Vider le panier
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
