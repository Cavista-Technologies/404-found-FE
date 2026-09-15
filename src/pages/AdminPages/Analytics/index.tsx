import { useState } from "react";
import { DropdownInput } from "@/components/GenericComponents/DropdownInput";
import { buildDropdownOptions } from "@/constants/Helpers";
import { fetchDepartments } from "@/services/lookup.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import SingleBarChart from "@/components/charts/SingleBarChart";
import { SingleAreaChart } from "@/components/charts/SingleAreaChart";
import {
  fetchCandidateFunnelStatistics,
  fetchConversionByChannel,
  fetchDashboardTimeToFillTrends,
} from "@/services/adminDashboard.service";
import { RangeComponent } from "@/components/rangeComponent/RangeComponent";
import {
  TableComponent,
  type Column,
} from "@/components/GenericComponents/TableComponents";
import type { ConversionTableValues } from "@/types/Analytics";
import { cn } from "@/lib/utils";
import { exportTabAsPDF } from "@/lib/exportReportPdf";
import { ReportPdfHeader } from "@/components/ReportHeader";

interface CandidateFunnelStats {
  applicants: number;
  screened: number;
  interviewed: number;
  offers: number;
  hires: number;
}

export const AnalyticsAndInsights = () => {
  const [department, setDepartment] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  const { data: DepartmentList = [], isLoading: departmentLoading } = useQuery({
    queryKey: ["getDepartments"],
    queryFn: fetchDepartments,
  });

  const { data: timeToFillData, isLoading: timeToFillLoading } = useQuery({
    queryKey: ["fetchTimeToFillTrends"],
    queryFn: fetchDashboardTimeToFillTrends,
  });
  const { data: candidateFunnelStats } = useQuery({
    queryKey: ["fetchCandidateFunnel"],
    queryFn: fetchCandidateFunnelStatistics,
  });
  const { data: conversionData } = useQuery({
    queryKey: ["fetchConversion"],
    queryFn: fetchConversionByChannel,
  });

  const conversionStats = conversionData?.channels ?? [];
  const conversionInsight = conversionData?.insight ?? null;

  const funnelStageMap: {
    key: keyof CandidateFunnelStats;
    title: string;
  }[] = [
    { key: "applicants", title: "Applicants" },
    { key: "screened", title: "Screened" },
    { key: "interviewed", title: "Interviewed" },
    { key: "offers", title: "Offers" },
    { key: "hires", title: "Hires" },
  ];

  const candidateFunnel = funnelStageMap.map(({ key, title }) => ({
    title,
    value: candidateFunnelStats?.[key] ?? 0,
  }));

  const totalApplicants = candidateFunnelStats?.applicants ?? 0;

  const monthlyTimeToFillTrend = timeToFillData?.monthlyTrend ?? [];
  const departmentTimeToFillTrend = timeToFillData?.byDepartment ?? [];

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);

    const elementId = "talent-acquisition-metrics";
    const filename = "CT-Recruita Report.pdf";

    await exportTabAsPDF(elementId, filename);
    setIsExporting(false);
  };

  const columns: Column<ConversionTableValues>[] = [
    {
      header: "Source",
      accessor: "sourceStr",
    },
    {
      header: "Applied",
      accessor: "applied",
    },
    {
      header: "Hired",
      accessor: (data) => (
        <span
          className={cn(data.hired > 0 ? "text-success-500" : "text-grey-600")}
        >
          {data.hired}
        </span>
      ),
    },
    {
      header: "Conversion Rate",
      accessor: (data) => (
        <span
          className={cn(
            data.conversionRate > 0 ? "text-success-500" : "text-grey-600",
          )}
        >
          {data.conversionRate}%
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl text-grey-700 font-medium">
            Analystics &amp; Insights
          </h2>
          <p className="text-sm text-grey-600">
            Deep-dive into pipeline performance, bottlenecks, and source
            effectiveness
          </p>
        </div>

        <div className="flex gap-4">
          <DropdownInput
            placeholder="All Departments"
            value={department}
            dropDownValues={buildDropdownOptions(
              DepartmentList,
              "All Departments",
            )}
            loading={departmentLoading}
            onValueChange={(value) => {
              setDepartment(value);
            }}
          />

          <Button variant="default" size="sm" onClick={handleExport}>
            Export Report
          </Button>
        </div>
      </div>

      <div id="talent-acquisition-metrics">
        <ReportPdfHeader tabLabel="Talent Acquisition Metrics" />
        <div className="grid grid-cols-2 gap-8">
          <SingleAreaChart
            title="Time to fill trends: 6 months"
            titleClassName="text-grey-600 font-medium font-poppins text-lg leading-7"
            data={monthlyTimeToFillTrend}
            labelKey="month"
            valueKey="averageDays"
            loading={timeToFillLoading}
          />
          <SingleBarChart
            title="Average Time to fill by departments"
            data={departmentTimeToFillTrend}
            labelKey="department"
            valueKey="averageDays"
            noCartesianGrid
            titleClassName="text-grey-600 font-medium font-poppins text-lg leading-7"
            loading={timeToFillLoading}
          />

          <div className="rounded-2xl bg-white overflow-hidden flex flex-col gap-6 h-fit pb-10">
            <div className="border-b border-grey-200 px-4 py-3">
              <h3 className="text-grey-600 font-medium text-lg leading-7 font-poppins">
                Candidate Funnel
              </h3>
            </div>

            <div className="flex flex-col gap-6 px-4">
              {candidateFunnel.map((item) => (
                <RangeComponent
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  total={totalApplicants}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white overflow-hidden flex flex-col gap-6 h-fit">
            <div className="border-b border-grey-200 px-4 py-3">
              <h3 className="text-grey-600 font-medium text-lg leading-7 font-poppins">
                Conversion rate: Applied → Hired by channel
              </h3>
            </div>

            <div className="px-4">
              <TableComponent
                data={conversionStats}
                columns={columns}
                // loading={isLoadingUsers}
                emptyMessage="No Data Yet"
                emptySubMessage="No data to show yet"
                loadingRows={10}
                headerClassName="bg-grey-100 text-right"
                showPagination={false}
              />
              {conversionInsight && (
                <div className="bg-success-50 p-4 rounded-lg my-8">
                  <p className="text-success-500 text-sm">
                    {conversionInsight}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
