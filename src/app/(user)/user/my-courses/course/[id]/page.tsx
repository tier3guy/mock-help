"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { NextPage } from 'next';
import Image from 'next/image';
import img from '../../../../../../assets/enrolled course.png';
import img2 from '../../../../../../assets/course-thumbnail.png';
import img3 from '../../../../../../assets/Frame.png';
import img4 from '../../../../../../assets/dummy-profile.png';
import {
  IconCalendar,
  IconClock,
  IconLanguage,
  IconBadge,
  IconStar,
  IconPlayerPlay,
  IconPlayerPause,
} from '@tabler/icons-react';

const Page: NextPage = () => {
  // Get the dynamic courseId from the URL
  const { courseId } = useParams();

  // Local state for course data (can be fetched from an API)
  const [courseData, setCourseData] = useState<any>(null);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [showFullPrerequisite, setShowFullPrerequisite] = useState<boolean>(false);

  // Fetch course data based on courseId (here we use static data for demonstration)
  useEffect(() => {
    // Uncomment and modify the fetch below to load from an API endpoint if needed:
    // fetch(`/api/courses/${courseId}`)
    //   .then((res) => res.json())
    //   .then((data) => setCourseData(data));
    setCourseData({
      title: "CLAT Mind Up Course 2025",
      category: "MBA ENTRANCE",
      trainer: "Mohit Matolia",
      studentsJoined: 512,
      courseDescription: "Lorem ipsum Lorem, ipsum dolor sit ametLorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta provident iusto natus asperiores eaque? Fugiat reiciendis in accusantium quibusdam nam amet magnam error libero beatae inventore tempore quo voluptates dolorem sapiente ad neque, maiores accusamus iure enim odio soluta quasi! Tenetur commodi ducimus officia, similique sapiente quas esse exercitationem ipsam. Amet, doloremque? Odit aut nulla itaque, laborum quidem ipsa harum ex quo quam nemo suscipit voluptatem recusandae tenetur natus adipisci velit fugiat magni consequuntur vel aliquid quae ipsum esse. Quae, dicta vero. Recusandae, fuga, reprehenderit consequuntur eveniet repellat eius quis possimus deserunt, dignissimos id perferendis aspernatur? Accusamus, velit! Explicabo, doloribus?",
      coursePreRequisite: "Lorem ipsum Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta provident iusto natus asperiores eaque? Fugiat reiciendis in accusantium quibusdam nam amet magnam error libero beatae inventore tempore quo voluptates dolorem sapiente ad neque, maiores accusamus iure enim odio soluta quasi! Tenetur commodi ducimus officia, similique sapiente quas esse exercitationem ipsam. Amet, doloremque? Odit aut nulla itaque, laborum quidem ipsa harum ex quo quam nemo suscipit voluptatem recusandae tenetur natus adipisci velit fugiat magni consequuntur vel aliquid quae ipsum esse. Quae, dicta vero. Recusandae, fuga, reprehenderit consequuntur eveniet repellat eius quis possimus deserunt, dignissimos id perferendis aspernatur? Accusamus, velit! Explicabo, doloribus?",
      structure: [
        {
          sectionTitle: "Section 1: Quant",
          topics: [
            {
              category: "Algebra",
              lessons: [
                { title: "Linear Equation: One Variable", duration: "05:00" },
                { title: "Quadratic Equations", duration: "07:30" },
                { title: "Polynomials", duration: "06:45" },
              ],
            },
            {
              category: "Time and Work",
              lessons: [
                { title: "Time and Work Topic 1", duration: "04:00" },
                { title: "Time and Work Topic 2", duration: "05:30" },
              ],
            },
          ],
        },
        {
          sectionTitle: "Section 2: LRDI",
          topics: [
            {
              category: "Logical Reasoning",
              lessons: [
                { title: "Deductive Reasoning", duration: "08:00" },
                { title: "Inductive Reasoning", duration: "06:20" },
              ],
            },
          ],
        },
      ],
      courseSummary: {
        progress: 20,
        startDate: "12th December 2024",
        totalHours: "12 Hours Completion",
        languages: "English, Hindi",
        certificate: "Certificate of Completion",
      },
      instructor: {
        name: "Mohit Matolia",
        title: "Founder & Teacher @ MindUp",
        badge: "Star Instructor",
      },
    });
  }, [courseId]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  // --- Lesson Item Component ---
  const LessonItem: React.FC<{ lesson: { title: string; duration: string } }> = ({ lesson }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    return (
      <div className="flex items-center justify-between p-4 rounded-lg mb-2 border-gray-200 bg-gray-100">
        <div className="flex items-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mr-2 focus:outline-none"
          >
            {isPlaying ? (
              <IconPlayerPause size={16} className="text-blue-600" />
            ) : (
              <IconPlayerPlay size={16} className="text-blue-600" />
            )}
          </button>
          <span className="text-xs">{lesson.title}</span>
        </div>
        <span className="text-[10px] text-gray-500">{lesson.duration}</span>
      </div>
    );
  };

  // --- Topic Category Component ---
  const TopicCategory: React.FC<{ topic: { category: string; lessons: { title: string; duration: string }[] } }> = ({ topic }) => {
    return (
      <div className="mt-4 pb-2 border-b border-gray-200">
        <h3 className="text-xs font-medium uppercase">{topic.category}</h3>
        <div className="mt-2">
          {topic.lessons.map((lesson, idx) => (
            <LessonItem key={idx} lesson={lesson} />
          ))}
        </div>
      </div>
    );
  };

  // --- Section Dropdown Component ---
  const SectionDropdown: React.FC<{ section: { sectionTitle: string; topics: any[] } }> = ({ section }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <div className="border border-gray-300 rounded-lg mb-4">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
        >
          <h3 className="text-base font-semibold">{section.sectionTitle}</h3>
          <span className="text-2xl">{isOpen ? "−" : "+"}</span>
        </div>
        {isOpen && (
          <div className="p-4">
            {section.topics.map((topic, idx) => (
              <TopicCategory key={idx} topic={topic} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container px-4 pr-8 py-2">
      <div className="course-detailed-title bg-transparent">
        <p className="text-base">
          My Courses <span className="font-bold">/ {courseData.title}</span>
        </p>
        <div className="flex gap-[10%] py-8">
          <div className="content">
            <p className="text-blue-600 font-bold uppercase text-sm tracking-wider">
              {courseData.category}
            </p>
            <h1 className="text-5xl leading-[50px] my-4 font-semibold">
              {courseData.title}
            </h1>
            <div className="flex relative gap-2">
              <Image src={img} alt="" width={35} height={30} className="border-2 border-white rounded-full -mr-6" />
              <Image src={img2} alt="" width={35} height={30} className="border-2 border-white rounded-full -mr-6" />
              <Image src={img3} alt="" width={35} height={30} className="border-2 border-white rounded-full -mr-6" />
              <Image src={img} alt="" width={35} height={30} className="border-2 border-white rounded-full -mr-6" />
              <Image src={img} alt="" width={35} height={30} className="border-2 border-white rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{courseData.studentsJoined}</span>
                <span className="text-slate-400 text-xs">Students Joined</span>
              </div>
            </div>
            <div className="flex text-base leading-8 my-6 gap-2">
              <p>Trainer</p>
              <Image src={img4} alt="" width={32} height={29} className="border-2 border-white rounded-full" />
              <p className="font-bold">{courseData.trainer}</p>
            </div>
            <div className="flex gap-6">
              <button className="p-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700">
                Get Started
              </button>
              <button className="p-4 flex items-center rounded-lg bg-white font-semibold shadow border border-slate-400 hover:bg-gray-100">
              Add to Favourites<IconStar size={20} className='ml-2' />
              </button>
            </div>
          </div>
          {/* Image section */}
          <div className="w-[70%] h-[325px] relative">
            <Image
              src={img}
              alt="Enrolled Course"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
      {/* White background section without parent's horizontal padding */}
      <div className="bg-white -ml-8 -mr-12">
        <div className="pl-8 pr-12 py-8 flex gap-12">
          <div className="left-content w-[70%]">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Course Description</h2>
              <p className={`text-xs transition-all duration-300 ${!showFullDescription ? 'line-clamp-3' : ''}`}>
                {courseData.courseDescription}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 mt-2 text-sm"
              >
                {showFullDescription ? 'Read less' : 'Read more'}
              </button>
            </div>
            <div className="content-2">
              <h2 className="text-xl font-semibold mb-4">Pre-Requisites for this Course</h2>
              <p className={`text-xs transition-all duration-300 ${!showFullPrerequisite ? 'line-clamp-3' : ''}`}>
                {courseData.coursePreRequisite}
              </p>
              <button
                onClick={() => setShowFullPrerequisite(!showFullPrerequisite)}
                className="text-blue-600 mt-2 text-sm"
              >
                {showFullPrerequisite ? 'Read less' : 'Read more'}
              </button>
            </div>
            {/* Image section */}
            <div className="w-[100%] h-[130px] relative my-8">
              <Image
                src={img}
                alt="Enrolled Course"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
              />
            </div>
            {/* Course Structure Dropdowns */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Course Structure</h2>
              <p className="text-xs font-medium mb-4">
                {courseData.structure.length} Sections •{" "}
                {courseData.structure.reduce(
                  (acc: number, section: any) =>
                    acc +
                    section.topics.reduce(
                      (subAcc: number, topic: any) => subAcc + topic.lessons.length,
                      0
                    ),
                  0
                )}{" "}
                Chapters
              </p>
              <div className="mt-4">
                {courseData.structure.map((section: any, idx: number) => (
                  <SectionDropdown key={idx} section={section} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="w-[30%] h-[350px] shadow border border-slate-300 rounded-xl p-5">
            <div className="flex justify-between">
              <h2 className="text-base font-semibold leading-10">Course Summary</h2>
              <span className="text-xs font-semibold leading-10 text-blue-600">
                {courseData.courseSummary.progress}% Completed
              </span>
            </div>
            {/* Progress Bar */}
            <div className="my-4">
              <div className="w-full h-2 bg-gray-300 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${courseData.courseSummary.progress}%` }}
                ></div>
              </div>
            </div>
            {/* Course Details with Icons */}
            <div className="text-xs">
              <p className="font-medium leading-6 flex items-center">
                <IconCalendar className="mr-2 text-blue-600" size={16} />
                Started {courseData.courseSummary.startDate}
              </p>
              <p className="font-medium leading-6 flex items-center">
                <IconClock className="mr-2 text-blue-600" size={16} />
                {courseData.courseSummary.totalHours}
              </p>
              <p className="font-medium leading-6 flex items-center">
                <IconLanguage className="mr-2 text-blue-600" size={16} />
                {courseData.courseSummary.languages}
              </p>
              <p className="font-medium leading-6 flex items-center">
                <IconBadge className="mr-2 text-blue-600" size={16} />
                {courseData.courseSummary.certificate}
              </p>
            </div>
            <p className="text-base font-semibold mt-4 mb-2">Instructor</p>
            <div className="profile-details">
              <div className="flex gap-4">
                <Image src={img4} alt="" width={75} height={75} className="border-2 border-white rounded-full" />
                <div>
                  <p className="text-xs font-semibold">{courseData.instructor.name}</p>
                  <p className="text-xs mb-4">{courseData.instructor.title}</p>
                  <span className="uppercase inline-flex bg-blue-600 rounded text-white p-2 font-semibold text-[10px]"> 
                    <IconStar size={14} className='mr-1' />{courseData.instructor.badge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
