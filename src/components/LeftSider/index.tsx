"use client";
import { useMenuStore } from "@/store/menuStore";
import MenuItem from "../MenuItem";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

function LeftSider() {
  const { menu, setMenu } = useMenuStore();
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
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={menu.map(item => item.name)}>
        <div className="w-[100px] py-4 pt-0 h-screen flex flex-col gap-6 content-center shadow-lg">
          {menu.map((item) => (
            <MenuItem key={item.name} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default LeftSider;
