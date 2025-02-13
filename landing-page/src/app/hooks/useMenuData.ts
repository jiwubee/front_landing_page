import useSWR from "swr";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
  category: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useMenuData() {
  const { data, error, isLoading } = useSWR<MenuItem[]>("/api/menu", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 300000,
  });

  return {
    menu: data || [],
    isLoading,
    isError: error,
  };
}
