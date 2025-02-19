import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { Menu, Search } from 'lucide-react';
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-md dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-30 block rounded-sm border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
         <Menu className="text-gray-400"/>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/dashboard">
            <Image
              width={140}
              height={70}
              src={"/mindup full blue black.png"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
  <form action="#" method="POST">
    <div className="relative">
      {/* Search Icon Button */}
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
      >
        <Search size={20} />
      </button>
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors duration-300 xl:w-125"
      />
    </div>
  </form>
</div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

           
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
