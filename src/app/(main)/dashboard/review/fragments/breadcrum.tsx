"use client";

import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadCrumbProps {
  exam: string;
}

export default function BreadCrumb({ exam }: BreadCrumbProps) {
  const router = useRouter();

  return (
    <Breadcrumb className="mb-6 text-gray-600 text-sm flex items-center">
      <Button onClick={() => router.push("/dashboard/review")} variant="ghost" size="icon" className="mr-2">
        <ArrowLeft className="h-5 w-5 text-gray-600" />
      </Button>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="text-gray-700 hover:underline">
            Review Question
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">More</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>CAT</DropdownMenuItem>
              <DropdownMenuItem>SNAP</DropdownMenuItem>
              <DropdownMenuItem>XAT</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-blue-600 font-medium">
            {exam.toUpperCase()}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
