"use client";
import React, { useEffect, useState } from "react";
import { MenuItem, MenuItemResponse } from "@/types";
import MenuTreeV2 from "./MenuTree/MenuTree";
import { NodeModel } from "@minoru/react-dnd-treeview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sidebar } from "./Sidebar";
import { MenuDetails } from "./MenuDetails";
import { Breadcrumb } from "./Breadcrumb";
import { HeaderTitle } from "./HeaderTitle";
import { useMenus } from "@/hooks/useMenus";
import { useCreateMenuItem } from "@/hooks/useMenuItems";

const transformData = (data: MenuItemResponse[]): NodeModel<MenuItem>[] => {
  return data.map((item) => {
    return {
      id: item.id,
      parent: item.parentId ?? 0,
      text: item.name,
      droppable: true,
      data: {
        id: item.id,
        name: item.name,
        depth: item.level,
        parentData: item?.parent?.name,
        numberChildren: item.children?.length,
      },
    };
  });
};

const MenuManagement: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<NodeModel<MenuItem> | null>(
    null
  );

  const [treeData, setTreeData] = React.useState<NodeModel<MenuItem>[]>([]);
  const { data: menus, isLoading: menusLoading } = useMenus();
  const { mutateAsync: createMenuItem, isPending: isCreatingMenuItem } =
    useCreateMenuItem();

  const handleSelectMenu = (node: NodeModel<MenuItem>) => {
    setSelectedMenu(node);
  };

  useEffect(() => {
    if (menus) {
      const selectedCategory = menus?.find(
        (menu) => menu.name === menus[0].name
      );
      const newTreeData = transformData(selectedCategory?.items ?? []);
      setTreeData(newTreeData);
      setSelectedMenu(newTreeData[0]);
    }
  }, [menus]);

  const handleChangeCategory = (field: string) => {
    const selectedCategory = menus?.find((menu) => menu.name === field);
    const newTreeData = transformData(selectedCategory?.items ?? []);
    setTreeData(newTreeData);
    setSelectedMenu(newTreeData[0]);
  };

  const handleAddMenu = async ({
    parentId,
    name,
  }: {
    parentId: number;
    name: string;
  }) => {
    if (!menus) return;
    await createMenuItem({
      menuId: menus[0].id,
      parentId: parentId,
      name: name,
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 ml-64 text-[#101828] px-12">
        <Breadcrumb route="Menus" />
        <HeaderTitle title="Menus" />

        <div className="flex flex-col items-start">
          <label>Menu</label>
          {!menusLoading && !menus && <p>No menu found</p>}
          {menusLoading && <p>Loading...</p>}

          {!menusLoading && menus && (
            <Select onValueChange={handleChangeCategory} value={menus[0].name}>
              <SelectTrigger className="w-[180px] bg-[#F9FAFB] border-none rounded-2xl">
                <SelectValue placeholder="Select a menu" />
              </SelectTrigger>
              <SelectContent>
                {menus?.map((menu) => (
                  <SelectItem key={menu.id} value={menu.name}>
                    {menu.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="">
          <div className="grid grid-cols-2 gap-6">
            <MenuTreeV2
              treeData={treeData}
              setTreeData={setTreeData}
              onSelectMenu={handleSelectMenu}
              onAddClick={handleAddMenu}
              isCreatingMenuItem={isCreatingMenuItem}
            />
            <div>
              <MenuDetails selectedMenu={selectedMenu} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
