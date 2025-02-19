'use client';
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from 'next-auth/react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import AuthGuard from '@/components/AuthGuard';
import TestLayout from "@/components/Layouts/TestLayout";

// Fonts for styling
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <LayoutSelector>{children}</LayoutSelector>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}

function LayoutSelector({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isTestPath = pathname.startsWith("/main-test");

  if (isDashboardPath) {
    return (
      <AuthGuard>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthGuard>
    );
  }else if(isTestPath){
return <TestLayout>{children}</TestLayout>
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}
