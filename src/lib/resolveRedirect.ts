export function resolveRedirect(role: string): string {
  if (role === "SuperAdmin") return "/dashboard/admin";
  if (role === "Recruiter") return "/dashboard/recruiter";
  return "/login";
}