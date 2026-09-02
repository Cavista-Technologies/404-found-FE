import type { LookUp } from "@/types/DropdownOptions";
import { httpClient } from "./httpClient";

export const fetchDepartments = async (): Promise<LookUp[]> => {
  return await httpClient.get<LookUp[]>("/lookups/departments");
};