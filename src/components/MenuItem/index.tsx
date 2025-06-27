"use client";
import { activeClass, useMenuStore } from "@/store/menuStore";
import { MenuItem as TMenuItem } from "@/store/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useLayoutEffect, useState } from "react";

function MenuItem({ item }: { item: TMenuItem }) {
  const [isClient, setIsClient] = useState(false);
  const { name, icon, isActive } = item;
  const setMenu = useMenuStore((state) => state.setMenu);
  const menu = useMenuStore((state) => state.menu);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleClick = () => {
    if(isActive) { return }
    const newMenu = menu.map(item => { 
        if(item.name === name) {
            // @ts-ignore
            const icon = React.cloneElement(item.icon, { className: activeClass });
            return { ...item, icon, isActive: true }
        }
        return item
    });
    setMenu(newMenu);
  };

  // 基础内容组件
  const Content = () => (
    <div className="flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-violet-500 hover:text-white hover:box-shadow-lg" onClick={handleClick}>
      {icon}
      <span className={isActive ? '' : 'text-gray-400'}>{name}</span>
    </div>
  );

  if (!isClient) {
    return <Content />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-violet-500 hover:text-white"
    >
      <Content />
    </div>
  );
}

export default MenuItem;
