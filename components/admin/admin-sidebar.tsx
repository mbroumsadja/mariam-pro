"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Users, BarChart, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Produits", href: "/admin/produits", icon: ShoppingBag },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Statistiques", href: "/admin/statistiques", icon: BarChart },
    { name: "Paramètres", href: "/admin/parametres", icon: Settings },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6">
        <Link href="/admin" className="flex items-center">
          <span className="text-2xl font-bold text-pink-500">Admin</span>
        </Link>
      </div>
      <div className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-pink-100 text-pink-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-pink-500" : "text-gray-500")} />
              {item.name}
            </Link>
          )
        })}
      </div>
      <div className="px-2 py-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
          <LogOut className="mr-3 h-5 w-5 text-gray-500" />
          Déconnexion
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transform transition-transform ease-in-out duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebar}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 bg-white border-r">{sidebar}</div>
    </>
  )
}
