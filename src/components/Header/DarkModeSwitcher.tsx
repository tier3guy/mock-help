/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { Sun, Moon } from "lucide-react";
import useColorMode from "@/hooks/useColorMode";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={colorMode === "dark"}
        // @ts-expect-error this is bullshit
        onChange={() => setColorMode(colorMode === "light" ? "dark" : "light")}
      />
      <div
        className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
          colorMode === "dark" ? "bg-slate-400" : "bg-slate-400"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            colorMode === "dark"
              ? "translate-x-7 bg-white"
              : "translate-x-0 bg-white"
          }`}
        >
          {colorMode === "dark" ? (
            <Moon size={16} className="text-gray-800 font-bold" />
          ) : (
            <Sun size={16} className="text-yellow-500 font-bold" />
          )}
        </div>
      </div>
    </label>
  );
};

export default DarkModeSwitcher;
