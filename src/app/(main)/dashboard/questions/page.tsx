import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { deleteQuestion, getQuestions } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionTable } from "./questions-table";
import Link from "next/link";

export default async function QuestionsPage() {
  const questions = await getQuestions();
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<LoadingSpinner />}>
        <Card className="mb-6">
          <CardHeader className=" mt-2 flex flex-row justify-between">
            <div>
              <CardTitle>Questions Bank</CardTitle>
              <CardDescription>
                Create and manage quiz questions with multiple types and answers
              </CardDescription>
            </div>
            <Link href="questions/create">
              <Button className="flex items-center gap-2 mb-4 ml-4">
                <Plus size={16} />
                Add Question
              </Button>
            </Link>
          </CardHeader>
          <hr className="mx-6"></hr>
          <CardContent className="mt-2">
            <QuestionTable />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
