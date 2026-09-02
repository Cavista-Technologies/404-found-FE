"use client";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Sidebar } from "../sidebar";

export const AuthenticatedLayout = () => {

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
    </>
  );
};
