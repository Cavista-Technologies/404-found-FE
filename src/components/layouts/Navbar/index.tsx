import { menuItems } from "@/config/menuConfig";
import { formatCurrentDate } from "@/constants/Helpers";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const allMenuItems = [...menuItems];
  const activeItem = allMenuItems.find(
    (item) => item.path === location.pathname,
  );


  return (
    <>
      {/* From tablet screens */}
      <header
        className={`bg-white shadow-sm min-h-28 md:flex flex-col items-center justify-center hidden`}
      >
        <div className="px-10 py-4 w-full">
          <div className="flex lg:items-center flex-col lg:flex-row justify-between gap-4">
            {/* Left Section - Page Title */}
            <h2 className="text-grey-900 font-medium font-poppins text-[32px] whitespace-nowrap">
              {activeItem?.name}
            </h2>

            <div className="py-2 px-3 rounded-[10px] bg-success-25 border border-success-200 text-success-500">
                {formatCurrentDate()}
            </div>
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
