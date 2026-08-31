"use client";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Sidebar } from "../sidebar";

export const AuthenticatedLayout = () => {
//   const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-screen overflow-y-hidden hidden md:flex bg-grey-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 h-full overflow-y-auto py-8 px-10 bg-grey-50">
            <Outlet />
          </main>
        </div>
      </div>


      {/* <div className="flex md:hidden bg-gray-50 h-screen">
        {/* Main Content 
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation 
          <Navbar
            rightSlot={
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Menu11 className="text-grey-500 w-6 h-6" />
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="p-0 border-primary w-fit border-none"
                  showCloseButton={false}
                >
                  <SheetClose asChild>
                    <button className="absolute top-7 right-0 p-2 z-20 rounded-full hover:bg-gray-200">
                      <X size={24} />
                    </button>
                  </SheetClose>
                  <Sidebar />
                </SheetContent>
              </Sheet>
            }
          />

          {/* Page Content *
          <main className="relative flex-1 h-full overflow-y-auto py-8 md:px-10 px-4 bg-grey-50">
            <Outlet />
          </main>
        </div>
      </div> */}
    </>
  );
};
