import { ArrowLeft02 } from "@/components/icons";
import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { EditRoleForm } from "@/components/forms/EditRoleForm";

export const EditRolePage = () => {
  const location = useLocation();
  const isRecruiter = location.pathname.includes("/recruiter");
  return (
    <div className="w-full">
      {isRecruiter ? (
        <Link
          to={"/dashboard/recruiter/my-roles"}
          className="text-info text-base leading-6 flex items-center gap-1.5"
        >
          <ArrowLeft02 />
          <span>Back to Roles</span>
        </Link>
      ) : (
        <Link
          to={"/dashboard/admin/roles"}
          className="text-info text-base leading-6 flex items-center gap-1.5"
        >
          <ArrowLeft02 />
          <span>Back to Roles</span>
        </Link>
      )}

      <div className="mt-6">
        <Card className="bg-white p-6 shadow-[0px_6px_10px_0px_rgba(177,177,177,0.08) space-y-4 lg:space-y-5">
          <EditRoleForm />
        </Card>
      </div>
    </div>
  );
};
