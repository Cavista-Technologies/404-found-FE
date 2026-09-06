import { useQuery } from "@tanstack/react-query";
import { getPublicApplicationForm } from "@/services/applicationForm.service";

export function usePublicApplicationForm(slug: string | undefined) {
  return useQuery({
    queryKey: ["application-form", "public", slug],
    queryFn: () => getPublicApplicationForm(slug as string),
    enabled: Boolean(slug),
    retry: 1,
  });
}
