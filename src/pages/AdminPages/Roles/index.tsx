import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownInput } from "@/components/GenericComponents/DropdownInput";
import { Search } from "lucide-react";
import {
  TableComponent,
  type Column,
} from "@/components/GenericComponents/TableComponents";
import { cn } from "@/lib/utils";
import type { RolesTableValues } from "@/types/RoleManagement";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRoles } from "@/services/roleManagement.service";
import { fetchDepartments } from "@/services/lookup.service";
import { buildDropdownOptions } from "@/constants/Helpers";
import { JobStatusOptions } from "@/constants";

export const AdminRolesPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [jobStatus, setJobStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(10);

  const { data: DepartmentList = [], isLoading: departmentLoading } = useQuery({
    queryKey: ["getDepartments"],
    queryFn: fetchDepartments,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    clearTimeout((handleSearchChange as any)._timer);
    (handleSearchChange as any)._timer = setTimeout(() => {
      setDebouncedSearch(value);
    }, 400);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageLength(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const { data: roles, isFetching: isLoadingUsers } = useQuery({
    queryKey: [
      "getAllRoles",
      currentPage,
      pageLength,
      jobStatus,
      department,
      debouncedSearch,
    ],
    queryFn: () =>
      fetchAllRoles(
        currentPage,
        pageLength,
        jobStatus && jobStatus !== "all" ? Number(jobStatus) : undefined,
        department && department !== "all" ? Number(department) : undefined,
        debouncedSearch,
      ),
  });

  const allRoles = roles ?? [];

  const columns: Column<RolesTableValues>[] = [
    {
      header: "Role Title",
      accessor: "title",
    },
    {
      header: "Department",
      accessor: "department",
    },
    {
      header: "Recruiter/Hiring Manager",
      accessor: (data) => (
        <div className="flex flex-col gap-0.5">
          <span>{data.recruiterName}</span>
          <span className="text-xs text-grey-500">
            HM: {data.hiringManagerName}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (data) => (
        <span
          className={cn(
            "text-xs font-medium px-3 py-0.5 rounded-3xl",
            data.statusStr === "Pending Onboarding" &&
              "bg-warning-50 text-warning-600",
            data.statusStr === "Deactivated" &&
              "bg-primary-50 text-primary-600",
            data.statusStr === "Active" && "bg-success-50 text-success-600",
          )}
        >
          {data.statusStr}
        </span>
      ),
    },
    // {
    //   header: "Age",
    //   accessor: "",
    // },
    {
      header: "SLA%",
      accessor: "slaPercent",
    },
    {
      header: "Openings",
      accessor: "numberOfOpenings",
    },
    {
      header: "Priority",
      accessor: "priorityStr",
    },
  ];

  return (
    <div>
      <Card className="bg-white border-none shadow-[0px_6px_10px_0px_rgba(177,177,177,0.08)] space-y-4 lg:space-y-5 min-h-[80vh]">
        <CardHeader>
          <div className="flex lg:justify-between lg:flex-row flex-col gap-3 lg:gap-0 lg:items-center">
            <CardTitle className="text-grey-700 font-medium md:text-2xl text-lg">
              Explore open roles, key requirements, and hiring priorities
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex gap-6">
            <div className="w-133.5">
              <Input
                placeholder="Search by Name, Employee ID, or Email"
                icon={<Search size={20} />}
                className="w-full"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <DropdownInput
                placeholder="All Status"
                value={jobStatus}
                dropDownValues={buildDropdownOptions(
                  JobStatusOptions,
                  "All Status",
                )}
                onValueChange={(value) => {
                  setJobStatus(value);
                  setCurrentPage(1);
                }}
              />
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
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <TableComponent
            data={allRoles}
            columns={columns}
            loading={isLoadingUsers}
            emptyMessage="No Data Yet"
            emptySubMessage="No data to show yet"
            loadingRows={10}
            headerClassName="bg-grey-100 text-right"
            showPagination={true}
            currentPage={currentPage}
            pageSize={pageLength}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
            // totalCount={totalItems}
          />
        </CardContent>
      </Card>
    </div>
  );
};
