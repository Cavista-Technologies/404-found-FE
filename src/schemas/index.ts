import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .check(z.email({ error: "Enter a valid email address" })),
});

export const CreateNewRoleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z
    .string()
    .min(1, "Please select an employment type")
    .transform((val) => Number(val)),
  priority: z
    .string()
    .min(1, "Please select priority level")
    .transform((val) => Number(val)),
  departmentId: z
    .string()
    .min(1, "Please select a department")
    .transform((val) => Number(val)),
  recruiterName: z.string().min(1, "Recruiter name is required"),
  recruiterEmail: z.string().min(1, "Recruiter email is required"),
  hiringManagerName: z.string().min(1, "Hiring manager name is required"),
  hiringManagerEmail: z.string().min(1, "Hiring manager email is required"),
  numberOfOpenings: z
    .string()
    .min(1, "Number of openings cannot be empty")
    .transform((val) => Number(val)),
  slaTargetDays: z
    .string()
    .min(1, "SLA Target days cannot be empty")
    .transform((val) => Number(val)),
  targetHireDate: z.date({ error: "Target hire date is required" }),
  salaryRange: z.string().optional(),
  reason: z.string().min(1, "Reason for opening is required"),
  activate: z.boolean().default(false),
});
