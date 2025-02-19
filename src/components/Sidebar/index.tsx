"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import {
  Home,
  BookOpen,
  FileText,
  Video,
  Book,
  HelpCircle,
  Settings,
  ArrowLeft,
  LogOut,
  FileQuestion,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  session: any;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, session }: SidebarProps) => {
  const [pageName, setPageName] = useState();

  const getMenuGroups = (userRole:string) => {
    if (!userRole) return [];

    switch (userRole) {
      case "super_admin":
        return [
          {
            menuItems: [
              {
                icon: <Home className="text-white" />,
                label: "Manage Coaching",
                route: "/dashboard/manage-coaching",
              },
              {
                icon: <FileQuestion className="text-white" />,
                label: "Manage Questions",
                route: "/dashboard/questions",
              },
              {
                icon: <HelpCircle className="text-white" />,
                label: "Help Desk",
                route: "#",
              },
              {
                icon: <Settings className="text-white" />,
                label: "Settings",
                route: "#",
              },
            ],
          },
        ];

      case "admin":
        return [
          {
            menuItems: [ 
              {
                icon: <BookOpen className="text-white" />,
                label: "manage-student",
                route: "/dashboard/manage-students",
              },             
              {
                icon: <BookOpen className="text-white" />,
                label: "manage-course",
                route: "/dashboard/manage-course",
              },
              {
                icon: <FileText className="text-white" />,
                label: "video",
                route: "/dashboard/video",
              },   
              {
                icon: <FileText className="text-white" />,
                label: "manage-quiz",
                route: "/dashboard/quiz",
              },          
              {
                icon: <HelpCircle className="text-white" />,
                label: "Help Desk",
                route: "#",
              },
              {
                icon: <Settings className="text-white" />,
                label: "Settings",
                route: "#",
              },
            ],
          },
        ];

      case "user":
        return [
          {
            menuItems: [
              
              {
                icon: <BookOpen className="text-white" />,
                label: "My Courses",
                route: "/dashboard/my-courses",
              },
              {
                icon: <FileText className="text-white" />,
                label: "My Tests",
                route: "/main-test",
              },
              {
                icon: <Video className="text-white" />,
                label: "Live Class",
                route: "/dashboard/live-class",
              },
            
              {
                icon: <HelpCircle className="text-white" />,
                label: "Help Desk",
                route: "#",
              },
              {
                icon: <Settings className="text-white" />,
                label: "Settings",
                route: "#",
              },
            ],
          },
          {
            name: "Study",
            menuItems: [
              {
                icon: <Book className="text-white" />,
                label: "My Study Plan",
                route: "#",
              },
              {
                icon: <Video className="text-white" />,
                label: "Online Sessions",
                route: "#",
              },
            ],
          },
        ];

      default:
        return [];
    }
  };

  const menuGroups = getMenuGroups(session?.user?.role || '');
 
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-40 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 py-2 lg:py-3">
          <Link href="/dashboard">
            <Image
              width={176}
              height={32}
              src={"/mindup full blue white.png"}
              alt="Logo"
              priority
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden pr-2"
          >
            <ArrowLeft className="text-white" />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-2 flex-grow">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}

          {/* Logout Button */}
          <div className="mt-auto p-4">
           
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                 
                    <button 
                      type="submit" onClick={() => signOut()}
                      className="bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-md shadow-lg hover:bg-red-700 transition-colors w-28"
                    >
                      <LogOut size={20} /> Logout
                    </button>
          
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-white text-gray-800 text-sm px-2 py-1 rounded-md shadow-md"
                >
                  <p className="font-bold">{session?.user?.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;