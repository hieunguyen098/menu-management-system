export interface MenuItem {
  id: number | string;
  name: string;
  depth?: number;
  parentData?: string;
  numberChildren?: number;
}

export interface MenuResponse {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  isActive: boolean;
  items: MenuItemResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemResponse {
  id: number;
  name: string;
  slug?: string;
  menuId: number;
  parentId?: number;
  order: number;
  level: number;
  path: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parent?: MenuItemResponse | null;
  children?: MenuItemResponse[];
}

export interface CreateMenuItemDto {
  name: string;
  slug?: string;
  menuId: number;
  parentId?: number;
  order?: number;
  isActive?: boolean;
}

export interface UpdateMenuItemDto {
  name?: string;
  slug?: string;
  parentId?: number;
  order?: number;
  isActive?: boolean;
}
