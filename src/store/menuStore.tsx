import { create } from "zustand";
import {
  MapIcon,
  MusicalNoteIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";
import { MenuStore } from "./types";
import React from "react";

export const activeClass = "size-6";
export const inactiveClass = "size-6 text-gray-400";

const defaultMenu = [
  {
    name: "Map",
    icon: <MapIcon className={activeClass} />,
    isActive: true,
  },
  {
    name: "Music",
    icon: <MusicalNoteIcon className={activeClass} />,
    isActive: true,
  },
  {
    name: "Chat",
    icon: <ChatBubbleLeftIcon className={activeClass} />,
    isActive: true,
  },
];

export const useMenuStore = create<MenuStore>((set, get) => ({
  menu: defaultMenu,
  setMenu: (menu) => set({ menu }),
  closeMenu: (name) => {
    const menu = get().menu;
    const newMenu = menu.map((item) => {
      if (item.name === name) {
        // @ts-ignore
        const icon = React.cloneElement(item.icon, { className: inactiveClass });
        return { ...item, icon, isActive: false };
      }
      return item;
    });
    set({ menu: newMenu });
  },
}));
