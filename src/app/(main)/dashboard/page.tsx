"use client";

import { useRouter } from "next/navigation";
import { Users, Scale, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();

  const exams = [
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: "CAT Entrance",
      path: "CAT",
    },
    {
      icon: <Scale className="h-12 w-12 text-blue-500" />,
      title: "NMAT Entrance",
      path: "NMAT",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: "SNAP Entrance",
      path: "SNAP",
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-blue-500" />,
      title: "CMAT/MAT Entrance",
      path: "CMAT_MAT",
    },
    {
      icon: <Scale className="h-12 w-12 text-blue-500" />,
      title: "XAT Entrance",
      path: "XAT",
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-blue-500" />,
      title: "XGMT Entrance",
      path: "XGMT",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: "CET Entrance",
      path: "CET_MAH",
    },
    {
      icon: <Scale className="h-12 w-12 text-blue-500" />,
      title: "PGDBA Entrance",
      path: "PGDBA",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: "SRCC Entrance",
      path: "SRCC",
    },
  ];

  const handleExamClick = (path: string) => {
    router.push(`/dashboard/review?exam=${path}`);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-semibold mb-6">Review Questions</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {exams.map((exam, index) => (
          <Card
            key={index}
            onClick={() => handleExamClick(exam.path)}
            className="shadow-md h-36 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
          >
            <CardHeader className="flex flex-col items-center justify-center">
              {exam.icon}
              <CardTitle className="mt-2 text-center">{exam.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
