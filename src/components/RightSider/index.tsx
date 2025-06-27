"use client";
import { useMenuStore } from "@/store/menuStore";
import TabItem from "../TabItem";
import { useMemo, useLayoutEffect, useState } from "react";
import classNames from "classnames";
import { DndContext, DragEndEvent, useSensor, PointerSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

function RightSider() {
  const menu = useMenuStore((state) => state.menu);
  const setMenu = useMenuStore((state) => state.setMenu);
  const activeMenu = useMemo(() => {
    return menu.filter((item) => item.isActive);
  }, [menu]);
  const size = activeMenu.length + '';
  const gridStyle = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = menu.findIndex((item) => item.name === active.id);
      const newIndex = menu.findIndex((item) => item.name === over.id);
      
      const newMenu = arrayMove(menu, oldIndex, newIndex);
      setMenu(newMenu);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={activeMenu.map(item => item.name)}>
        <div
          className={classNames(
            // @ts-ignore
            "w-full grid divide-x divide-gray-300", gridStyle[size]
          )}
        >
          {activeMenu.map((item) => (
            <TabItem key={item.name} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default RightSider;
