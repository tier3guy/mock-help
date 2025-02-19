"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createQuestion } from "../../questions/actions";
import { QuestionFormI, questionSchema } from "../../questions/schema";

import dynamic from "next/dynamic";

// Dynamically import the QuestionForm
const QuestionForm = dynamic(() => import("../../questions/questions-form"), {
  ssr: false,
  loading: () => <p>Loading Form...</p>,
});

export default function CreateQuestionPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Initialize the form using react-hook-form and zod schema
  const form = useForm<QuestionFormI>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      statement: "",
      passage: "",
      status: "PENDING",
      questionType: "MULTIPLE_CORRECT",
      difficulty: "EASY",
      options: [
        {
          text: "", // Option text
          explanation: "", // Optional explanation
          mistakeType: null, // Default mistake type
          isCorrect: false, // Default correctness
        },
        {
          text: "",
          explanation: "",
          mistakeType: null,
          isCorrect: false,
        },
        {
          text: "",
          explanation: "",
          mistakeType: null,
          isCorrect: false,
        },
        {
          text: "",
          explanation: "",
          mistakeType: null,
          isCorrect: false,
        },
      ],
      tagsId: [],
    },
  });

  // Submit handler for the form
  async function onSubmit(data: QuestionFormI) {
    console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      // Create the question, sending data and a hardcoded tag for now
      await createQuestion({
        ...data,
        tagsId: [], // Replace this hardcoded value with real data
      });

      // Show success toast notification
      toast({
        title: "Success",
        description: "Question created successfully",
      });

      // Redirect back to the questions dashboard
      router.push("/dashboard/questions");
    } catch (error) {
      console.error("Failed to create question:", error);

      // Show error toast notification
      toast({
        title: "Error",
        description: "Failed to create question",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Question</h1>
      <QuestionForm form={form} onSubmit={onSubmit} />
    </div>
  );
}
