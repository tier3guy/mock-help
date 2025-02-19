"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { getQuestions } from "./actions";
import { Question } from "./schema";

const STATUS_MAP: Record<
  string,
  "FLAGGED" | "INREVIEW" | "APPROVED" | "PENDING" | undefined
> = {
  flagged: "FLAGGED",
  "in-review": "INREVIEW",
  approved: "APPROVED",
  pending: "PENDING",
  status: undefined,
};

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "statement",
    header: "Question",
    cell: ({ row }) => (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
        {row.original.statement}
      </div>
    ),
  },
  {
    accessorKey: "questionType",
    header: "Question Type",
    cell: ({ row }) => {
      const type = row.original.questionType
        .replace("_", " ")
        .toLowerCase()
        .replace(/^./, (char) => char.toUpperCase());
      return <span>{type}</span>;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty
        .toLowerCase()
        .replace(/^./, (char) => char.toUpperCase());
      return <span>{difficulty}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // const router = useRouter();
      const question = row.original;

      return (
        <div className="flex items-center justify-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            // onClick={() =>
            //   router.push(`/dashboard/questions/preview/${question.id}`)
            // }
            className="border"
          >
            <Eye size={8} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            // onClick={() =>
            //   router.push(`/dashboard/questions/edit/${question.id}`)
            // }
            className="border"
          >
            <Pencil size={8} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Delete", question.id)}
            className="border"
          >
            <Trash2 size={8} />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusClass = getStatusClass(status);
      return (
        <Badge variant="outline" className={statusClass}>
          {status.toLowerCase().replace(/^./, (char) => char.toUpperCase())}
        </Badge>
      );
    },
  },
];

function getStatusClass(
  status: "PENDING" | "INREVIEW" | "APPROVED" | "FLAGGED"
) {
  switch (status) {
    case "PENDING":
      return "bg-blue-100 text-blue-800";
    case "INREVIEW":
      return "bg-purple-100 text-purple-800";
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "FLAGGED":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
}

export function QuestionTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);
        const filter =
          searchParams.get("filter") === "-"
            ? undefined
            : STATUS_MAP[searchParams.get("filter") || ""];
        const searchText = searchParams.get("search") || "";

        const data = await getQuestions({ page, pageSize, filter, searchText });
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [searchParams]);

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("search", term);
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={questions} />
    </div>
  );
}
