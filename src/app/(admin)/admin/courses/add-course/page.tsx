"use client";
import { useState } from "react";

export default function AddCourse() {
  const tabs = ["Basic Information", "Advanced Information", "Publish Course"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const currentIndex = tabs.indexOf(activeTab);

  const handlePrevious = () => {
    if (activeTab === "Basic Information") {
      console.log("Cancel clicked");
    } else {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (activeTab === "Publish Course") {
      console.log("Create Course clicked");
    } else {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleSaveDraft = () => {
    console.log("Save As Draft clicked");
  };

  return (
    <div className="container">
      <div className="flex gap-6 items-center mt-2 ml-4">
        <div className="h-7 w-7 bg-white flex justify-center items-center rounded-full shadow-[0px_4px_4px_rgBA(0,0,0,0.50)]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
              fill="currentColor"
              fillRule="evenodd"
              stroke="currentColor"
              strokeWidth="1.3"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <h2 className="font-bold text-xl [text-shadow:0px_4px_4px_rgba(0,0,0,0.2)]">
          Creating Course
        </h2>
      </div>

      <div className="mt-10 ml-4 bg-white relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg px-8 py-4">
        <div className="flex items-center justify-between px-10">
          <div
            className={`flex justify-center items-center gap-2 p-4 font-medium ${
              activeTab === tabs[0]
                ? "border-b-2 border-[#0266FD] cursor-pointer"
                : "text-[#6E7485] border-b-2 border-transparent cursor-not-allowed"
            }`}
          >
            <img src="/images/icon/Stack.svg" alt="icon" />
            <h1>Basic Information</h1>
          </div>
          <div
            className={`flex justify-center items-center gap-2 p-4 font-medium ${
              activeTab === tabs[1]
                ? "border-b-2 border-[#0266FD] cursor-pointer"
                : "text-[#6E7485] border-b-2 border-transparent cursor-not-allowed"
            }`}
          >
            <img src="/images/icon/ClipboardText.svg" alt="icon" />
            <h1>Advanced Information</h1>
          </div>
          <div
            className={`flex justify-center items-center gap-2 p-4 font-medium ${
              activeTab === tabs[2]
                ? "border-b-2 border-[#0266FD] cursor-pointer"
                : "text-[#6E7485] border-b-2 border-transparent cursor-not-allowed"
            }`}
          >
            <img src="/images/icon/PlayCircle.svg" alt="icon" />
            <h1>Publish Course</h1>
          </div>
        </div>
        <div className="mt-10 ml-4 px-8 mb-20">
          {activeTab === tabs[0] && <BasicInformation />}
          {activeTab === tabs[1] && <AdvancedInformation />}
          {activeTab === tabs[2] && <PublishCourse />}
        </div>

        <footer className="absolute bottom-0 left-0 right-0 px-8 py-4 ml-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="text-[#6E7485] font-medium px-6 py-2 border-2 rounded-sm"
            >
              {activeTab === "Basic Information" ? "Cancel" : "Previous"}
            </button>

            <div className="flex gap-4">
              <button
                onClick={handleSaveDraft}
                className="text-[#6E7485] font-medium px-4 py-2 border-2 rounded-sm"
              >
                Save As Draft
              </button>
              <button
                onClick={handleNext}
                className="text-white bg-[#0266FD] px-4 py-2 rounded-sm font-medium"
              >
                {activeTab === "Publish Course"
                  ? "Create Course"
                  : "Save & Next"}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

const BasicInformation = () => {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseCategory, setCourseCategory] = useState("");
  const [preRequisites, setPreRequisites] = useState("");
  const [description, setDescription] = useState("");

  const wordCount = title.trim() ? title.trim().split(/\s+/).length : 0;

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadFile = () => {
    console.log("Uploading file:", selectedFile);
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Title Input */}
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="title"
          style={{ display: "block", marginBottom: ".5rem" }}
        >
          Title
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            style={{ flex: 1, padding: ".5rem" }}
          />
          <span style={{ marginLeft: ".5rem" }}>{wordCount}/80</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label
            htmlFor="courseCategory"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Course Category
          </label>
          <select
            id="courseCategory"
            value={courseCategory}
            onChange={(e) => setCourseCategory(e.target.value)}
            style={{ width: "100%", padding: ".5rem" }}
          >
            <option value="">Select Course</option>
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
            <option value="course3">Course 3</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label
            htmlFor="courseStructure"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Upload Course Structure
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="file"
              id="courseStructure"
              onChange={handleFileChange}
              style={{ flex: 1 }}
            />
            <span style={{ marginLeft: ".5rem" }}>
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
            {selectedFile && (
              <button
                onClick={handleUploadFile}
                style={{ marginLeft: ".5rem", padding: ".5rem 1rem" }}
              >
                Upload file
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="preRequisites"
          style={{ display: "block", marginBottom: ".5rem" }}
        >
          Pre-requisites
        </label>
        <textarea
          id="preRequisites"
          value={preRequisites}
          onChange={(e) => setPreRequisites(e.target.value)}
          placeholder="Enter pre-requisites"
          style={{
            width: "100%",
            height: "100px",
            padding: ".5rem",
            marginBottom: ".5rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="description"
          style={{ display: "block", marginBottom: ".5rem" }}
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          style={{ width: "100%", height: "150px", padding: ".5rem" }}
        />
      </div>
    </div>
  );
};
const AdvancedInformation = () => {
  return (
    <>
      <div>
        <h3 className="font-medium text-lg mb-2">Course Thumbnail</h3>
        <div className="flex w-2/3  p-4  gap-4">
          <div className="w-[40%]">
            <img
              src="/images/thumbnail.png"
              alt="Course Thumbnail"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-[55%] pl-4">
            <p className="text-md mb-2 text-[#6E7485] font-medium">
              Upload your course Thumbnail here.{" "}
              <span className="text-black"> Important guidelines:</span>{" "}
              1200x800 pixels or 12:8 Ratio. Supported format:{" "}
              <span className="text-black">.jpg, .jpeg, or .png</span>
            </p>
            <div className="flex space-x-2 mt-10">
              <button className="bg-gray-50 text-[#0266FD] font-bold py-2 px-4 rounded-sm flex items-center ">
                <i className="eye-icon mr-1"></i> Preview
              </button>
              <button className="bg-[#E2EEFF] text-[#0266FD] font-bold py-2 px-4 rounded-sm flex gap-2">
                <img src="/images/icon/Upload.svg" alt="icon" />
                Replace
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-medium text-lg mb-2">Course Trailer</h3>
        <div className="flex w-2/3  p-4 gap-4 ">
          <div className="w-[40%]">
            <img
              src="/images/thumbnail.png"
              alt="Course Trailer"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-[55%] pl-4">
            <p className="text-md mb-2 text-[#6E7485] font-medium">
              Students who watch a well-made promo video are 5X more likely to
              enroll in your course.
            </p>
            <div className="flex space-x-2 mt-10">
              <button className="bg-gray-50 text-[#0266FD] font-bold  py-2 px-4  flex items-center  rounded-sm">
                Preview
              </button>
              <button className="bg-[#E2EEFF] text-[#0266FD] font-bold py-2 px-4  rounded-sm flex gap-2">
                <img src="/images/icon/Upload.svg" alt="icon" />
                Replace
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const PublishCourse = () => {
  return (
    <>
      <h3 className="font-medium text-lg mb-2">Message</h3>
      <div className="grid grid-cols-2 gap-4 py-4 px-4">
        <div className="flex flex-col">
          <label className="font-medium text-sm mb-1">Welcome Message</label>
          <textarea
            className="border rounded-lg p-2 h-24 w-full"
            placeholder="Enter course starting message here..."
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm mb-1">
            Congratulations Message
          </label>
          <textarea
            className="border rounded-lg p-2 h-24 w-full"
            placeholder="Enter your course completed message here..."
          ></textarea>
        </div>
      </div>
    </>
  );
};
