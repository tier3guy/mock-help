import React from "react";
import {
  Video,
  Clock,
  Plus,
  Edit,
  Eye,
  BarChart2,
  Info,
} from "lucide-react";
import CourseThumbnail from "@/assets/course-thumbnail.png"
import Image from "next/image";

/** A reusable StatusTag component */
export interface IStatusTagProps {
  text: string;
}
export function StatusTag({ text }: IStatusTagProps) {
  const isPublished = text === "Published";
  return (
    <span
      className={`inline-block border ${isPublished ?
        "text-green-700 bg-green-100 border-green-300" : "text-red-600 bg-red-100 border-red-300"
      } px-2 py-1 text-xs font-medium rounded-full`}>
      {text}
    </span>
  );
}

/** CardHeader: receives brand, title, etc. */
export interface ICardHeaderProps {
  brandName: string;
  courseTitle: string;
  subtitle: string;
  status: string; // e.g., "Published"
}
export function CardHeader({
  brandName,
  courseTitle,
  subtitle,
  status,
}: ICardHeaderProps) {
  return (
    <div className="relative text-white h-40 rounded-lg overflow-hidden">
      <Image src={CourseThumbnail} alt="course-banner" className="h-full w-full object-cover" />

      {/* "Published" tag in the top-right corner */}
      <div className="absolute top-2 right-2">
        <StatusTag text={status} />
      </div>
    </div>
  );
}

/** CardDetails: receives recordings, hours, category, etc. */
export interface ICardDetailsProps {
  recordingsCount: number;
  totalHours: number;
  categoryName: string;
  courseName: string;
  studentsCount: number;
  avatars: string[]; // array of avatar URLs
}
export function CardDetails({
  recordingsCount,
  totalHours,
  categoryName,
  courseName,
  studentsCount,
  avatars,
}: ICardDetailsProps) {
  return (
    <div className="py-4 px-2 space-y-3">
      {/* Stats row */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2 bg-[#F6F6F6] p-2 rounded-md">
          <Video className="w-4 h-4 text-[#0266FD]" />
          <span>{recordingsCount} Recordings</span>
        </div>
        <div className="flex items-center gap-2 bg-[#F6F6F6] p-2 rounded-md">
          <Clock className="w-4 h-4 text-[#0266FD]" />
          <span>{totalHours} Hours</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Category & Course Name */}
        <div className="my-3">
            <p className="font-semibold text-sm uppercase text-[#0266FD]">{categoryName}</p>
            <h3 className="font-bold text-gray-800 text-lg">
                {courseName}
            </h3>
        </div>
      </div>

      <div className="mt-4 mb-2 flex items-center justify-between">
        {/* Avatars */}
        <div className="flex items-center">
            {avatars.map((avatarUrl, idx) => (
            <img
                key={idx}
                src={avatarUrl}
                alt={`Avatar ${idx}`}
                className="w-8 h-8 rounded-full object-cover"
            />
            ))}
        </div>
        {/* Students */}
        <button className="uppercase text-sm font-medium p-2 border-2 border-slate-200 rounded-md shadow-md">
            View <span className="text-blue-600 ">{studentsCount}</span> Students
        </button>
      </div>
    </div>
  );
}

/** CardFooter: static or can receive props if needed */
export interface ICardFooterProps {
  // You could define props for button labels, callbacks, etc.
}
export function CardFooter(/* props: ICardFooterProps */) {
  return (
    <div className="flex items-center justify-between">
      {/* Left actions */}
      <div className="flex items-center justify-between gap-2 text-sm w-full px-1">
        <button className="flex flex-col items-center gap-1">
          <div className="bg-[#0266FD] rounded-full h-14 w-14 border border-gray-300 flex items-center justify-center text-white">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-semibold text-center">Content</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="bg-white rounded-full h-14 w-14 border border-gray-300 flex items-center justify-center text-[#0266FD]">
            <Edit className="w-6 h-6" />
          </div>
          <span className="font-semibold text-center">Edit</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="bg-white rounded-full h-14 w-14 border border-gray-300 flex items-center justify-center text-[#0266FD]">
            <Eye className="w-6 h-6" />
          </div>
          <span className="font-semibold text-center">Preview</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="bg-white rounded-full h-14 w-14 border border-gray-300 flex items-center justify-center text-[#0266FD]">
            <BarChart2 className="w-6 h-6" />
          </div>
          <span className="font-semibold text-center">Analytics</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="bg-white rounded-full h-14 w-14 border border-gray-300 flex items-center justify-center text-[#0266FD]">
            <Info className="w-6 h-6" />
          </div>
          <span className="font-semibold text-center">Analytics</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Main CourseCard component:
 * Accepts a single JSON data object and distributes
 * fields to subcomponents.
 */
export interface ICourseCardProps {
  brandName: string;
  courseTitle: string;
  subtitle: string;
  status: string;
  recordingsCount: number;
  totalHours: number;
  categoryName: string;
  courseName: string;
  studentsCount: number;
  avatars: string[];
}
export default function CourseCard(data: ICourseCardProps) {
  // Destructure the data object
  const {
    brandName,
    courseTitle,
    subtitle,
    status,
    recordingsCount,
    totalHours,
    categoryName,
    courseName,
    studentsCount,
    avatars,
  } = data;

  return (
    <div className="max-w-sm w-full bg-white rounded-xl border border-gray-300 p-2 overflow-hidden">
      <CardHeader
        brandName={brandName}
        courseTitle={courseTitle}
        subtitle={subtitle}
        status={status}
      />
      <CardDetails
        recordingsCount={recordingsCount}
        totalHours={totalHours}
        categoryName={categoryName}
        courseName={courseName}
        studentsCount={studentsCount}
        avatars={avatars}
      />
      <CardFooter />
    </div>
  );
}
