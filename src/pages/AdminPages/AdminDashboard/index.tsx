import { DashboardCards } from "@/components/cards/DashboardCards";
import { SingleAreaChart } from "@/components/charts/SingleAreaChart";
import SingleBarChart from "@/components/charts/SingleBarChart";
import {
  Briefcase02,
  CheckmarkSquare01,
  Clock01,
  InformationSquare,
} from "@/components/icons";
import { RangeComponent } from "@/components/rangeComponent/RangeComponent";
import {
  fetchCandidateFunnelStatistics,
  fetchDashboardSnapshotStatistics,
  fetchDashboardTimeToFillTrends,
} from "@/services/adminDashboard.service";
import { useQuery } from "@tanstack/react-query";

interface CandidateFunnelStats {
  applicants: number;
  screened: number;
  interviewed: number;
  offers: number;
  hires: number;
}

export const AdminDashboard = () => {
  const { data: snapShotData, isLoading: snapShotLoading } = useQuery({
    queryKey: ["fetchAdminDashboardSnapshot"],
    queryFn: fetchDashboardSnapshotStatistics,
  });
  const { data: timeToFillData, isLoading: timeToFillLoading } = useQuery({
    queryKey: ["fetchTimeToFillTrends"],
    queryFn: fetchDashboardTimeToFillTrends,
  });
  const { data: candidateFunnelStats } = useQuery({
    queryKey: ["fetchCandidateFunnel"],
    queryFn: fetchCandidateFunnelStatistics,
  });

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

  const cards = [
    {
      id: "open",
      icon: (
        <div className="size-8 bg-warning-50 rounded-lg flex items-center justify-center">
          <Briefcase02 className="text-warning-500 size-4" />
        </div>
      ),
      title: "Open Roles",
      value: snapShotData?.openRoles ?? 0,
      bottomText: "Currently Active",
    },
    {
      id: "filled",
      icon: (
        <div className="size-8 bg-success-50 rounded-lg flex items-center justify-center">
          <CheckmarkSquare01 className="text-success-500 size-4" />
        </div>
      ),
      title: "Roles Filled",
      value: snapShotData?.rolesFilledThisQuarter ?? 0,
      bottomText: "This Quarter",
    },
    {
      id: "averageTime",
      icon: (
        <div className="size-8 bg-info-container rounded-lg flex items-center justify-center">
          <Clock01 className="text-info size-4" />
        </div>
      ),
      title: "Average Time to Fill",
      value: snapShotData?.averageTimeToFillDays ?? 0,
      bottomText: "vs last month",
      addDays: true,
      trend: true,
      trendValue: snapShotData?.timeToFillDeltaVsLastMonth
    },
    {
      id: "atRisk",
      icon: (
        <div className="size-8 bg-error-50 rounded-lg flex items-center justify-center">
          <InformationSquare className="text-error-500 size-4.5" />
        </div>
      ),
      title: "At Risk",
      value: snapShotData?.atRiskCount ?? 0,
      bottomText: "Role(s)",
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-grey-700 text-2xl font-medium leading-8 mb-4">
        Hiring portfolio snapshot
      </h2>

      <div className="space-y-8">
        <div className="w-full flex gap-8">
          {cards.map((card) => (
            <DashboardCards
              key={card.title}
              icon={card.icon}
              title={card.title}
              value={card.value}
              addDays={card.addDays}
              bottomText={card.bottomText}
              trend={card.trend}
              trendValue={card.trendValue}
              isLoading={snapShotLoading}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="rounded-2xl bg-white overflow-hidden flex flex-col gap-6">
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
        </div>
      </div>
    </div>
  );
};
