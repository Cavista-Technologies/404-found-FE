import {
  DashboardSquare01,
  UserSettings01,
  PlusIcon,
  VueSaxLinearDiagram,
  LeftToRightListBullet,
} from "@/components/icons";
import type { SVGProps } from "react";

export type UserRole = "SuperAdmin" | "Recruiter";

export type AccountType = 1 | 2 | 3 | 4;

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  roles?: UserRole;
  accountTypes?: AccountType[];
  children?: MenuItem[];
  badgeCount?: number;
}

export const menuItems: MenuItem[] = [
  /** ADMIN DASHBOARD **/
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: DashboardSquare01,
    roles: "SuperAdmin",
  },
  {
    name: "Create Role",
    path: "/dashboard/admin/create-role",
    icon: PlusIcon,
    roles: "SuperAdmin",
  },
  {
    name: "Roles",
    path: "/dashboard/admin/roles",
    icon: LeftToRightListBullet,
    roles: "SuperAdmin",
  },
  {
    name: "Analytics",
    path: "/dashboard/admin/analytics",
    icon: VueSaxLinearDiagram,
    roles: "SuperAdmin",
  },
  {
    name: "Profile Settings",
    path: "/dashboard/admin/profile-settings",
    icon: UserSettings01,
    roles: "SuperAdmin",
  },

  /** RECRUITER DASHBOARD **/
  {
    name: "Dashboard",
    path: "/dashboard/recruiter",
    icon: DashboardSquare01,
    roles: "Recruiter",
  },
  {
    name: "Create Role",
    path: "/dashboard/recruiter/create-role",
    icon: PlusIcon,
    roles: "Recruiter",
  },
  {
    name: "My Roles",
    path: "/dashboard/recruiter/my-roles",
    icon: LeftToRightListBullet,
    roles: "Recruiter",
  },
  {
    name: "Profile Settings",
    path: "/dashboard/recruiter/profile-settings",
    icon: UserSettings01,
    roles: "Recruiter",
  },
];
