'use client';

import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import thumbnailImg from "../../../../assets/my-course thumbnail.png";
import enrolledCourseImg from "../../../../assets/enrolled course.png";
import CourseCard from './components_K/CourseCard';
import EnrolledCourseCard from './components_K/EnrolledCourseCard';

export default function Page(): JSX.Element {
  const [sortOption, setSortOption] = useState<string>('latest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEnrollmentType, setActiveEnrollmentType] = useState<string>('All');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortOption(event.target.value);
  };

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const enrolledCourseType = [
    "Not Started",
    "Completed",
    "In Progress",
    "My Favourites",
    "All",
  ];

  // Sample enrolled courses data including a "favourite" property.
  const enrolledCourses = [
    {
      id: 1,
      image: enrolledCourseImg,
      category: "LAW ENTRANCE",
      courseTitle: "CLAT Mind Up 2025",
      progress: 0,
      classesCount: 20,
      favourite: false,
    },
    {
      id: 2,
      image: undefined,
      category: "LAW ENTRANCE",
      courseTitle: "Pre Law Basics",
      progress: 100,
      classesCount: 15,
      favourite: true,
    },
    {
      id: 3,
      image: enrolledCourseImg,
      category: "ADVOCACY",
      courseTitle: "Legal Skills 101",
      progress: 50,
      classesCount: 25,
      favourite: false,
    },
    {
      id: 4,
      image: undefined,
      category: "LAW ENTRANCE",
      courseTitle: "Modern Legal Studies",
      progress: 0,
      classesCount: 18,
      favourite: false,
    },
    {
      id: 5,
      image: enrolledCourseImg,
      category: "LAW ENTRANCE",
      courseTitle: "Case Studies",
      progress: 90,
      classesCount: 22,
      favourite: true,
    },
    {
      id: 6,
      image: undefined,
      category: "LAW ENTRANCE",
      courseTitle: "Legal Fundamentals",
      progress: 100,
      classesCount: 10,
      favourite: false,
    },
  ];

  // Filter courses based on the active enrollment type (progress/favourite)
  const filteredCourses = enrolledCourses.filter(course => {
    switch (activeEnrollmentType) {
      case "Not Started":
        return course.progress === 0;
      case "Completed":
        return course.progress === 100;
      case "In Progress":
        return course.progress > 0 && course.progress < 100;
      case "My Favourites":
        return course.favourite === true;
      case "All":
      default:
        return true;
    }
  });

  return (
    <div className="container mx-auto p-4">
      {/* Header with title and sort dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-2xl">Continue Learning</h2>
        <div className="flex items-center">
          <span className="text-sm text-chart-3">Sort by: </span>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="ml-2 text-sm border rounded-md p-2 outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Horizontal scrollable container for course cards */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex gap-4">
          <CourseCard
            thumbnail={thumbnailImg}
            category="CAT MIND UP 2025"
            courseTitle="Quant with Mohit - Day 6"
            progress={80}
            completedLessons={14}
            totalLessons={16}
            onContinueLesson={() => console.log('Continue Lesson clicked')}
            analysisText="Great Going! You are on the right track."
            analysisLinkText="See Analysis →"
          />
          <CourseCard
            thumbnail={thumbnailImg}
            category="CAT MIND UP 2025"
            courseTitle="Quant with Mohit - Day 7"
            progress={60}
            completedLessons={10}
            totalLessons={16}
            onContinueLesson={() => console.log('Continue Lesson clicked')}
            analysisText="Keep pushing forward!"
            analysisLinkText="See Analysis →"
          />
          <CourseCard
            thumbnail={thumbnailImg}
            category="CAT MIND UP 2025"
            courseTitle="Quant with Mohit - Day 8"
            progress={90}
            completedLessons={15}
            totalLessons={16}
            onContinueLesson={() => console.log('Continue Lesson clicked')}
            analysisText="Almost there!"
            analysisLinkText="See Analysis →"
          />
          <CourseCard
            thumbnail={thumbnailImg}
            category="CAT MIND UP 2025"
            courseTitle="Quant with Mohit - Day 9"
            progress={70}
            completedLessons={12}
            totalLessons={16}
            onContinueLesson={() => console.log('Continue Lesson clicked')}
            analysisText="Keep it up!"
            analysisLinkText="See Analysis →"
          />
        </div>
      </div>

      {/* Enrolled Courses section with sort dropdown, search bar, and enrollment type filters */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-2xl">Enrolled Courses</h2>
          <div className="flex items-center">
            <span className="text-sm text-chart-3">Sort by: </span>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="ml-2 text-sm border rounded-md p-2 outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* Search Bar */}
            <div className="relative ml-4">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-chart-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a course"
                className="pl-10 pr-4 py-2 border rounded-md text-sm text-chart-3 placeholder:text-chart-3 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Enrollment Type Filter Buttons */}
        <div className="flex gap-5 mb-4">
          {enrolledCourseType.map((enrollmentType, index) => (
            <button
              key={index}
              onClick={() => setActiveEnrollmentType(enrollmentType)}
              className={`uppercase border border-slate-400 rounded-md p-2 text-xs font-medium transition ${
                activeEnrollmentType === enrollmentType
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-600 hover:text-white text-chart-3"
              }`}
            >
              {enrollmentType}
            </button>
          ))}
        </div>

        {/* Enrolled Courses Grid */}
        <div className="course-enrolled mt-5">
          <div className="grid grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <EnrolledCourseCard
                key={course.id}
                image={course.image}
                category={course.category}
                courseTitle={course.courseTitle}
                progress={course.progress}
                classesCount={course.classesCount}
                onViewCourse={() =>
                  console.log(`View Course clicked: ${course.courseTitle}`)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
