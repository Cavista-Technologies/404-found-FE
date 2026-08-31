import type React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

interface SingleAreaChartDataProps {
  data: { [key: string]: string | number }[];
  title: string;
  labelKey: string;
  valueKey: string;
  className?: string;
  titleClassName?: string;
  loading?: boolean;
  leftMargin?: number;
}

export const SingleAreaChart: React.FC<SingleAreaChartDataProps> = ({
  className,
  title,
  titleClassName,
  loading,
  labelKey,
  valueKey,
  data
}) => {
  return (
    <div
      className={`rounded-2xl border border-primary-50 bg-white overflow-hidden flex flex-col ${className}`}
    >
      <div className="border-b border-grey-200 px-4 py-3">
        <h3 className={titleClassName}>{title}</h3>
      </div>

      <div className="min-h-64 p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="h-78.25">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#00AB3A" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#EEF2FF" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey={labelKey}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={valueKey}
                  stroke="#00AB3A"
                  strokeWidth={2}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
