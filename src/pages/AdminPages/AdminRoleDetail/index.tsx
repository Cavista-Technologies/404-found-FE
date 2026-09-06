import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowLeft02 } from "@/components/icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchRoleDetails } from "@/services/roleManagement.service";
import { cn } from "@/lib/utils";
import {
  formatDateTime,
  getJobStatusStyle,
  getPriorityStyle,
} from "@/constants/Helpers";
import { Button } from "@/components/ui/button";
import { RangeComponent } from "@/components/rangeComponent/RangeComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarInitials } from "@/constants/Helpers";
import { useState } from "react";
import { PipelineTab } from "./PipelineTab";
import { ApplicantsTab } from "./ApplicantsTab";
import { TimelineTab } from "./TimelineTab";
import { Skeleton } from "@/components/ui/skeleton";

type RoleDetailTab = "pipeline" | "applicants" | "timeline";

export const RoleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<RoleDetailTab>("pipeline");
  const navigate = useNavigate();

  // const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { data: role, isLoading: roleDetailsLoading } = useQuery({
    queryKey: ["fetchRoleDetails"],
    queryFn: () => fetchRoleDetails(id as string),
    enabled: !!id,
  });
  console.log(id);

  const tabs: { key: RoleDetailTab; label: string; count: number }[] = [
    { key: "pipeline", label: "Pipeline", count: 4 },
    { key: "applicants", label: "Applicants", count: 5 },
  ];

  return (
    <div className="w-full">
      <Link
        to={"/dashboard/admin/roles"}
        className="text-info text-base leading-6 flex items-center gap-1.5"
      >
        <ArrowLeft02 />
        <span>Back to Roles</span>
      </Link>

      <Card className="mt-6">
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-4">
              {roleDetailsLoading ? (
                <Skeleton className="w-100 h-10" />
              ) : (
                <div className="flex gap-6 items-center">
                  <h2 className="text-grey-800 text-[28px] font-medium">
                    {role?.title}
                  </h2>
                  <div className="flex gap-4">
                    <p
                      className={cn(
                        getJobStatusStyle(role?.statusStr ?? ""),
                        "py-0.75 px-2 rounded-4xl h-fit w-fit",
                      )}
                    >
                      {role?.statusStr}
                    </p>
                    <p
                      className={cn(
                        getPriorityStyle(role?.priorityStr ?? ""),
                        "w-fit px-2 py-0.75 rounded-4xl h-fit",
                      )}
                    >
                      {role?.priorityStr}
                    </p>
                  </div>
                </div>
              )}

              {roleDetailsLoading ? (
                <Skeleton className="w-50 h-8" />
              ) : (
                <div className="text-grey-600 flex gap-4">
                  <p className="text-grey-600 text-sm leading-5">
                    {role?.department}
                  </p>
                  <span>&bull;</span>
                  <p className="text-grey-600 text-sm leading-5">
                    {role?.location}
                  </p>
                  <span>&bull;</span>
                  <p className="text-grey-600 text-sm leading-5">
                    {role?.employmentTypeStr}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse items-center gap-1">
              {role?.hasApplicationForm ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() =>
                    navigate(`/dashboard/admin/roles/${id}/create-form`)
                  }
                >
                  View Application Form Builder
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() =>
                    navigate(`/dashboard/admin/roles/${id}/create-form`)
                  }
                >
                  Generate Application Form
                </Button>
              )}
              {role?.applicationFormSlug && (
                <Link to={`/job/${role.applicationFormSlug}`} className="text-info text-sm underline">
                  View Application Form
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {roleDetailsLoading ? (
              <Skeleton className="w-80 h-15" />
            ) : (
              <div className="flex gap-8">
                <div className="space-y-1">
                  <p className="text-xs text-grey-600 leading-3.5">
                    SLA Target
                  </p>
                  <p className="text-grey-600 text-base leading-6 font-medium">
                    {role?.slaTargetDays} day(s)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-grey-600 leading-3.5">
                    Target Hire Date
                  </p>
                  <p className="text-grey-600 text-base leading-6 font-medium">
                    {formatDateTime(role?.targetHireDate ?? "")[0]}
                  </p>
                </div>

                <div className="w-50">
                  <RangeComponent
                    title="SLA"
                    value={role?.slaPercent ?? 0}
                    colorByValue
                    total={100}
                  />
                </div>
              </div>
            )}

            {roleDetailsLoading ? (
              <Skeleton className="w-30 h-10" />
            ) : (
              <div className="flex gap-6">
                <div className="text-center flex flex-col gap-2 justify-center items-center">
                  <div>
                    <Avatar className="bg-primary text-white font-poppins">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {getAvatarInitials(role?.recruiterName ?? "")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1">
                    <p className="text-grey-600 text-sm leading-5">
                      {role?.recruiterName}
                    </p>
                    <p className="text-xs text-grey-600 leading-3.5">
                      Recruiter
                    </p>
                  </div>
                </div>
                <div className="text-center flex flex-col gap-2 justify-center items-center">
                  <div>
                    <Avatar className="bg-primary text-white font-poppins">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {getAvatarInitials(role?.hiringManagerName ?? "")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1">
                    <p className="text-grey-600 text-sm leading-5">
                      {role?.hiringManagerName}
                    </p>
                    <p className="text-xs text-grey-600 leading-3.5">
                      Hiring Manager
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader className="flex gap-0 border border-t-0 border-x-0 border-grey-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "p-4 border-b-2 border-grey-200 flex gap-2 items-center",
                activeTab === tab.key && " border-primary-500",
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium leading-5 text-grey-700",
                  activeTab === tab.key && "text-primary-500",
                )}
              >
                {tab.label}
              </p>
              <p
                className={cn(
                  "px-2 rounded-xl bg-grey-100 text-grey-700 font-medium text-xs text-center",
                  activeTab === tab.key && "bg-primary-500 text-white",
                )}
              >
                {tab.count}
              </p>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={cn(
              "p-4 border-b-2 border-grey-200",
              activeTab === "timeline" && "border-primary-500",
            )}
          >
            <p
              className={cn(
                "text-sm font-medium leading-5 text-grey-700",
                activeTab === "timeline" && "text-primary-500",
              )}
            >
              Timeline
            </p>
          </button>
        </CardHeader>

        <CardContent>
          {activeTab === "pipeline" && <PipelineTab roleId={id as string} />}
          {activeTab === "applicants" && (
            <ApplicantsTab roleId={id as string} />
          )}
          {activeTab === "timeline" && <TimelineTab roleId={id as string} />}
        </CardContent>
      </Card>
    </div>
  );
};
