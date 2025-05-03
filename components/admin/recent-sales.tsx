"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>FM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Fatou Mbaye</p>
          <p className="text-sm text-muted-foreground">fatou.mbaye@example.com</p>
        </div>
        <div className="ml-auto font-medium">+12,500 FCFA</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Aminata Sow</p>
          <p className="text-sm text-muted-foreground">aminata.sow@example.com</p>
        </div>
        <div className="ml-auto font-medium">+8,350 FCFA</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Moussa Diop</p>
          <p className="text-sm text-muted-foreground">moussa.diop@example.com</p>
        </div>
        <div className="ml-auto font-medium">+21,300 FCFA</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Aïda Diallo</p>
          <p className="text-sm text-muted-foreground">aida.diallo@example.com</p>
        </div>
        <div className="ml-auto font-medium">+4,999 FCFA</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>OG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Omar Gueye</p>
          <p className="text-sm text-muted-foreground">omar.gueye@example.com</p>
        </div>
        <div className="ml-auto font-medium">+7,500 FCFA</div>
      </div>
    </div>
  )
}
