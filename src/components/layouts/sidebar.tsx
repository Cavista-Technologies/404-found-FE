"use client";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CTRecruitaLogoWithText, CTMobileLogo } from "@/assets/images/images";
import { Logout03 } from "@/components/icons";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { menuItems, type MenuItem } from "@/config/menuConfig";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { clearCredentials } from "@/store/slices/auth.slice";
import { capitalizeName, getAvatarInitials } from "../../constants/Helpers";
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openPopover, setOpenPopover] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const activeRole = useSelector((state: RootState) => state.role.activeRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, fullName } = useSelector((state: RootState) => state.auth);

  const dashboardPath =
    activeRole === "SuperAdmin"
      ? "/dashboard/admin"
      : activeRole === "Recruiter"
        ? "/dashboard/recruiterr"
        : "/dashboard/hiring-manager";

  const logOut = () => {
    dispatch(clearCredentials());
    navigate("/login", { replace: true });
  };

  const hasRoleAccess = (item: MenuItem): boolean => {
    if (!item.roles || item.roles.length === 0) return false;
    return item.roles.includes(activeRole);
  };

  // Single source of truth, computed once per render from the CURRENT pathname.
  const bestMatchPath = (() => {
    const allPaths: string[] = [];
    menuItems.forEach((item) => {
      allPaths.push(item.path);
      item.children?.forEach((child) => allPaths.push(child.path));
    });

    const matches = allPaths.filter(
      (path) =>
        location.pathname === path || location.pathname.startsWith(`${path}/`),
    );

    if (matches.length === 0) return null;

    return matches.reduce((longest, path) =>
      path.length > longest.length ? path : longest,
    );
  })();

  const isPathActive = (path: string): boolean => path === bestMatchPath;

  const isActiveParent = (item: MenuItem): boolean => {
    if (item.children) {
      return item.children.some((child) => isPathActive(child.path));
    }
    return isPathActive(item.path);
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName],
    );
  };

  const isMenuExpanded = (menuName: string): boolean => {
    return expandedMenus.includes(menuName);
  };

  const shouldAutoExpand = (item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some((child) => isPathActive(child.path));
  };

  useEffect(() => {
    menuItems.forEach((item) => {
      if (shouldAutoExpand(item) && !isMenuExpanded(item.name)) {
        setExpandedMenus((prev) => [...prev, item.name]);
      }
    });
  }, [location.pathname]);

  const renderMenuItem = (item: MenuItem, level = 0, forceShowText = false) => {
    if (!hasRoleAccess(item)) {
      return null;
    }

    const isParentActive = isActiveParent(item);
    const isExpanded = isMenuExpanded(item.name);

    if (item.children) {
      const visibleChildren = item.children.filter((child) =>
        hasRoleAccess(child),
      );

      if (visibleChildren.length === 0) {
        return null;
      }

      return (
        <div key={item.name} className="space-y-1">
          <button
            onClick={() => toggleMenu(item.name)}
            className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
              isParentActive
                ? " text-gray-900 font-bold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
            }`}
            style={{ paddingLeft: `${12 + level * 16}px` }}
          >
            <item.icon className="size-6" />
            <span className="ml-3 flex-1 text-left">{item.name}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-1 overflow-hidden">
              {visibleChildren.map((child) => {
                const isActiveChild = isPathActive(child.path);
                return (
                  <NavLink
                    key={child.name}
                    to={child.path}
                    className={() =>
                      `flex items-center px-3 py-2 text-sm font-medium rounded-[10px] transition-colors ${
                        isActiveChild
                          ? "bg-primary-50 text-gray-900"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                    style={{ paddingLeft: `${12 + (level + 1) * 16}px` }}
                  >
                    {isActiveChild ? (
                      <div className="bg-gray-600 w-2 h-2 rounded-[10px]" />
                    ) : (
                      <div className="w-2 h-2" />
                    )}
                    <span className="ml-3">{child.name}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.name}
        to={item.path}
        className={() =>
          `flex items-center py-2 px-3 text-base rounded-[10px] transition-colors ${
            isPathActive(item.path)
              ? "bg-primary-500 text-white "
              : "text-grey-500 hover:bg-primary-50 hover:text-grey-900"
          } ${open || forceShowText ? "h-12" : "h-10 w-10"}`
        }
      >
        <item.icon className="size-6" />
        {(open || forceShowText) && <span className="ml-2">{item.name}</span>}
        {item.badgeCount !== undefined &&
          item.badgeCount >= 0 &&
          (open || forceShowText) && (
            <span className="ml-2 bg-error-400 text-white text-xs font-bold px-2 py-0.5 rounded-full justify-end">
              {item.badgeCount}
            </span>
          )}
      </NavLink>
    );
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="relative w-fit">
      {/* Sidebar container */}

      <div
        className={`bg-white text-white h-screen flex flex-col justify-between lg:px-6 px-4 py-8 transition-[width] duration-700 ease-in-out ${open ? "w-71.5 opacity-100 translate-x-0" : "w-25.5 opacity-90 translate-x-0"}`}
      >
        <div className="flex-1 max-h-[80vh] overflow-y-auto">
          {/* Logo */}
          {/* Tablet to large screens */}
          <div className="py-2 mb-10 hidden md:block">
            <button
              onClick={() => navigate(dashboardPath)}
              className="cursor-pointer"
            >
              {open ? (
                <img
                  src={CTRecruitaLogoWithText}
                  alt="Logo"
                  className="w-52 h-9 object-cover ml-2"
                />
              ) : (
                <img
                  src={CTMobileLogo}
                  alt="Logo"
                  className="w-8 h-7.5 object-cover ml-1"
                />
              )}
            </button>
          </div>
          {/* Small screens */}
          <button
            onClick={() => navigate(dashboardPath)}
            className="cursor-pointer block md:hidden mb-10"
          >
            <img
              src={CTRecruitaLogoWithText}
              alt="Logo"
              className="w-38 h-7.75 object-cover block md:hidden mb-10"
            />
          </button>

          {/* Sidebar content */}
          <nav className="flex-1 flex flex-col gap-y-4">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <div className="w-full h-18 p-3 pr-8 bg-grey-50 rounded-[10px] flex gap-3 items-center cursor-pointer">
                <div className="shrink-0 rounded-full w-8 h-8 bg-[#414141] text-white font-poppins font-medium flex justify-center items-center">
                  {getAvatarInitials(fullName!)}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-grey-900 font-medium text-sm font-poppins">
                    {capitalizeName(fullName ?? " ")}
                  </h4>
                  <span className="text-grey-500 text-xs font-poppins font-medium max-w-31.75 truncate">
                    {username}
                  </span>
                </div>
                <div className="" onClick={logOut}>
                  <Logout03 className="size-6 text-primary" />
                </div>
              </div>
            </PopoverTrigger>
          </Popover>
        </div>
      </div>

      {/* Toggle button */}
      <CollapsibleTrigger
        asChild
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white text-[#B9243C] rounded-full p-1 shadow-lg h-8 w-8 md:flex justify-center items-center cursor-pointer hidden"
      >
        <button className="">
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}
