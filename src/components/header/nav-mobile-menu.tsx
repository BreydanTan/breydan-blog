"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { menuItems } from "./nav-data"
import { config } from "@/lib/config"

export function NavMobileMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="inline-flex items-center justify-center w-9 h-9 rounded-md text-muted hover:text-primary hover:bg-subtle transition-anthropic"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 bg-background border-r border-border">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link 
              href="/" 
              className="flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">
                  {config.site.title.charAt(0)}
                </span>
              </div>
              <span className="font-semibold text-lg">
                {config.site.title.split(' ')[0]}
              </span>
            </Link>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href || ""))
                
                return (
                  <Link
                    key={item.title}
                    href={item.href ?? ""}
                    className={cn(
                      "flex items-center px-3 py-2 text-base font-medium rounded-md transition-anthropic",
                      "hover:text-primary hover:bg-subtle",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive 
                        ? "text-primary bg-subtle" 
                        : "text-secondary"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}