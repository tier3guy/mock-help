import { Search, Bell } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import DummyProfile from "@/assets/dummy-profile.png";

export default function Navbar() {
    return (
        <nav className="w-full bg-white flex items-center justify-between px-4 py-3">
            <h2 className="text-3xl font-bold">Welcome, Coachify!</h2>
            <div className="flex items-center gap-2">
                <SearchBar />
                <NotificationBell />
                <Avatar />
            </div>
        </nav>
    );
}

export function SearchBar() {
    return (
      <div className="relative text-[#8BA3CB]">
        {/* Icon */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5" />
        </span>

        {/* Input field */}
        <input
          type="text"
          placeholder="Search for something"
          className="pl-10 pr-3 py-2 rounded-full bg-[#F5F7FA]
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent placeholder:text-[#8BA3CB]"
        />
      </div>
    );
}

export function NotificationBell() {
    return (
      <div className="h-10 w-10 rounded-full grid place-content-center bg-[#F5F7FA]">
        <div className="relative">
            {/* Bell icon */}
            <Bell className="h-6 w-6 text-gray-600" />
            {/* Notification dot (badge) */}
            <span
            className="absolute top-0 right-0 inline-block w-2 h-2
            bg-[#0266FD] rounded-full -translate-x-1 outline outline-white outline-1"
            />
        </div>
      </div>
  );
}

export interface IAvatarProps {
    UserAvatar?: StaticImageData;
}
export function Avatar({ UserAvatar = DummyProfile }: IAvatarProps) {
    return (
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={UserAvatar}
          alt="User Avatar"
          className="object-cover w-full h-full"
        />
      </div>
    );
}
