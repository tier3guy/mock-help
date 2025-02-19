"use client";

import { useSearchParams } from "next/navigation";
import ManageQuestionsPage from "./fragments/manage-question";

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const exam = searchParams.get("exam");

  if (!exam) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">No Exam Selected</h1>
        <p>Please go back and choose an exam.</p>
      </div>
    );
  }

  return <ManageQuestionsPage exam={exam} />;
}
