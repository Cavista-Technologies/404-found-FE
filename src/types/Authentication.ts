import * as z from "zod"
import type { LoginSchema } from "../schemas";

export type LoginFormValues = z.infer<typeof LoginSchema>;