import { menuService } from "@/services/menu";
import { useQuery } from "@tanstack/react-query";

export const useMenus = (params?: {
  skip?: number;
  take?: number;
  isActive?: boolean;
}) => {
  return useQuery({
    queryKey: ["menus", params],
    queryFn: () => menuService.getMenus(),
  });
};

export const useMenu = (id: number) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => menuService.getMenu(id),
    enabled: !!id,
  });
};
