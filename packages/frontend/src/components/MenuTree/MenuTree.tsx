"use client";
import {
  DndProvider,
  DropOptions,
  getBackendOptions,
  getDescendants,
  MultiBackend,
  Tree,
  NodeModel,
} from "@minoru/react-dnd-treeview";
import Node from "./Node";
import styles from "./styles.module.css";
import { MenuItem } from "@/types";
import Placeholder from "./Placeholder";
import useTreeOpenHandler from "@/hooks/useTreeOpenHandler";

const reorderArray = (
  array: NodeModel[],
  sourceIndex: number,
  targetIndex: number
) => {
  const newArray = [...array];
  const element = newArray.splice(sourceIndex, 1)[0];
  newArray.splice(targetIndex, 0, element);
  return newArray;
};

export default function MenuTreeV2({
  treeData,
  setTreeData,
  onSelectMenu,
  onAddClick,
  isCreatingMenuItem = false,
}: {
  treeData: NodeModel<MenuItem>[];
  setTreeData: React.Dispatch<React.SetStateAction<NodeModel<MenuItem>[]>>;
  onSelectMenu: (node: NodeModel<MenuItem>) => void;
  onAddClick?: ({
    parentId,
    name,
  }: {
    parentId: number;
    name: string;
  }) => Promise<void>;
  isCreatingMenuItem?: boolean;
}) {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler();
  const handleOpenAll = () => ref.current?.openAll();
  const handleCloseAll = () => ref.current?.closeAll();
  const handleDrop = (newTree: NodeModel[], e: DropOptions) => {
    const { dragSourceId, dropTargetId, destinationIndex } = e;
    if (
      typeof dragSourceId === "undefined" ||
      typeof dropTargetId === "undefined"
    )
      return;
    const start = treeData.find((v) => v.id === dragSourceId);
    const end = treeData.find((v) => v.id === dropTargetId);

    if (
      start?.parent === dropTargetId &&
      start &&
      typeof destinationIndex === "number"
    ) {
      setTreeData((treeData) => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        );
        return output as NodeModel<MenuItem>[];
      });
    }

    if (
      start?.parent !== dropTargetId &&
      start &&
      typeof destinationIndex === "number"
    ) {
      if (
        getDescendants(treeData, dragSourceId).find(
          (el) => el.id === dropTargetId
        ) ||
        dropTargetId === dragSourceId ||
        (end && !end?.droppable)
      )
        return;
      setTreeData((treeData) => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        );
        const movedElement = output.find((el) => el.id === dragSourceId);
        if (movedElement) movedElement.parent = dropTargetId;
        return output as NodeModel<MenuItem>[];
      });
    }
  };

  return (
    <div>
      <div className="my-6">
        <div className="flex items-center space-x-4">
          <button
            className="px-8 py-2 bg-gray-900 text-white text-sm font-bold rounded-full hover:opacity-70 transition-opacity duration-200"
            onClick={handleOpenAll}
          >
            Expand All
          </button>
          <button
            className="px-8 py-2 bg-white border-[#D0D5DD] border text-sm font-bold rounded-full hover:opacity-70 transition-opacity duration-200"
            onClick={handleCloseAll}
          >
            Collapse All
          </button>
        </div>
      </div>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.wrapper}>
          <Tree
            ref={ref}
            classes={{
              root: styles.treeRoot,
              placeholder: styles.placeholder,
              dropTarget: styles.dropTarget,
              listItem: styles.listItem,
            }}
            tree={treeData}
            sort={false}
            rootId={0}
            insertDroppableFirst={false}
            enableAnimateExpand={true}
            onDrop={handleDrop}
            canDrop={() => true}
            dropTargetOffset={5}
            placeholderRender={(node, { depth }) => (
              <Placeholder node={node} depth={depth} />
            )}
            render={(node, { depth, isOpen, isDropTarget }) => (
              <Node
                getPipeHeight={getPipeHeight}
                node={node}
                depth={depth}
                isOpen={isOpen}
                onClick={() => {
                  onSelectMenu(node);
                  if (node.droppable) {
                    toggle(node?.id);
                  }
                }}
                isDropTarget={isDropTarget}
                treeData={treeData}
                onAddClick={onAddClick}
                isCreatingMenuItem={isCreatingMenuItem}
              />
            )}
          />
        </div>
      </DndProvider>
    </div>
  );
}
