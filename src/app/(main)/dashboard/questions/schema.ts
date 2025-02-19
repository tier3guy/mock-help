import { z } from "zod";

// Enums from Prisma schema
export const userRoles = ["super_admin", "admin", "user"] as const;
export const contentTypes = ["VIDEO", "TEXT", "QUIZ"] as const;
export const difficultyLevels = ["EASY", "MEDIUM", "HARD"] as const;
export const questionTypes = ["MULTIPLE_CORRECT", "SINGLE_CORRECT"] as const;
export const mistakeTypes = [
  "CONCEPTUAL",
  "CALCULATION",
  "SILLY",
  "VOCABULARY",
  "NONE",
] as const;
export const questionStatuses = [
  "PENDING",
  "INREVIEW",
  "APPROVED",
  "FLAGGED",
] as const;

export const questionSchema = z.object({
  id: z.string().optional(), // Optional for new questions
  passage: z.string().optional(), // Rich text passage
  passageText: z.string().optional(), // Flattened passage text
  status: z.enum(questionStatuses),
  statement: z.string(), // Rich text statement
  statementText: z.string().optional(), // Flattened statement text
  questionType: z.enum(questionTypes),
  difficulty: z.enum(difficultyLevels),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  options: z
    .array(
      z.object({
        id: z.string().optional(),
        questionId: z.string().optional(),
        text: z.string(), // Rich text for the option text
        explanation: z.string().optional(),
        mistakeType: z.enum(mistakeTypes).nullable(),
        isCorrect: z.boolean().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
    )
    .min(1, "At least one option is required"),
  tagsId: z.array(z.string()).optional(),
});


export type QuestionFormI = z.infer<typeof questionSchema>;

export type Question = {
  id: string;
  passage?: string; // Structured passage content
  passageText?: string | null; // Flattened passage content
  status: (typeof questionStatuses)[number];
  statement: string; // Structured statement content
  statementText?: string | null; // Flattened statement content
  questionType: (typeof questionTypes)[number];
  difficulty: (typeof difficultyLevels)[number];
  createdAt: string;
  updatedAt: string;
  options: {
    id: string;
    questionId: string;
    text: string; // Rich text for the option
    explanation?: string;
    mistakeType: (typeof mistakeTypes)[number] | null;
    isCorrect?: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  tagsId: {
    id: string;
    questionId: string;
    tagId: string;
    tag: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};

