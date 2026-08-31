import { DashboardCards } from "@/components/cards/DashboardCards";
import { SingleAreaChart } from "@/components/charts/SingleAreaChart";
import SingleBarChart from "@/components/charts/SingleBarChart";
import {
  Briefcase02,
  CheckmarkSquare01,
  Clock01,
  InformationSquare,
} from "@/components/icons";

export const AdminDashboard = () => {
  const cards = [
    {
      id: "open",
      icon: (
        <div className="size-8 bg-warning-50 rounded-[8px] flex items-center justify-center">
          <Briefcase02 className="text-warning-500 size-4" />
        </div>
      ),
      title: "Open Roles",
      //   value: statistics?.totalUsers ?? 0,
      value: 0,
      bottomText: "Currently Active",
    },
    {
      id: "filled",
      icon: (
        <div className="size-8 bg-success-50 rounded-[8px] flex items-center justify-center">
          <CheckmarkSquare01 className="text-success-500 size-4" />
        </div>
      ),
      title: "Role Filled",
      //   value: statistics?.activeUsers ?? 0,
      value: 0,
      bottomText: "This Quarter",
    },
    {
      id: "averageTime",
      icon: (
        <div className="size-8 bg-info-container rounded-[8px] flex items-center justify-center">
          <Clock01 className="text-info size-4" />
        </div>
      ),
      title: "Average Time to Fill",
      //   value: statistics?.deactivatedUsers ?? 0,
      value: 0,
      bottomText: "vs last month",
    },
    {
      id: "atRisk",
      icon: (
        <div className="size-8 bg-error-50 rounded-[8px] flex items-center justify-center">
          <InformationSquare className="text-error-500 size-4.5" />
        </div>
      ),
      title: "At Risk",
      //   value: statistics?.pendingInvitations ?? 0,
      value: 0,
      bottomText: "Role(s)",
    },
  ];
  const averageTimeToFillByDepartment = [
    { department: "Engineering", averageDays: 42 },
    { department: "Product", averageDays: 35 },
    { department: "People", averageDays: 28 },
    { department: "Creative", averageDays: 31 },
    { department: "Operations", averageDays: 24 },
  ];

  const timeToFillTrends = [
    { month: "Aug", timeToFill: 42 },
    { month: "Mar", timeToFill: 35 },
    { month: "Sep", timeToFill: 28 },
    { month: "Jul", timeToFill: 31 },
    { month: "Dec", timeToFill: 24 },
    { month: "Jan", timeToFill: 24 },
  ];

  return (
    <div className="border border-primary w-full">
      <h2 className="text-grey-700 text-2xl font-medium leading-8 mb-4">
        Hiring portfolio snapshot
      </h2>

      <div className="space-y-8">
        <div className="w-full flex gap-8">
          {cards.map((card) => (
            <DashboardCards
              icon={card.icon}
              title={card.title}
              value={card.value}
              bottomText={card.bottomText}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SingleAreaChart
            title="Time to fill trends: 6 months"
            titleClassName="text-grey-600 font-medium font-poppins text-lg leading-7"
            data={timeToFillTrends}
            labelKey="month"
            valueKey="timeToFill"
          />
          <SingleBarChart
            title="Average Time to fill by departments"
            data={averageTimeToFillByDepartment}
            labelKey="department"
            valueKey="averageDays"
            noCartesianGrid
            titleClassName="text-grey-600 font-medium font-poppins text-lg leading-7"
            //   loading={chartsLoading}
          />
        </div>
      </div>
    </div>
  );
};
