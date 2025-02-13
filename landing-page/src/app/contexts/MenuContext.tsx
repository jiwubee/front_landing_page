"use client";
import React, { createContext, useContext, useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
  category: string;
}

interface MenuState {
  menu: MenuItem[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  setMenu: (menu: MenuItem[]) => void;
}

const MenuContext = createContext<MenuState | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <MenuContext.Provider
      value={{
        menu,
        setMenu,
        activeCategory,
        setActiveCategory,
      }}>
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
