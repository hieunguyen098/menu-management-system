import { MenuItem } from "@/types";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { Input } from "../ui/input";
import { useUpdateMenuItem } from "@/hooks/useMenuItems";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

interface MenuDetailsProps {
  selectedMenu: NodeModel<MenuItem> | null;
}
export const MenuDetails: React.FC<MenuDetailsProps> = ({ selectedMenu }) => {
  const [name, setName] = useState(selectedMenu?.data?.name ?? "");
  const { mutateAsync: updateMenuItem, isPending: isUpdating } =
    useUpdateMenuItem();

  useEffect(() => {
    setName(selectedMenu?.data?.name ?? "");
  }, [selectedMenu]);

  const handleSubmit = async () => {
    if (!selectedMenu) {
      return;
    }
    if (name.trim() === selectedMenu?.data?.name) return;
    await updateMenuItem(
      {
        id: Number(selectedMenu.id),
        data: {
          name: name.trim(),
        },
      },
      {
        onSuccess: () => {
          setName(name.trim());
          toast.success("Menu item updated successfully");
        },
      }
    );
  };

  if (!selectedMenu) {
    return null;
  }

  return (
    <div className="p-6">
      {selectedMenu?.id && (
        <div className="mb-6">
          <label className="text-sm text-gray-500 mb-2">Menu ID</label>
          <Input disabled value={selectedMenu?.id} />
        </div>
      )}

      <div className="mb-6">
        <label className="text-sm text-gray-500 mb-2">Depth</label>
        <Input disabled value={selectedMenu?.data?.depth ?? 0} />
      </div>

      {selectedMenu?.data?.parentData && (
        <div className="mb-6">
          <label className="text-sm text-gray-500 mb-2">Parent Data</label>
          <Input disabled value={selectedMenu?.data?.parentData} />
        </div>
      )}

      <div className="mb-6">
        <label className="text-sm text-gray-500 mb-2">Name</label>
        <Input value={name} onChange={(e) => setName(e.currentTarget.value)} />
      </div>

      <Button
        className="w-72 bg-[#253BFF] text-white py-2 px-4 rounded-full hover:opacity-70 disabled:cursor-not-allowed"
        disabled={isUpdating || name.trim() === selectedMenu?.data?.name}
        onClick={handleSubmit}
      >
        {isUpdating ? "Updating..." : "Update"}
      </Button>
    </div>
  );
};
