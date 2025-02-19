'use client';
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Home, User, Settings } from 'lucide-react';  // Import some Lucide icons

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Header Section */}
      <header className="bg-white text-black p-4 shadow-md">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Logo Section */}
          <Link href="/" className="block">
            <Image
              width={140}  // Adjust width
              height={70}  // Adjust height
              src="/mindup full blue black.png"  // Ensure the correct path
              alt="Logo"
              className="object-contain"  // Ensures the logo maintains aspect ratio and doesn't stretch
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-6">
            <Link href="/dashboard" className="flex items-center space-x-2 hover:text-gray-500">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/profile" className="flex items-center space-x-2 hover:text-gray-500">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <Link href="/settings" className="flex items-center space-x-2 hover:text-gray-500">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          {children}
        </div>
      </main>
    </>
  );
}
