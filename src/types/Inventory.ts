import { ENUMS } from "enums/enums";
import { Company } from "./Company";
import { Project } from "./Project";

export interface Inventory {
  id: string;
  type: typeof ENUMS.INVENTORY_TYPE;
  project_info: { id: string; name: string };
  items_count: number;
  items_value: number;
  company: Company;
  project: Project;
  items: InventoryItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  id: string;
  name: string;
  code: string | null;
  price: number;
  total_value: number;
  count: number;
  thumbnail: string | null;
  inventory: Inventory;
  createdAt: Date;
  updatedAt: Date;
}
