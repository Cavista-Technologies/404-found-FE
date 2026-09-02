import { ArrowLeft02 } from "@/components/icons";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CreateNewRoleForm } from "@/components/forms/CreateNewRoleForm";

export const CreateRolePage = () => {
  return (
    <div className="w-full">
      <Link
        to={"/roles"}
        className="text-info text-base leading-6 flex items-center gap-1.5"
      >
        <ArrowLeft02 />
        <span>Back to Roles</span>
      </Link>

      <div className="mt-6">
        <Card className="bg-white p-6shadow-[0px_6px_10px_0px_rgba(177,177,177,0.08) space-y-4 lg:space-y-5 min-h-[80vh]">
          <div className="flex gap-8">
            <div className="border border-grey-200 p-6 rounded-[16px] flex-1 space-y-10">
              <div className="space-y-2">
                <h3 className="text-grey-700 text-2xl font-medium">
                  Create New Role
                </h3>
                <p className="text-sm text-grey-600 leading-5">
                  Save as draft with minimal info, or complete all fields to
                  activate immediately.
                </p>
              </div>

              <div>
                <CreateNewRoleForm />
              </div>
            </div>

            <div>
              <p>Activation Readiness</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
