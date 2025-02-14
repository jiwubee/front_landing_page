"use client";
import React, { createContext, useContext, useState } from "react";

// Base type for a menu item from API
export interface MenuItemBase {
  id: number;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
}

// Type for our menu items with category
export interface MenuItem extends MenuItemBase {
  category: string;
}

// Type for API response
export interface MenuData {
  ramen: MenuItemBase[];
  przystawki: MenuItemBase[];
}

// Type for our context
interface MenuContextType {
  menu: MenuItem[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  setMenu: (menu: MenuItem[]) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <MenuContext.Provider
      value={{ menu, setMenu, activeCategory, setActiveCategory }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within MenuProvider");
  }
  return context;
};
