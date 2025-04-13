"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export function MenuCategories({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="py-4 sticky top-[68px] bg-amber-50 z-10">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-2">

          {categories.map((category) => (
        
        <a href={`#${category.name}`}>
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === category.id
                  ? "bg-amber-800 hover:bg-amber-700"
                  : "border-amber-800 text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
              </a>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

