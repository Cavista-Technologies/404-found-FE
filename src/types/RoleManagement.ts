import type { CreateNewRoleSchema } from "@/schemas";
import type z from "zod";

export type CreateNewRoleFormInput = z.input<typeof CreateNewRoleSchema>;
export type CreateNewRoleFormOutput = z.output<typeof CreateNewRoleSchema>;

export interface RolesTableValues {
  id: number;
  title: string;
  department: string;
  employmentType: number;
  employmentTypeStr: string;
  status: number;
  statusStr: string;
  priority: number;
  priorityStr: string;
  numberOfOpenings: number;
  slaTargetDays: number;
  targetHireDate: string;
  slaPercent: number;
  recruiterName: string;
  recruiterEmail: string | null;
  hiringManagerName: string;
  hiringManagerEmail: string;
  salaryRange: string | null;
  location: string | null;
  applicantsCount: number;
}

export interface RoleDetails {
  id: number;
  title: string;
  department: string;
  employmentType: number;
  employmentTypeStr: string;
  status: number;
  statusStr: string;
  priority: number;
  priorityStr: string;
  numberOfOpenings: number;
  slaTargetDays: number;
  targetHireDate: string;
  slaPercent: number;
  recruiterName: string;
  recruiterEmail: string;
  hiringManagerName: string;
  hiringManagerEmail: string;
  salaryRange: string;
  location: string;
  applicantsCount: number;
  hasApplicationForm: boolean;
  applicationFormId: number;
  applicationFormSlug: string;
  applicationFormStatus: number;
  applicationFormStatusStr: string;
}
