// import { CTLogo } from "@/assets/images/images";
// import { Menu11 } from "@/components/icons";
import { menuItems } from "@/config/menuConfig";
// import type { RootState } from "@/store";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = ({ rightSlot }: { rightSlot?: React.ReactNode }) => {
  const location = useLocation();
//   const navigate = useNavigate();
//   const activeRole = useSelector((state: RootState) => state.role.activeRole);

//   const dashboardPath =
//     activeRole === "admin"
//       ? "/dashboard/admin"
//       : activeRole === "manager"
//         ? "/dashboard/manager"
//         : "/dashboard/employee";

  const allMenuItems = [...menuItems];
  const activeItem = allMenuItems.find(
    (item) => item.path === location.pathname,
  );

//   const isCalendar = location?.pathname == "/dashboard/admin/calendar";

  return (
    <>
      {/* From tablet screens */}
      <header
        className={`bg-white shadow-sm min-h-28 md:flex flex-col items-center justify-center hidden`}
      >
        <div className="px-10 py-4 w-full">
          <div className="flex lg:items-center flex-col lg:flex-row justify-between gap-4">
            {/* Left Section - Page Title */}
            <h3 className="text-grey-900 font-medium font-poppins text-[32px] whitespace-nowrap">
              {activeItem?.name}
            </h3>
          </div>
        </div>
      </header>

      {/* For Mobile Screens  */}
      {/* <header className="bg-white flex flex-col md:hidden">
        {/* Logo and Hamburger *
        <div className="flex justify-between gap-4 items-center flex-wrap py-3 px-4 border-b border-grey-200">
          <button
            onClick={() => navigate(dashboardPath)}
            className="cursor-pointer block"
          >
            <img src={CTLogo} alt="Logo" className="w-8 h-7.5 object-cover" />
          </button>

          {rightSlot ? rightSlot : <Menu11 className="text-grey-500 w-6 h-6" />}
        </div>
        <div className="py-6 px-4 flex flex-col gap-3">
          <h3 className="text-grey-900 font-medium font-poppins text-[24px] ">
            {isCalendar ? "Calendar" : activeItem?.name}
          </h3>
        </div>
      </header> */}
    </>
  );
};

export default Navbar;
