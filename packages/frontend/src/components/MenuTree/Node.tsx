import React from "react";
import { getDescendants, NodeModel } from "@minoru/react-dnd-treeview";
import styles from "./styles.module.css";
import { PlusIcon } from "lucide-react";
import { MenuItem } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CreateMenuForm } from "../CreateMenuForm";

const TREE_X_OFFSET = 22;

const Node: React.FC<{
  node: NodeModel<MenuItem>;
  depth: number;
  isOpen: boolean;
  isDropTarget: boolean;
  treeData: NodeModel[];
  onClick: (id: NodeModel["id"]) => void;
  getPipeHeight: (id: string | number, treeData: NodeModel[]) => number;
  onAddClick?: ({
    parentId,
    name,
  }: {
    parentId: number;
    name: string;
  }) => Promise<void>;
  isCreatingMenuItem?: boolean;
}> = ({
  node,
  depth,
  isOpen,
  isDropTarget,
  onClick,
  treeData,
  getPipeHeight,
  onAddClick,
  isCreatingMenuItem = false,
}) => {
  const indent = depth * TREE_X_OFFSET;
  const [isOpenCreateMenu, setIsOpenCreateMenu] = React.useState(false);
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(node.id);
  };

  return (
    <div
      className={`${styles.nodeWrapper} tree-node ${
        node.droppable && isDropTarget ? styles.dropTarget : ""
      }`}
      style={{ marginInlineStart: indent }}
    >
      {(node.data?.numberChildren ?? 0) > 0 && (
        <div
          className={`${styles.expandIconWrapper} ${
            isOpen ? styles.isOpen : ""
          }`}
          onClick={handleToggle}
        >
          {node.droppable && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5866 5.99969L7.99997 8.58632L5.41332 5.99969C5.15332 5.73969 4.73332 5.73969 4.47332 5.99969C4.21332 6.25969 4.21332 6.67965 4.47332 6.93965L7.5333 9.99965C7.59497 10.0615 7.66823 10.1105 7.7489 10.144C7.82957 10.1775 7.91603 10.1947 8.0033 10.1947C8.09063 10.1947 8.1771 10.1775 8.25777 10.144C8.33837 10.1105 8.41163 10.0615 8.4733 9.99965L11.5333 6.93965C11.7933 6.67965 11.7933 6.25969 11.5333 5.99969C11.2733 5.74635 10.8466 5.73969 10.5866 5.99969Z"
                fill="black"
              />
            </svg>
          )}
        </div>
      )}
      <div
        className={styles.pipeX}
        style={{ width: depth > 0 ? TREE_X_OFFSET - 9 : 0 }}
      />
      {getDescendants(treeData, node.parent)[0].id === node.id && (
        <div
          className={styles.pipeY}
          style={{
            height: Math.max(0, getPipeHeight(node.parent, treeData) - 8),
          }}
        />
      )}
      <div className={`${styles.labelGridItem} flex gap-4`}>
        <p onClick={handleToggle}>{node.text}</p>
        <Dialog open={isOpenCreateMenu} onOpenChange={setIsOpenCreateMenu}>
          <DialogTrigger asChild>
            <Button
              className="w-6 h-6 text-white bg-[#253BFF] flex justify-center items-center rounded-full"
              onClick={() => setIsOpenCreateMenu(true)}
            >
              <PlusIcon size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Item</DialogTitle>
            </DialogHeader>
            <CreateMenuForm
              isSubmitting={isCreatingMenuItem}
              onSubmit={onAddClick}
              parentId={node.id as number}
              onCancel={() => setIsOpenCreateMenu(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Node;
