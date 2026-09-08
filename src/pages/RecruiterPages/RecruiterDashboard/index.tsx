import { DashboardCards } from "@/components/cards/DashboardCards";
import { Briefcase02, CheckmarkSquare01, UserGroup } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarInitials } from "@/constants/Helpers";
import { Link } from "react-router-dom";

interface MyRoleComponentProps {
  roleName: string;
  candidates: number;
  hiringDate: string;
}
interface ApplicationComponentProps {
  candidateName: string;
  candidateEmail: string;
  role: string;
  date: string;
}

const MyRoleComponent = ({
  roleName,
  candidates,
  hiringDate,
}: MyRoleComponentProps) => {
  return (
    <div className="border border-grey-200 rounded-2xl p-4 space-y-2">
      <p className="text-grey-700 text-lg font-medium">{roleName}</p>
      <div className="flex gap-10 text-sm text-grey-500">
        <p>{candidates} candidate</p>
        <p>Target Hire Date: {hiringDate}</p>
      </div>
    </div>
  );
};

const ApplicationComponent = ({
  candidateName,
  candidateEmail,
  role,
  date,
}: ApplicationComponentProps) => {
  return (
    <div className="border border-grey-200 rounded-2xl p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Avatar className="bg-primary text-white font-poppins">
          <AvatarImage src="" />
          <AvatarFallback>
            {getAvatarInitials(candidateName ?? "")}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <p className="text-grey-600 text-sm leading-5">{candidateName}</p>
          <p className="text-xs text-grey-500 leading-3.5">{candidateEmail}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-grey-500 text-xs leading-3.5">
          Applied to <span className="lowercase">{role}</span>
        </p>
        <p className="text-xs text-warning-500 leading-3.5">{date}</p>
      </div>
    </div>
  );
};

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

  const myRoles = [
    { roleName: "Product Owner", candidates: 3, hiringDate: "23-06-2026" },
    {
      roleName: "Product Cordinator",
      candidates: 10,
      hiringDate: "21-06-2027",
    },
    { roleName: "Backend Engineer", candidates: 10, hiringDate: "20-03-2024" },
  ];
  const newApplications = [
    { candidateName: "Felixx Ohai", candidateEmail: "fohai@mail.com", role: "Senior Backend Engineer", date: "2 days ago" },
    { candidateName: "Felixx Ohai", candidateEmail: "fohai@mail.com", role: "Senior Backend Engineer", date: "2 days ago" },
    { candidateName: "Felixx Ohai", candidateEmail: "fohai@mail.com", role: "Senior Backend Engineer", date: "2 days ago" },
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
            <div className="border-b border-grey-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-grey-600 font-medium text-lg leading-7 font-poppins">
                My Roles
              </h3>

              <Link
                to={"/dashboard/recruiter/my-roles"}
                className="text-sm text-primary-500 font-medium"
              >
                View More
              </Link>
            </div>

            <div className="px-4 space-y-4 pb-6">
              {myRoles.map((role) => (
                <MyRoleComponent
                  roleName={role.roleName}
                  candidates={role.candidates}
                  hiringDate={role.hiringDate}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white overflow-hidden flex flex-col gap-6">
            <div className="border-b border-grey-200 px-4 py-3 flex gap-2 items-center">
              <h3 className="text-grey-600 font-medium text-lg leading-7 font-poppins">
                New Applications
              </h3>
              <span className="text-white bg-primary-500 px-2 rounded-xl">
                4
              </span>
            </div>

            <div className="space-y-4 px-4 pb-6">
              {newApplications.map((applicant) => (
                <ApplicationComponent
                  candidateName={applicant.candidateName}
                  candidateEmail={applicant.candidateEmail}
                  role={applicant.role}
                  date={applicant.date}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
