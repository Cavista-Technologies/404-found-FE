import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import CustomTooltip from "../tooltip/customTooltip";

interface SingleBarChartDataProps {
  data: { [key: string]: string | number }[];
  title: string;
  labelKey: string;
  valueKey: string;
  className?: string;
  titleClassName?: string;
  loading?: boolean;
  noCartesianGrid?: boolean;
  leftMargin?: number;
}

const BarChartSkeleton = () => (
  <div className="h-75 flex items-end justify-between gap-2 px-6 pb-6 w-full">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="flex-1 bg-grey-100 animate-pulse rounded-t-sm"
        style={{ height: `${Math.random() * 180 + 40}px` }}
      />
    ))}
  </div>
);

const SingleBarChart: React.FC<SingleBarChartDataProps> = ({
  data,
  title,
  labelKey,
  valueKey,
  className = "",
  titleClassName = "text-grey-600 font-medium text-lg leading-7 font-poppins",
  loading,
  leftMargin = 16,
  noCartesianGrid = false
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <div
      className={`rounded-2xl bg-white overflow-hidden flex flex-col ${className}`}
    >
      <div className="border-b border-grey-200 px-4 py-3">
        <h3 className={titleClassName}>{title}</h3>
      </div>

      {/* Chart */}
      {loading ? (
        <BarChartSkeleton />
      ) : (
        <div className="flex-1 py-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 0, right: 12, left: leftMargin, bottom: 10 }}
              onMouseLeave={() => setActiveIndex(null)}
            >

              {!noCartesianGrid &&
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e9e8e8"
                // vertical={false}
              />
              }
              <XAxis
                dataKey={labelKey}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#7A7172", fontFamily: "Poppins" }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#7A7172", fontFamily: "Poppins" }}
                tickFormatter={(value) => value.toLocaleString()}
                width={40}
                domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.05)]}
              />
              {/* <Tooltip content={<CustomTooltip />} cursor={false} /> */}
              <Tooltip cursor={false} />
              <Bar
                dataKey={valueKey}
                radius={[4, 4, 0, 0]}
                maxBarSize={80}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                isAnimationActive={false}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      activeIndex === null || activeIndex === index
                        ? "#0F973D"
                        : "#e9bbc3"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SingleBarChart;
