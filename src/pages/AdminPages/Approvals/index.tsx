import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownInput } from "@/components/GenericComponents/DropdownInput";
import { Search } from "lucide-react";
import {
  TableComponent,
  type Column,
} from "@/components/GenericComponents/TableComponents";
import type { RolesTableValues } from "@/types/RoleManagement";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRolesByRecruiter } from "@/services/roleManagement.service";
import { fetchDepartments } from "@/services/lookup.service";
import {
  buildDropdownOptions,
  formatDateTime,
} from "@/constants/Helpers";
import { Button } from "@/components/ui/button";

export const AdminApprovalsPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [department, setDepartment] = useState("all");

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
      department,
      debouncedSearch,
    ],
    queryFn: () =>
      fetchAllRolesByRecruiter(
        currentPage,
        pageLength,
        department && department !== "all" ? Number(department) : undefined,
        debouncedSearch,
      ),
  });

  const allRoles = roles?.items ?? [];
  const totalItems = roles?.totalCount || 0;

  const columns: Column<RolesTableValues>[] = [
    {
      header: "Role Title",
      accessor: "title",
      className: "w-150"
    },
    {
      header: "Department",
      accessor: "department",
      className: "w-100"
    },
    {
      header: "Recruiter",
      accessor: "recruiterName",
      className: "w-100"
    },
    {
      header: "Openings",
      accessor: "numberOfOpenings",
      className: "w-60"
    },
    {
      header: "Date Submitted",
      accessor: (data) => <span>{formatDateTime(data.dateSubmitted ?? "")}</span>,
      className: "w-60"
    },
    {
      header: "",
      accessor: () => (
        <div className="flex items-center gap-2.5 justify-end">
            <Button variant="ghost" size="sm">Review</Button>
            <Button variant="secondary" size="sm">Reject</Button>
            <Button className="bg-success-500">Approve</Button>
        </div>
        
      ),
    //   width: "w-fit",
    },
  ];

  return (
    <div>
      <Card className="bg-white border-none shadow-[0px_6px_10px_0px_rgba(177,177,177,0.08)] space-y-4 lg:space-y-5 min-h-[80vh]">
        <CardHeader>
          <div className="flex lg:justify-between lg:flex-row flex-col gap-3 lg:gap-0 lg:items-center">
            <CardTitle className="text-grey-700 font-medium md:text-2xl text-lg">
              Roles submitted by recruiters awaiting your review
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
            totalCount={totalItems}
          />
        </CardContent>
      </Card>
    </div>
  );
};
