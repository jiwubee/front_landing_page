import useSWR from "swr";
import type { MenuItemBase } from "@/app/contexts/MenuContext";

interface MenuData {
  ramen: MenuItemBase[];
  przystawki: MenuItemBase[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useMenuData() {
  const { data, error, isLoading } = useSWR<MenuData>("/api/menu", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 300000, // 5 minutes
  });

  return {
    menu: data,
    isLoading,
    isError: error,
  };
}
