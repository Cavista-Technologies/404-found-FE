import { DashboardCards } from "@/components/cards/DashboardCards";
import { Briefcase02, CheckmarkSquare01, UserGroup } from "@/components/icons";

export const RecruiterDashboard = () => {
  const cards = [
    {
      id: "open",
      icon: (
        <div className="size-8 bg-warning-50 rounded-lg flex items-center justify-center">
          <Briefcase02 className="text-warning-500 size-4" />
        </div>
      ),
      title: "My Open Roles",
      //   value: snapShotData?.openRoles ?? 0,
      value: 3,
      bottomText: "Currently Active",
    },
    {
      id: "applicants",
      icon: (
        <div className="size-8 bg-success-50 rounded-lg flex items-center justify-center">
          <UserGroup className="text-success-500 size-4" />
        </div>
      ),
      title: "Active Candidates",
      //   value: snapShotData?.averageTimeToFillDays ?? 0,
      value: 10,
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
      //   value: snapShotData?.rolesFilledThisQuarter ?? 0,
      value: 1,
      bottomText: "This Quarter",
    },
  ];
  return (
    <div className="w-full">
      <h2 className="text-grey-700 text-2xl font-medium leading-8 mb-4">
        Here's your pipeline for today
      </h2>

      <div className="space-y-8">
        <div className="w-full flex gap-8">
          {cards.map((card) => (
            <DashboardCards
              key={card.title}
              icon={card.icon}
              title={card.title}
              value={card.value}
              bottomText={card.bottomText}
              //   isLoading={snapShotLoading}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white overflow-hidden flex flex-col gap-6">
            <div className="border-b border-grey-200 px-4 py-3">
              <h3 className="text-grey-600 font-medium text-lg leading-7 font-poppins">
                My Roles
              </h3>
            </div>

            <div className="flex flex-col gap-6 px-4">
              {/* {candidateFunnel.map((item) => (
                <RangeComponent
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  total={totalApplicants}
                />
              ))} */}
            </div>
          </div>

          <div className="rounded-2xl bg-white overflow-hidden flex flex-col gap-6">
            <div className="border-b border-grey-200 px-4 py-3">
              <h3 className="text-grey-600 font-medium text-lg leading-7 font-poppins">
                New Applications
              </h3>
            </div>

            <div className="flex flex-col gap-6 px-4">
              {/* {candidateFunnel.map((item) => (
                <RangeComponent
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  total={totalApplicants}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
