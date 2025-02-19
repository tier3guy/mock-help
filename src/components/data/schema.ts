import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  createdAt: z.string(), // Date as a string (e.g., ISO or formatted date)
  statement: z.string(), // Represents the "Question" field
  questionType: z.string(), // "Question Type"
  difficulty: z.string(), // "Difficulty"
  actions: z
    .function()
    .args(z.any())
    .returns(z.void()) // Function to handle row-specific actions
    .optional(),
  status: z.enum(["PENDING", "INREVIEW", "APPROVED", "FLAGGED"]), // Specific values for "Status" // Actions are optional in some cases
});

export type Question = z.infer<typeof taskSchema>;
