import * as z from "zod"
import type { ForgotPasswordSchema, LoginSchema } from "../schemas";

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;