import type { CreateNewRoleSchema } from "@/schemas";
import type z from "zod";

export type CreateNewRoleFormInput = z.input<typeof CreateNewRoleSchema>
export type CreateNewRoleFormOutput = z.output<typeof CreateNewRoleSchema>