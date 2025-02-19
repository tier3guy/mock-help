"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Routes, IconMap, TIconKey } from "../routes";
import { LogOut } from "lucide-react";

export default function Sidebar(){

    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const isRouteActive = useCallback((route: string) => {
        return (
          pathname === route || // exact match
          pathname.startsWith(route) // deeper routes, e.g., /admin/courses/all
        );
    }, [pathname]);

    // Toggle a menu open/closed
    const handleToggle = useCallback((route: string) => {
        setOpenMenu((prev) => (prev === route ? null : route));
    }, []);

    // Expand the parent if you're on a child route
    useEffect(() => {
        Routes.forEach((route) => {
            if (
                (isRouteActive(route.route)) || // exact match
                (route.subMenu && route.subMenu.some((sub) => isRouteActive(sub.route))) // deeper routes, e.g., /admin/courses/all
            ) {
                setOpenMenu(route.route);
            }
        });
    }, [isRouteActive, pathname]);

    return (
        <div className="bg-[#171A31] h-full flex flex-col">
            <div className="flex pt-2">
                <Logo />
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden" id="sidebar-scroll">
                <nav className="flex flex-col px-3 mt-4">
                    {
                        Routes.map((item, index) => {
                            // Get the correct Lucide icon from the map;
                            // fallback to `default`
                            const IconComponent = IconMap[item.icon as TIconKey] || IconMap["default"];
                            // Check if the current route is active
                            const isActive = isRouteActive(item.route);
                            const hasSubMenu = item.subMenu && item.subMenu.length > 0;
                            const isOpen = openMenu === item.route;

                            return (
                                <div key={index}>
                                    <div
                                        className={`rounded-md ${isActive ? "bg-[#31356580]" : "bg-transparent"}`}
                                        onClick={() => {
                                            if (hasSubMenu) {
                                              handleToggle(item.route);
                                            }
                                        }}
                                        >
                                        {/* Top-level link */}
                                        <Link
                                            href={item.route}
                                            className={`flex items-center gap-3 px-4 py-3 hover:text-[#FFFFFF] transition-colors ${isActive ? "text-[#FFFFFF]" : "text-[#606060]"}`}
                                            // Stop click propagation if you want the parent route to be clickable
                                            onClick={(e) => {
                                                if (hasSubMenu) {
                                                    // comment this out if you want parent route to navigate
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </Link>

                                        {/* Submenu, if any */}
                                        {hasSubMenu && isOpen && (
                                        <div className="ml-8">
                                            {item.subMenu.map((subItem, subIndex) => {
                                            const isSubActive = pathname === subItem.route;
                                            return (
                                                <Link
                                                    key={subIndex}
                                                    href={subItem.route}
                                                    className={`block px-4 py-2 text-sm ${isSubActive ? "text-[#FFFFFF]" : "text-[#606060]"}`}
                                                >
                                                    {subItem.title}
                                                </Link>
                                            );
                                            })}
                                        </div>
                                        )}
                                    </div>
                                </div>
                            );
                       })
                    }
                </nav>
            </div>
            <div className="px-7 py-4">
                <button className="flex items-center gap-3 w-full text-[#FFFFFF]">
                    <LogOut className="w-5 h-5" />
                    <span>Sign out</span>
                </button>
            </div>
        </div>
    );
}
