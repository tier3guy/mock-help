"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

// Debounce Utility Function
function debounce(func: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Debounced search term state
  const [searchTerm, setSearchTerm] = useState<string>(
    (searchParams.get("search") as string) ?? ""
  );

  // Debounced function to push search parameter to the URL
  const pushSearchParam = debounce((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  }, 1500);

  useEffect(() => {
    const column = table.getColumn("statement");
    if (column) {
      column.setFilterValue(searchTerm);
    }
  }, [searchTerm, table]);

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={searchTerm}
          onChange={(event) => {
            const value = event.target.value;
            setSearchTerm(value); // Update the local state
            pushSearchParam(value); // Push the value to the URL with debounce
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              const params = new URLSearchParams(searchParams.toString());
              params.delete("search"); // Remove the search parameter
              router.push(`?${params.toString()}`); // Update the URL
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
