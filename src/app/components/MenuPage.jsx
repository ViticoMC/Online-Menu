"use client";

import { useState } from "react";
import { MenuHeader } from "./MenuHeader";
import { MenuCategories } from "./MenuCategorias";
import { MenuItems } from "./MenuItems";
import { menuData } from "../data/data";

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(
  );

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 sm:scroll-pt-[80px] scroll-pt-[100px]">
      <MenuHeader cafeName="Café Hola" />
      <main className="flex-1 container mx-auto px-1 pb-20">
        <MenuCategories
          categories={menuData.categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <MenuItems items={menuData.items} categories={menuData.categories} />
      </main>
    </div>
  );
}
