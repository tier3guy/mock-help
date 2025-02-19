"use client";

import { useState, useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import debounce from "lodash/debounce";

type SearchableContent = {
  id: string;
  title?: string;
  question?: string;
};

const url = process.env.NEXT_PUBLIC_BASE_URL;
const SearchServices = {
  QUIZ: async (query: string): Promise<SearchableContent[]> => {
    try {
      const response = await fetch(
        `${url}/quizzes/search?q=${encodeURIComponent(query)}`
      );
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error("Error searching questions:", error);
      return [];
    }
  },
  VIDEO: async (query: string): Promise<SearchableContent[]> => {
    try {
      const response = await fetch(
        `${url}/video-content/search?q=${encodeURIComponent(
          query
        )}`
      );
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error("Error searching videos:", error);
      return [];
    }
  },
  TEXT: async (query: string): Promise<SearchableContent[]> => {
    try {
      const response = await fetch(
        `${url}/texts/search?q=${encodeURIComponent(query)}`
      );
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error("Error searching texts:", error);
      return [];
    }
  },
};

// Content Search Component
interface ContentSearchProps {
  contentType: keyof typeof SearchServices;
  onSelect: (item: SearchableContent) => void;
}

export function ContentSearch({ contentType, onSelect }: ContentSearchProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchableContent[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounced search with improved error handling
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.length > 2) {
        setLoading(true);
        try {
          console.log("Searching for", contentType, value);
          const results = await SearchServices[contentType](value);
          setItems(results);
        } catch (error) {
          console.error(`Error searching ${contentType}:`, error);
          setItems([]);
        } finally {
          setLoading(false);
        }
      }
    }, 300),
    [contentType]
  );

  // Get display label for an item
  const getItemLabel = (item: SearchableContent) =>
    item.question || item.title || "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {`Search ${contentType.toLowerCase()}s...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <div className="space-y-2 p-2">
          <input
            type="text"
            placeholder={`Search ${contentType.toLowerCase()}s...`}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          {loading && <div>Loading...</div>}
          {!loading && items.length === 0 && (
            <div>No {contentType.toLowerCase()}s found.</div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer items-center space-x-2 rounded-md px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              <Check className="h-4 w-4 opacity-0" />
              <span>{getItemLabel(item)}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
