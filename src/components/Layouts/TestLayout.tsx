"use client";
import React from "react";

interface TestLayoutProps {
  children: React.ReactNode;
}

export default function TestLayout({ children }: TestLayoutProps): JSX.Element {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",    
      }}
    >
      {children}
    </div>
  );
}
