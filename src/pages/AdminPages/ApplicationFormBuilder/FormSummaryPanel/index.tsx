interface FormSummaryPanelProps {
  total: number;
  required: number;
  optional: number;
}

export const FormSummaryPanel = ({ total, required, optional }: FormSummaryPanelProps) => {
  const rows = [
    { label: "Total fields", value: total },
    { label: "Required", value: required },
    { label: "Optional", value: optional },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-grey-600 text-lg font-medium">Form Summary</p>
      <div className="flex flex-col gap-4 w-full">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between w-full text-base">
            <p className="text-grey-600">{row.label}</p>
            <p className="text-grey-600">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
