export const builderQueryParams = (params: Record<string, any>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value?.length != 0
    ) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          searchParams.append(key, v.toString());
        });
      } else {
        searchParams.append(key, value);
      }
    }
  });

  return searchParams.toString();
};

export const capitalizeName = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getAvatarInitials = (fullName: string): string => {
  if (!fullName) return "";

  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) return "";

  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (first + last).toUpperCase();
};

export const formatCurrentDate = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const buildDropdownOptions = (
  options: { id: number | string; name: string }[],
  placeholderValue: string,
) => [
  { id: "all", name: placeholderValue },
  ...options.map((d) => ({ id: String(d.id), name: d.name })),
];

export const getUrgencyStyle = (urgency: string) => {
  switch (urgency) {
    case "Urgent":
      return "bg-primary-50 text-primary";
    case "Normal":
      return "bg-info-container text-info";
    case "Emergency":
      return "bg-error-50 text-error-600";
    default:
      return "bg-grey-50 text-grey-500";
  }
};export const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-error-50 text-error-500";
    case "Normal":
      return "bg-warning text-warning";
    case "Low":
      return "bg-success-50 text-success-600";
    default:
      return "bg-grey-50 text-grey-500";
  }
};
