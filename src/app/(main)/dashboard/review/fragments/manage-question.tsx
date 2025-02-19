"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { examMap } from "@/utils/examMap";
import BreadCrumb from "./breadcrum";
import { renderAccordion } from "./exam-accordian";
import { Button } from "@/components/ui/button";

interface ManageQuestionsPageProps {
  exam: string;
}

export default function ManageQuestionsPage({
  exam,
}: ManageQuestionsPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState<any>(null);

  useEffect(() => {
    if (exam && examMap[exam as keyof typeof examMap]) {
      setExamData(examMap[exam as keyof typeof examMap]);
    } else {
      router.push("/dashboard/review");
    }
    setLoading(false);
  }, [exam, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Exam Not Found
        </h1>
        <p className="text-gray-500">
          Please select a valid exam from the dashboard.
        </p>
        <Button
          onClick={() => router.push("/dashboard/review")}
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <BreadCrumb exam={exam} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage {exam}</h1>
      <div>{renderAccordion(examData, "", true)}</div>
    </div>
  );
}
