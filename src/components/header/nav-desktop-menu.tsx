"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { menuItems } from "./nav-data"

export function NavDesktopMenu() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href || ""))
        
        return (
          <Link
            key={item.title}
            href={item.href ?? ""}
            className={cn(
              "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-anthropic",
              "hover:text-primary hover:bg-subtle",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive 
                ? "text-primary bg-subtle" 
                : "text-secondary"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
