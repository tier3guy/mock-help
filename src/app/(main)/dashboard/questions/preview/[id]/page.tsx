"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "../../schema";
import { getQuestionById } from "../../actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function extractInnerP(htmlString: any) {
  const match = htmlString.match(/<p>(.*?)<\/p>/i);
  return match && match[1] ? match[1] : htmlString;
}

export default function QuestionDetail() {
  const params = useParams();
  const questionId = params?.id as string;
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchQuestion() {
      try {
        setLoading(true);
        const fetchedQuestion = await getQuestionById(questionId);
        setQuestion(fetchedQuestion);
      } catch (error) {
        console.error("Failed to fetch question:", error);
      } finally {
        setLoading(false);
      }
    }

    if (questionId) {
      fetchQuestion();
    }
  }, [questionId]);

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">
          Failed to load question.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <h1 className="text-2xl font-bold mb-4 ml-4">Preview Question</h1>
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Question Section */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Question Card */}
          <Card className="shadow border border-gray-300 rounded-lg">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                QUESTION
              </CardTitle>
              <div
                dangerouslySetInnerHTML={{
                  __html: question.statement,
                }}
              ></div>
            </CardHeader>
            <hr className="mx-4"></hr>
            <CardContent className="p-6">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 mb-3"
                >
                  <Checkbox
                    id={`option-${option.id}`}
                    className="h-5 w-5 border-gray-400"
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionChange(option.id)}
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="text-sm text-gray-800 leading-6"
                  >
                    {extractInnerP(option.text)}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Passage Card */}
          {question.passage && (
            <Card className="shadow border border-gray-300 rounded-lg">
              <CardHeader className="p-6">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                  READ THE PARAGRAPH CAREFULLY
                </CardTitle>
              </CardHeader>
              <hr className="mx-4"></hr>
              <CardContent className="p-6">
                {/* <p className="text-sm text-gray-700 leading-6">
                  {extractInnerP(question.passage)}
                </p> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: question.passage,
                  }}
                ></div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Comments and Actions Section */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add your comments here..."
                className="resize-none h-40"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="secondary"
                className="w-full mr-2 bg-green-100 text-green-800"
              >
                Approve
              </Button>
              <Button variant="destructive" className="w-full">
                Flagged
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
