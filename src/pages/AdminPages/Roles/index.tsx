import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownInput } from "@/components/GenericComponents/DropdownInput";
import { Search } from "lucide-react";
import {TableComponent, type  Column } from "@/components/GenericComponents/TableComponents";
import { cn } from "@/lib/utils";

export const AdminRolesPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    clearTimeout((handleSearchChange as any)._timer);
    (handleSearchChange as any)._timer = setTimeout(() => {
      setDebouncedSearch(value);
    }, 400);
  };

    const columns: Column<UserInformation>[] = [
    {
      header: Role Title",
      accessor: "title",
      className: "text-sm text-gray-900",
      sortable: true,
      sortKey: "fullName",
      width: "300px",
    },
    {
      header: "Departement",
      accessor: (data) => <span>{data.employeeId}</span>,
      hideInMobile: true,
    },
    {
      header: "Date of Hire",
      accessor: (data) => (
        <span>{formatDateTime(fromUTC(data.dateOfHire, userTimeZone))[0]}</span>
      ),
      hideInMobile: true,
    },
    {
      header: "Account Type",
      accessor: "userType",
      hideInMobile: true,
    },
    {
      header: "Department",
      accessor: "department",
      hideInMobile: true,
    },
    {
      header: "System Status",
      accessor: (data) => (
        <span
          className={cn(
            "text-xs font-medium px-3 py-0.5 rounded-3xl",
            data.userStatus === "Pending Onboarding" &&
              "bg-warning-50 text-warning-600",
            data.userStatus === "Deactivated" &&
              "bg-primary-50 text-primary-600",
            data.userStatus === "Active" && "bg-success-50 text-success-600",
          )}
        >
          {data.userStatus}
        </span>
      ),
      hideInMobile: true,
    },
    {
      header: "",
      accessor: (data) => (
        <div className="flex items-center gap-2">
          <Popover
            open={openPopover === data.id}
            onOpenChange={(open) => {
              setOpenPopover(open ? data.id : null);
              if (open) setSelectedUsers([data.id]);
            }}
          >
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 px-2  py-1 rounded-full focus:outline-none whitespace-nowrap cursor-pointer">
                <EllipsisVertical size={16} className="text-[#6B6C7E]" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              side="bottom"
              className="w-60 font-poppins text-sm space-y-4 p-4"
            >
              <button
                className="flex items-center w-full gap-2 text-grey-600 cursor-pointer px-3 py-2"
                onClick={() => {
                  getUserDetailsMutation.mutate(data.id);
                  setShowUserDetails(true);
                  setOpenPopover(null);
                }}
              >
                <span>
                  <ViewIcon className="size-5" />
                </span>
                View User Details
              </button>
              <button
                className="flex items-center w-full gap-2 text-grey-600 cursor-pointer px-3 py-2"
                onClick={() => {
                  setShowEditDetailsModal(true);
                  setEntityId(data.id);
                  setOpenPopover(null);
                }}
              >
                <span>
                  <Edit02 className="size-5" />
                </span>
                Edit User Details
              </button>
              {data.userType !== "Admin" && (
                <button
                  className="flex items-center w-full gap-2 text-grey-600 cursor-pointer px-3 py-2"
                  onClick={() => {
                    setShowGrantAdminAccessModal(true);
                    setOpenPopover(null);
                  }}
                >
                  <span>
                    <UserShield className="size-5" />
                  </span>
                  Grant Admin Access
                </button>
              )}
              {data.userType === "Admin" && (
                <button
                  className="flex items-center w-full gap-2 text-grey-600 cursor-pointer px-3 py-2"
                  onClick={() => {
                    setShowRevokeAdminAccessModal(true);
                    setOpenPopover(null);
                  }}
                >
                  <span>
                    <UserShield className="size-5" />
                  </span>
                  Revoke Admin Access
                </button>
              )}
              {data.userStatus === "Active" && (
                <button
                  className="flex items-center w-full gap-2 text-primary-500 cursor-pointer px-3 py-2"
                  onClick={() => {
                    setShowDeactivateUserModal(true);
                    setOpenPopover(null);
                  }}
                >
                  <span>
                    <UserRemove02 className="size-5" />
                  </span>
                  Deactivate User
                </button>
              )}
              {data.userStatus === "Deactivated" && (
                <button
                  className="flex items-center w-full gap-2 text-success-500 cursor-pointer px-3 py-2"
                  onClick={() => {
                    setShowActivateUserModal(true);
                    setOpenPopover(null);
                  }}
                >
                  <span>
                    <UserCheck01 className="size-5" />
                  </span>
                  Reactivate User
                </button>
              )}
              {data.userStatus === "Pending Onboarding" && (
                <button
                  className="flex items-center w-full gap-2 text-info cursor-pointer px-3 py-2"
                  onClick={() => {
                    setShowResendInviteModal(true);
                    setOpenPopover(null);
                  }}
                >
                  <span>
                    <Repeat className="size-5" />
                  </span>
                  Resend Invite
                </button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      ),
      width: "10px",
    },
  ];


  return (
    <div>
      <Card className="bg-white border-none shadow-[0px_6px_10px_0px_rgba(177,177,177,0.08) space-y-4 lg:space-y-5 min-h-[80vh]">
        <CardHeader>
          <div className="flex lg:justify-between lg:flex-row flex-col gap-3 lg:gap-0 lg:items-center">
            <CardTitle className="text-grey-700 font-medium md:text-2xl text-lg">
              Explore open roles, key requirements, and hiring priorities
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-col xl:flex-row gap-3 lg:gap-4 lg:items-center">
              <Input
                placeholder="Search by Name, Employee ID, or Email"
                icon={<Search size={20} />}
                className="flex-1"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
