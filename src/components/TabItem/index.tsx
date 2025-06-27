"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMenuStore } from "@/store/menuStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuItem } from "@/store/types";
import { useLayoutEffect, useState } from "react";

function TabItem({ item }: { item: MenuItem }) {
  const [isClient, setIsClient] = useState(false);
  const { name } = item;
  const closeMenu = useMenuStore((state) => state.closeMenu);
  
  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeMenu(name);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isClient) {
    return (
      <div className="bg-violet-500 text-white font-bold text-center p-1 relative" style={{height: '32px'}}>
        {name}
        <div 
          className="absolute right-0 top-0 p-2 hover:bg-violet-700 cursor-pointer"
          onClick={handleClose}
        >
          <XMarkIcon className="size-4" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="active:border-1 active:border-violet-400 active:rounded-md active:shadow-lg"
    >
      <div className="bg-violet-500 text-white font-bold text-center p-1 relative cursor-move" style={{height: '32px'}}>
        {name}
        <div 
          className="absolute right-0 top-0 p-2 hover:bg-violet-700 cursor-pointer"
          onClick={handleClose}
          onMouseDown={(e) => {e.stopPropagation() }}
          onDragStart={(e) => {e.stopPropagation() }}
        >
          <XMarkIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}

export default TabItem;
