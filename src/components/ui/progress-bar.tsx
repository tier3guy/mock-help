import React from "react";

export const ProgressBar: React.FC<{ value: number; max: number; className?: string }> = ({
  value,
  max,
  className,
}) => {
  const percentage = (value / max) * 100;
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
