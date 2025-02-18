import { menuService } from "@/services/menu";
import { CreateMenuItemDto, UpdateMenuItemDto } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMenuItem = (id: number) => {
  return useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => menuService.getMenuItem(id),
    enabled: !!id,
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuItemDto) => menuService.createMenuItem(data),
    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menu", newItem.menuId] });
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMenuItemDto }) =>
      menuService.updateMenuItem(id, data),
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menu", updatedItem.menuId] });
      queryClient.invalidateQueries({ queryKey: ["menuItem", updatedItem.id] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => menuService.deleteMenuItem(id),
    onSuccess: (deletedItem) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      queryClient.invalidateQueries({ queryKey: ["menu", deletedItem.menuId] });
    },
  });
};
