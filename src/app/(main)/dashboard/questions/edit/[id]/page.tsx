"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { createQuestion, updateQuestion, getQuestionById } from "../../actions";
import { QuestionFormI, questionSchema } from "../../schema";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Dynamic import of the QuestionForm
const QuestionForm = dynamic(() => import("../../questions-form"), {
  ssr: false,
  loading: () => <p>Loading Form...</p>,
});

export default function ManageQuestionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const questionId = params?.id as string;
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(questionId);

  const form = useForm<QuestionFormI>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      statement: "", // Updated for RichTextContent
      passage: "", // Updated for RichTextContent
      status: "PENDING",
      questionType: "MULTIPLE_CORRECT",
      difficulty: "EASY",
      options: [
        {
          text: "", // Updated for RichTextContent
          explanation: "",
          mistakeType: null,
          isCorrect: false,
        },
      ],
      tagsId: [],
    },
  });

  async function fetchQuestion(id: string) {
    try {
      setLoading(true);
      const fetched = await getQuestionById(id);
      if (fetched) {
        form.reset({
          statement: fetched.statement, // Already in RichTextContent format
          passage: fetched.passage ?? { content: "", images: [] }, // Handle null passage
          status: fetched.status,
          questionType: fetched.questionType,
          difficulty: fetched.difficulty,
          createdAt: fetched.createdAt,
          updatedAt: fetched.updatedAt,
          options: fetched.options.map((opt: any) => ({
            id: opt.id,
            questionId: opt.questionId,
            text: opt.text ?? { content: "", images: [] }, // Ensure fallback for RichTextContent
            explanation: opt.explanation ?? "",
            mistakeType: opt.mistakeType ?? null,
            isCorrect: opt.isCorrect ?? false,
            createdAt: opt.createdAt,
            updatedAt: opt.updatedAt,
          })),
          tagsId: fetched.tags.map((t: any) => ({
            id: t.id,
            questionId: t.questionId,
            tagId: t.tagId,
            tag: {
              id: t.tag.id,
              name: t.tag.name,
              createdAt: t.tag.createdAt,
              updatedAt: t.tag.updatedAt,
            },
          })),
        });
      } else {
        throw new Error("Question not found");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch question data. Redirecting...",
        variant: "destructive",
      });
      router.push("/dashboard/questions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isEditMode && questionId) {
      fetchQuestion(questionId);
    }
  }, [questionId]);

  async function onSubmit(rawData: QuestionFormI) {
    try {
      const { createdAt, updatedAt, ...data } = rawData;
      if (isEditMode && questionId) {
        await updateQuestion(questionId, data);
        toast({
          title: "Success",
          description: "Question updated successfully",
        });
      } else {
        await createQuestion(data);
        toast({
          title: "Success",
          description: "Question created successfully",
        });
      }
      router.push("/dashboard/questions");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save question. Redirecting...",
        variant: "destructive",
      });
      router.push("/dashboard/questions");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Question" : "Create Question"}
      </h1>
      <QuestionForm form={form} onSubmit={onSubmit} />
    </div>
  );
}
