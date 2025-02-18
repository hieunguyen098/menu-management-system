import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu, MenuItem, Prisma } from '@prisma/client';
import {
  CreateMenuDto,
  UpdateMenuDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './menu.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Menu CRUD operations
  async createMenu(data: CreateMenuDto): Promise<Menu> {
    return this.prisma.menu.create({
      data: {
        ...data,
        slug: data.slug || this.generateSlug(data.name),
      },
      include: {
        items: {
          orderBy: [{ level: 'asc' }, { order: 'asc' }, { id: 'asc' }],
        },
      },
    });
  }

  async getMenu(id: number): Promise<Menu> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: [{ level: 'asc' }, { order: 'asc' }, { id: 'asc' }],
        },
      },
    });

    if (!menu) throw new NotFoundException(`Menu with ID ${id} not found`);
    return menu;
  }

  async getMenus(params: {
    skip?: number;
    take?: number;
    where?: Prisma.MenuWhereInput;
  }): Promise<Menu[]> {
    const { skip, take, where } = params;
    return this.prisma.menu.findMany({
      skip,
      take,
      where,
      include: {
        items: {
          orderBy: [{ level: 'asc' }, { order: 'asc' }, { id: 'asc' }],
          include: {
            parent: true,
            children: true,
          },
        },
      },
    });
  }

  async updateMenu(id: number, data: UpdateMenuDto): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data: {
        ...data,
        slug:
          data.slug || (data.name ? this.generateSlug(data.name) : undefined),
      },
      include: {
        items: {
          orderBy: [{ level: 'asc' }, { order: 'asc' }, { id: 'asc' }],
        },
      },
    });
  }

  async deleteMenu(id: number): Promise<Menu> {
    return this.prisma.menu.delete({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  // MenuItem CRUD operations
  async createMenuItem(data: CreateMenuItemDto): Promise<MenuItem> {
    const menu = await this.prisma.menu.findUnique({
      where: { id: data.menuId },
    });
    if (!menu)
      throw new NotFoundException(`Menu with ID ${data.menuId} not found`);

    let path = '/';
    let level = 0;

    if (data.parentId) {
      const parent = await this.prisma.menuItem.findUnique({
        where: { id: data.parentId },
      });
      if (!parent)
        throw new NotFoundException(
          `Parent MenuItem with ID ${data.parentId} not found`,
        );
      path = `${parent.path}${parent.id}/`;
      level = parent.level + 1;
    }

    return this.prisma.menuItem.create({
      data: {
        ...data,
        slug: data.slug || this.generateSlug(data.name),
        path,
        level,
      },
    });
  }

  async getMenuItem(id: number): Promise<MenuItem> {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem)
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    return menuItem;
  }

  async getMenuItems(params: {
    skip?: number;
    take?: number;
    where?: Prisma.MenuItemWhereInput;
  }): Promise<MenuItem[]> {
    const { skip, take, where } = params;
    return this.prisma.menuItem.findMany({
      skip,
      take,
      where,
      orderBy: [{ level: 'asc' }, { order: 'asc' }, { id: 'asc' }],
    });
  }

  async updateMenuItem(id: number, data: UpdateMenuItemDto): Promise<MenuItem> {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });
    if (!menuItem)
      throw new NotFoundException(`MenuItem with ID ${id} not found`);

    let path = menuItem.path;
    let level = menuItem.level;

    if (data.parentId && data.parentId !== menuItem.parentId) {
      const parent = await this.prisma.menuItem.findUnique({
        where: { id: data.parentId },
      });
      if (!parent)
        throw new NotFoundException(
          `Parent MenuItem with ID ${data.parentId} not found`,
        );
      path = `${parent.path}${parent.id}/`;
      level = parent.level + 1;

      // Update all children paths
      await this.updateChildrenPaths(id, path, level);
    }

    return this.prisma.menuItem.update({
      where: { id },
      data: {
        ...data,
        slug:
          data.slug || (data.name ? this.generateSlug(data.name) : undefined),
        path,
        level,
      },
    });
  }

  async deleteMenuItem(id: number): Promise<MenuItem> {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }

  // Helper methods
  private async updateChildrenPaths(
    parentId: number,
    parentPath: string,
    parentLevel: number,
  ): Promise<void> {
    const children = await this.prisma.menuItem.findMany({
      where: { parentId },
    });

    for (const child of children) {
      const newPath = `${parentPath}${child.id}/`;
      const newLevel = parentLevel + 1;

      await this.prisma.menuItem.update({
        where: { id: child.id },
        data: { path: newPath, level: newLevel },
      });

      await this.updateChildrenPaths(child.id, newPath, newLevel);
    }
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
