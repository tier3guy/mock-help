"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ClickOutside from "@/components/ClickOutside";
import { User, Users, Settings, LogOut } from "lucide-react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
      
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/user/user-01.png"}
            alt="User"
            className="rounded-full"
          />
        </span>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800`}
        >
          

          {/* Dropdown Links */}
          <ul className="flex flex-col gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 text-sm font-medium text-gray-800 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              >
                <User size={18} className="text-gray-600 dark:text-gray-400" />
                {session?.user?.name || 'User Name'}
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 text-sm font-medium text-gray-800 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              >
                <Users size={18} className="text-gray-600 dark:text-gray-400" />
                {session?.user?.role || 'User Role'}
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 text-sm font-medium text-gray-800 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
              >
                <Settings size={18} className="text-gray-600 dark:text-gray-400" />
                Account Settings
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <button
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
            onClick={() => signOut()}
          >
            <LogOut size={18} className="text-gray-600 dark:text-gray-400" />
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;