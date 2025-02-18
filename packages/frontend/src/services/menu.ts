import {
  CreateMenuItemDto,
  MenuItemResponse,
  MenuResponse,
  UpdateMenuItemDto,
} from "@/types";
import { api } from "./api";

export const menuService = {
  // Menu APIs
  getMenus: async () => {
    const { data } = await api.get<MenuResponse[]>("/menus", {
      params: {
        skip: 0,
        take: 10,
      },
    });
    console.log("data", data);
    return data;
  },

  getMenu: async (id: number) => {
    const { data } = await api.get<MenuResponse>(`/menus/${id}`);
    return data;
  },

  // MenuItem APIs

  getMenuItem: async (id: number) => {
    const { data } = await api.get<MenuItemResponse>(`/menus/items/${id}`);
    return data;
  },

  createMenuItem: async (itemData: CreateMenuItemDto) => {
    const { data } = await api.post<MenuItemResponse>("/menus/items", {
      ...itemData,
      parentId: itemData.parentId === 0 ? null : itemData.parentId,
    });
    return data;
  },

  updateMenuItem: async (id: number, itemData: UpdateMenuItemDto) => {
    const { data } = await api.put<MenuItemResponse>(
      `/menus/items/${id}`,
      itemData
    );
    return data;
  },

  deleteMenuItem: async (id: number) => {
    const { data } = await api.delete<MenuItemResponse>(`/menus/items/${id}`);
    return data;
  },
};
