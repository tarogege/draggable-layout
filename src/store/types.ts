export interface MenuItem {
    name: string;
    icon: React.ReactNode;
    isActive: boolean;
  }
  
 export interface MenuStore {
    menu: MenuItem[];
    setMenu: (menu: MenuItem[]) => void;
    closeMenu: (name: string) => void;
  }