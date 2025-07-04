// @ts-nocheck

"use client"

import * as React from "react"

import { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

interface TocProps {
  toc: TableOfContents
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items?.length) {
    return null
  }

  return (
    <div className="space-y-2">
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null)
  const mounted = useMounted()

  React.useEffect(() => {
    if (!mounted || typeof window === 'undefined' || !window.IntersectionObserver) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      if (typeof document !== 'undefined') {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        }
      }
    })

    return () => {
      if (typeof document !== 'undefined') {
        itemIds?.forEach((id) => {
          const element = document.getElementById(id)
          if (element) {
            observer.unobserve(element)
          }
        })
      }
    }
  }, [itemIds, mounted])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-2 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                item.url === `#${activeItem}`
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
