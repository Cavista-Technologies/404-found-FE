import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import React from "react";
// import CustomPieTooltip from "../tooltip/customPieTooltip";

interface DoughnutPieChartProps {
  data: { name: string; value: number }[];
  title?: string;
  colors?: string[];
  titleFont?: string;
  chartSizeClass?: string;
}

const defaultColors = [
  "#B9243C",
  "#661421",
  "#d06c7c",
  "#df9aa5",
  "#e9bbc3",
  "#f8e9ec",
];

const EmptyDonut = () => (
  <div className="h-40 w-40 rounded-full border-4 border-grey-100 animate-pulse flex items-center justify-center mx-auto" />
);

const DoughnutPieChart: React.FC<DoughnutPieChartProps> = ({
  data,
  title,
  colors = defaultColors,
  titleFont = "text-grey-900 font-semibold font-poppins text-sm",
  chartSizeClass = "w-[279px] h-[279px]",
}) => {
  const isEmpty = !data || data.length === 0;
  const total = data?.reduce((sum, item) => sum + item.value, 0) ?? 0;

  return (
    <div className="rounded-2xl border border-primary-50 bg-white w-full overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-grey-200 px-4 py-3">
        <h3 className={titleFont}>{title}</h3>
      </div>

      <div className="flex flex-col items-center gap-6 px-6 py-6 md:flex-row md:items-center flex-1 min-h-0">
        <div
          className={`shrink-0 ${chartSizeClass} flex items-center justify-center`}
        >
          {isEmpty ? (
            <div className="h-full w-full flex items-center justify-center">
              <EmptyDonut />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="75%"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                {/* <Tooltip content={<CustomPieTooltip total={total} />} /> */}
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full md:flex-1 md:min-w-0">
          {isEmpty ? (
            <p className="text-grey-400 text-sm font-poppins">
              No data available
            </p>
          ) : (
            data.map((entry, index) => {
              const percent = (
                (entry.value / (total === 0 ? 1 : total)) *
                100
              ).toFixed(0);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3"
                >
                  {/* Color dot + name */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{
                        backgroundColor: colors[index % colors.length],
                      }}
                    />
                    <span className="text-grey-500 text-sm font-poppins truncate">
                      {entry.name}
                    </span>
                  </div>
                  {/* Percentage */}
                  <span className="text-grey-900 text-sm font-semibold font-poppins shrink-0">
                    {percent}%
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DoughnutPieChart;
