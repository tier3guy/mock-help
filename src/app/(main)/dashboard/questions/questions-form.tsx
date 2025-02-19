"use client";

import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { QuestionFormI } from "./schema";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const mistakeTypes = [
  "CONCEPTUAL",
  "CALCULATION",
  "SILLY",
  "VOCABULARY",
  "NONE",
];

interface QuestionFormProps {
  form: UseFormReturn<QuestionFormI>;
  onSubmit: (values: QuestionFormI) => void;
  initialData?: QuestionFormI;
}

export default function QuestionForm({
  form,
  onSubmit,
  initialData,
}: QuestionFormProps) {
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]);

  const options = form.watch("options");
  const OPTIONS: Option[] = [
    { label: "QUANT", value: "quant" },
    { label: "ENGLISH", value: "english" }, // Disabled example
    { label: "VERBAL", value: "verbal" },
    { label: "LRDI", value: "lrdi" },
    {
      label: "DATA INTERPRETATION",
      value: "dataInterpretation",
    },
    { label: "LOGICAL REASONING", value: "logicalReasoning" },
  ];
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Question</h2>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Tags</FormLabel>
                <MultipleSelector
                  defaultOptions={OPTIONS}
                  placeholder="Select the tags according to the question"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Select difficulty level*</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Difficulty Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questionType"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Select question type*</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SINGLE_CORRECT">
                          Single Correct
                        </SelectItem>
                        <SelectItem value="MULTIPLE_CORRECT">
                          Multiple Choice
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="statement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Statement</FormLabel>
                <FormControl>
                  <QuillEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passage</FormLabel>
                <FormControl>
                  <QuillEditor
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    // placeholder="Passage content..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 mt-6">
            {options.map((opt, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md"
              >
                <FormField
                  control={form.control}
                  name={`options.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer Option {index + 1}</FormLabel>
                      <FormControl>
                        <QuillEditor
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          // placeholder="Answer Option"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.explanation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explanation</FormLabel>
                      <FormControl>
                        <QuillEditor
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          // placeholder="Explanation"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.isCorrect`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 mt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(isChecked) => {
                            if (
                              form.watch("questionType") === "SINGLE_CORRECT" &&
                              isChecked
                            ) {
                              options.forEach((_, optIndex) => {
                                if (optIndex !== index) {
                                  form.setValue(
                                    `options.${optIndex}.isCorrect`,
                                    false
                                  );
                                }
                              });
                            }
                            field.onChange(isChecked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Correct Answer
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.mistakeType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mistake Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select mistake type" />
                          </SelectTrigger>
                          <SelectContent>
                            {mistakeTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="INREVIEW">In Review</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="FLAGGED">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button type="submit" className="w-full md:w-auto">
              Save Question
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
