export const EmploymentTypeOptions = [
  {
    name: "Full-time",
    id: "1",
  },
  {
    name: "Part-time",
    id: "2",
  },
  {
    name: "Contract",
    id: "3",
  },
  {
    name: "Internship",
    id: "4",
  },
  {
    name: "Temporary",
    id: "5",
  },
];

export const PriorityLevelOptions = [
  {
    name: "Low",
    id: "1",
  },
  {
    name: "Normal",
    id: "2",
  },
  {
    name: "High",
    id: "3",
  },
];

export const JobStatusOptions = [
  {
    name: "Draft",
    id: "1",
  },
  {
    name: "Open",
    id: "2",
  },
  {
    name: "Closed",
    id: "4",
  },
  {
    name: "Filled",
    id: "5",
  },
];

export const SourceOptions = [
  { name: "Direct", id: "1" },
  { name: "LinkedIn", id: "2" },
  { name: "CareersPage", id: "3" },
  { name: "Indeed", id: "4" },
  { name: "Referral", id: "5" },
  { name: "Twitter", id: "6" },
  { name: "Email", id: "7" },
  { name: "Other", id: "8" },
];

export const STAGE_OPTIONS = [
  { id: "1", name: "Applied" },
  { id: "2", name: "Screen" },
  { id: "3", name: "Interview" },
  { id: "4", name: "Offer" },
  { id: "5", name: "Hired" },
  { id: "6", name: "Rejected" },
  { id: "7", name: "Withdrawn" },
];

export const STAGE_COLORS: Record<number, string> = {
  1: "text-grey-600", // Applied
  2: "text-info", // Screen
  3: "text-[#DD900D]", // Interview
  4: "text-[#0D9488]", // Offer
  5: "text-[#16A34A]", // Hired
  6: "text-[#B9243C]", // Rejected
  7: "text-[#A8A3A4]", // Withdrawn
};
 
export const REJECTED_STAGE = 6;
export const TERMINAL_STAGES = new Set<number>([5, 6, 7]);
 
export interface BoardColumn {
  value: number;
  label: string;
  columnBg: string;
  columnBorder: string;
}
 
// Board column order + backgrounds, taken directly from the Figma file.
// Only Applied-Hired have columns in the design — Rejected/Withdrawn
// candidates (stage 6/7) won't have a column to land in if the pipeline
// endpoint ever returns them here. Flag if that needs a column too.
export const PIPELINE_BOARD_COLUMNS: BoardColumn[] = [
  { value: 1, label: "Applied", columnBg: "#FCFCFC", columnBorder: "#E9E8E8" },
  // { value: 2, label: "Screen", columnBg: "#F0F1FE", columnBorder: "#C5C8FC" },
  { value: 3, label: "Interview", columnBg: "#FDF9F1", columnBorder: "#F4DDB4" },
  { value: 4, label: "Offer", columnBg: "#F0F1FE", columnBorder: "#C5C8FC" },
  { value: 5, label: "Hired", columnBg: "#F4FAF6", columnBorder: "#B5DFC3" },
];