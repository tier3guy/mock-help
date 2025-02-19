"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClipboardCheck, Flag, Hourglass } from "lucide-react";

const formatKey = (key: string, isTopLevel: boolean) => {
  if (isTopLevel) return key.toUpperCase();
  return key
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const renderAccordion = (
  data: any,
  path: string = "",
  isTopLevel = false
) => {
  return Object.entries(data).map(([key, value], index) => {
    const formattedKey = formatKey(key, isTopLevel);
    const newPath = path ? `${path}/${key}` : key;

    if (typeof value === "string") {
      return (
        <Accordion key={newPath} type="single" collapsible>
          <AccordionItem
            value={newPath}
            className="border rounded-lg shadow-md mb-3"
          >
            <AccordionTrigger className="flex justify-between items-center px-6 py-4 bg-white rounded-lg hover:bg-gray-100 transition-all">
              <span className="font-medium text-lg text-gray-700">
                {index + 1}. {formattedKey}
              </span>
              <span className="ml-auto px-3 py-1 bg-gray-100 text-gray-800 font-bold rounded-md mx-2">
                400
              </span>
            </AccordionTrigger>
            <AccordionContent className="p-6 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="flex flex-col items-center border border-blue-200 rounded-md p-4 bg-gradient-to-b from-blue-50 to-white shadow-sm">
                  <Hourglass className="h-6 w-6 text-blue-600" />
                  <span className="text-blue-700 font-medium text-sm mt-2">
                    In Review
                  </span>
                  <div className="mt-1 px-4 py-1 bg-blue-100 text-blue-800 rounded-md font-semibold shadow-inner text-lg">
                    50
                  </div>
                </div>
                <div className="flex flex-col items-center border border-red-200 rounded-md p-4 bg-gradient-to-b from-red-50 to-white shadow-sm">
                  <Flag className="h-6 w-6 text-red-600" />
                  <span className="text-red-700 font-medium text-sm mt-2">
                    Flagged
                  </span>
                  <div className="mt-1 px-4 py-1 bg-red-100 text-red-800 rounded-md font-semibold shadow-inner text-lg">
                    30
                  </div>
                </div>
                <div className="flex flex-col items-center border border-green-200 rounded-md p-4 bg-gradient-to-b from-green-50 to-white shadow-sm">
                  <ClipboardCheck className="h-6 w-6 text-green-600" />
                  <span className="text-green-700 font-medium text-sm mt-2">
                    Approved
                  </span>
                  <div className="mt-1 px-4 py-1 bg-green-100 text-green-800 rounded-md font-semibold shadow-inner text-lg">
                    320
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <Accordion key={newPath} type="single" collapsible>
        <AccordionItem
          value={newPath}
          className="border rounded-lg shadow-md mb-3"
        >
          <AccordionTrigger className="flex justify-between items-center px-6 py-4 bg-white rounded-lg hover:bg-gray-100 transition-all">
            <span className="font-medium text-lg text-gray-700">
              {formattedKey}
            </span>
          </AccordionTrigger>
          <AccordionContent className="p-4 space-y-4 bg-gray-50 rounded-lg">
            {renderAccordion(value, newPath, false)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
};
