import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  CreateMenuDto,
  UpdateMenuDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './menu.dto';
import { Menu, MenuItem } from '@prisma/client';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() data: CreateMenuDto): Promise<Menu> {
    return this.menuService.createMenu(data);
  }

  @Get(':id')
  async getMenu(@Param('id', ParseIntPipe) id: number): Promise<Menu> {
    return this.menuService.getMenu(id);
  }

  @Get()
  async getMenus(
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('isActive') isActive?: boolean,
  ): Promise<Menu[]> {
    return this.menuService.getMenus({
      skip,
      take,
      where: isActive !== undefined ? { isActive } : undefined,
    });
  }

  @Put(':id')
  async updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menuService.updateMenu(id, data);
  }

  @Delete(':id')
  async deleteMenu(@Param('id', ParseIntPipe) id: number): Promise<Menu> {
    return this.menuService.deleteMenu(id);
  }

  @Post('items')
  async createMenuItem(@Body() data: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuService.createMenuItem(data);
  }

  @Get('items/:id')
  async getMenuItem(@Param('id', ParseIntPipe) id: number): Promise<MenuItem> {
    return this.menuService.getMenuItem(id);
  }

  @Get('items')
  async getMenuItems(
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('menuId', ParseIntPipe) menuId?: number,
    @Query('isActive') isActive?: boolean,
  ): Promise<MenuItem[]> {
    return this.menuService.getMenuItems({
      skip,
      take,
      where: {
        menuId,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });
  }

  @Put('items/:id')
  async updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    return this.menuService.updateMenuItem(id, data);
  }

  @Delete('items/:id')
  async deleteMenuItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MenuItem> {
    return this.menuService.deleteMenuItem(id);
  }
}
