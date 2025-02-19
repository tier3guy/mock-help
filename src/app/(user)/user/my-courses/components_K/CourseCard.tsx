'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface CourseCardProps {
  thumbnail: StaticImageData;
  category: string;
  courseTitle: string;
  progress: number; // e.g. 80 for 80%
  completedLessons: number;
  totalLessons: number;
  onContinueLesson?: () => void;
  analysisText?: string;
  analysisLinkText?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  thumbnail,
  category,
  courseTitle,
  progress,
  completedLessons,
  totalLessons,
  onContinueLesson,
  analysisText = "Great Going! You are on the right track.",
  analysisLinkText = "See Analysis →",
}) => {
  return (
    <div className="card flex-col rounded-xl shadow border border-gray-300 overflow-hidden flex-shrink-0 min-w-[320px]">
      <div className="flex p-3 gap-5 bg-white rounded-xl">
        {/* col-1: Image container with width fit-content */}
        <div className="col-1 w-fit">
          <Image
            src={thumbnail}
            alt="Thumbnail"
            className="rounded-md object-cover"
          />
        </div>

        {/* col-2: Text content and progress */}
        <div className="col-2 flex flex-col justify-center">
          <p className="text-blue-600 font-bold capitalize text-sm tracking-wider">
            {category}
          </p>
          <h2 className="font-semibold text-[22px]">{courseTitle}</h2>
          <p>
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

        {/* col-3: Lesson count and button */}
        <div className="col-3 ml-auto flex flex-col justify-between items-end">
          <p className="font-medium text-sm text-blue-600">
            {completedLessons}/{totalLessons} <span className="text-slate-400">lesson</span>
          </p>
          <button
            onClick={onContinueLesson}
            className="bg-transparent border border-slate-400 rounded-md px-2 py-1 text-base font-medium transition hover:text-white hover:bg-blue-600"
          >
            Continue Lesson
          </button>
        </div>
      </div>

      {/* Footer with analysis info */}
      <div className="flex p-3 text-base bg-gray-200">
        <p className="font-medium">{analysisText}</p>
        <span className="font-bold text-blue-600 ml-auto">{analysisLinkText}</span>
      </div>
    </div>
  );
};

export default CourseCard;
