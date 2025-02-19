"use server";

import { revalidatePath } from "next/cache";
import { QuestionFormI } from "./schema";

/**
 * Points to your server.
 * Update if your server endpoints or route names changed
 * (e.g., /api/questions vs /questions)
 */
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * GET all questions
 */
export async function getQuestions(params?: { page?: number; pageSize?: number; filter?: string; searchText? : string }) {
  try {
    const query = new URLSearchParams({
      page: params?.page?.toString() || "1",
      limit: params?.pageSize?.toString() || "10",
      status: params?.filter || "",
      searchText: params?.searchText || "",
    });

    const res = await fetch(`${API_URL}/questions?${query.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch questions");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questions");
  }
}

/**
 * Search questions
 */
export async function searchQuestion(query: string) {
  try {
    const res = await fetch(`${API_URL}/questions/search?query=${query}`);
    if (!res.ok) throw new Error("Failed to search questions");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * CREATE a new question
 * - Accepts the new shape: { statement, passage, status, questionType, difficulty, options, tags, ... }
 */
export async function createQuestion(data: QuestionFormI) {
  /**
   * If your backend expects the exact structure as in `data`,
   * you can post it directly. Otherwise, do any transformations here.
   */
  console.log(data);

  const response = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create question");
  }

  const question = await response.json();
  revalidatePath("/questions"); // Revalidate whatever path (or routes) shows the questions list
  return question;
}

/**
 * DELETE question by ID
 */
export async function deleteQuestion(id: string) {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete question");
  }

  revalidatePath("/questions");
}

/**
 * UPDATE an existing question with the new shape
 */
export async function updateQuestion(id: string, data: QuestionFormI) {
  console.log(data);

  try {
    // We only want to send the updatable fields, not the 'id'
    // (assuming your backend doesn't want the 'id' in PATCH body)
    const { createdAt, updatedAt, ...rest } = data as any;

    // Or if you have an 'id' in the schema, destructure it:
    // const { id: _discardId, ...rest } = data; // if data actually had a top-level 'id'

    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });

    if (!response.ok) {
      throw new Error("Failed to update question");
    }

    const updatedQuestion = await response.json();
    revalidatePath("dashboard/questions");
    return updatedQuestion;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update question");
  }
}

/**
 * GET a single question by ID
 * - returns the updated shape (with statement, passage, options, tags, etc.)
 */
export async function getQuestionById(id: string) {
  try {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      // cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch question");
    }

    const question = await response.json();
    return question;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch question");
  }
}
