"use client";
import React from "react";

export default function MyPage(): JSX.Element {
  const handleStartTest = () => {
    const testUrl = `/main-test`;
    const screenWidth = window.screen.availWidth; // Get the full screen width
    const screenHeight = window.screen.availHeight; // Get the full screen height

    const testWindow = window.open(
      testUrl,
      "_blank",
      `width=${screenWidth},height=${screenHeight},left=0,top=0`
    );

    if (testWindow) {
      // Request full-screen in the new window
      testWindow.onload = () => {
        const element = testWindow.document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        }
      };
    } else {
      alert("Pop-up blocked! Please allow pop-ups for this site.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Test</h1>
      <button
        onClick={handleStartTest}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Test
      </button>
    </div>
  );
}
