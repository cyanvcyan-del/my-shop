import { ReactNode } from "react";
import MainDish from "../app/components/svg/Main-dish";
import CraftedBeverages from "../app/components/svg/Crafted-Beverages";
import Fastfood from "../app/components/svg/Fast-food";
import SoftDrinks from "../app/components/svg/Soft-Drinks";
import SushiRolls from "../app/components/svg/Sushi-Rolls";
import SweetTreats from "../app/components/svg/Sweet-Treats";


export interface MenuItem {
  id: number;
  title: string;
  icon: ReactNode;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Main Dish",
    icon: <MainDish />
    
  },
  {
    id: 2,
    title: "Fast Food",
    icon:<Fastfood />

  },
  {
    id: 3,
    title: "Beverages",
    icon:<CraftedBeverages />

  },
  {
    id: 4,
    title: "Sweet Treats",
    icon:<SweetTreats />

  },
  {
    id: 5,
    title: "Sushi & Rolls",
    icon:<SushiRolls />

  },
  {
    id: 6,
    title: "Soft Drinks",
    icon:<SoftDrinks/>

  }

];

// تابع fake API
export async function fetchMenu(): Promise<MenuItem[]> {
  // شبیه‌سازی درخواست به سرور
  await new Promise(resolve => setTimeout(resolve, 500));
  return menuItems;
}