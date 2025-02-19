import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { Bell } from "lucide-react";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <button
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {/* Notification Indicator */}
          <span
            className={`absolute -top-1 right-0 z-10 h-3 w-3 rounded-full bg-red-500 ${
              notifying ? "" : "hidden"
            }`}
          >
            <span className="absolute left-0 -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          </span>

          {/* Lucide Bell Icon */}
          <Bell className="text-gray-600 dark:text-gray-300" size={20} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            className={`absolute right-0 mt-2 w-72 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:w-80`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Notifications
              </h5>
              <button
                onClick={() => setNotifying(true)}
                className="text-xs text-blue-500 hover:underline"
              >
                Mark all as read
              </button>
            </div>

            {/* Notification List */}
            <ul className="max-h-60 overflow-y-auto">
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-200 px-4 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                  href="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-medium">Edit your information</span>{" "}
                    in a swipe. Sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim.
                  </p>
                  <p className="text-xs text-gray-500">12 May, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-200 px-4 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                  href="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-medium">It is a long established</span>{" "}
                    fact that a reader will be distracted by the readable.
                  </p>
                  <p className="text-xs text-gray-500">24 Feb, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-200 px-4 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                  href="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-medium">There are many variations</span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered.
                  </p>
                  <p className="text-xs text-gray-500">04 Jan, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2 border-b border-gray-200 px-4 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                  href="#"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-medium">There are many variations</span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered.
                  </p>
                  <p className="text-xs text-gray-500">01 Dec, 2024</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;