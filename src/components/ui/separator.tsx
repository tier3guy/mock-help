import React from "react";

export const Separator: React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={`h-[1px] w-full bg-gray-300 ${className}`}
    ></div>
  );
};
