'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface EnrolledCourseCardProps {
  image?: string | StaticImageData; // Optional image
  category: string;
  courseTitle: string;
  progress: number; // For example: 60 for 60%
  classesCount: number;
  onViewCourse?: () => void;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({
  image,
  category,
  courseTitle,
  progress,
  classesCount,
  onViewCourse,
}) => {
  return (
    <div className="enrolled-course-card min-w-[300px] rounded-xl flex flex-col p-3 bg-white shadow border border-gray-300">
      {/* If an image is provided, show it; otherwise, display a placeholder */}
      {image ? (
        <div className="image-thumbnail relative w-full h-[200px] bg-gray-200 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={courseTitle}
          fill
          className="object-cover"
        />
      </div>
      ) : (
        <div className="image-thumbnail w-full h-[200px] bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="mt-2 pt-2">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            <p className="text-blue-600 font-bold uppercase text-sm tracking-wider">
              {category}
            </p>
            <h2 className="font-semibold pt-2 text-[17px]">{courseTitle}</h2>
            <p className="pt-1">
              Progress: <span className="font-bold">{progress}%</span>
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="ml-auto flex flex-col justify-between items-end">
            <p className="font-medium text-sm text-blue-600">
              {classesCount} <span className="text-slate-400">classes</span>
            </p>
            <button
              className="bg-transparent border border-slate-400 rounded-md px-2 py-1 text-base font-medium transition hover:text-white hover:bg-blue-600"
              onClick={onViewCourse}
            >
              View Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
