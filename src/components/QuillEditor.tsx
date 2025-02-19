"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

//@ts-expect-error - Katex is not a module
import katex from "katex";
import "katex/dist/katex.min.css";

if (typeof window !== "undefined") {
  (window as any).katex = katex;
}

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null);
  const [editorHtml, setEditorHtml] = useState(value);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const toolbar = quill.getModule("toolbar") as any;
    if (toolbar) {
      toolbar.addHandler("image", () => handleImageUpload(quill));
    }
  }, []);



  const handleImageUpload = async (quill: any) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    console.log("🚀 ~ input.click= ~ input:", input)
  
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
   
        console.log("File name:", file.name);
        console.log("File type:", file.type);
        console.log("FormData content:", [...formData.entries()]);
        
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
            formData,            
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },                       
            }
          );
   
          if (response.status === 201) {
            console.log("Image uploaded:", response.data.imageUrl);
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", response.data.imageUrl);
          } else {
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };
   
  };
  
  

  const handleEditorChange = (content: string) => {
    setEditorHtml(content);
    onChange(content);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // Text styles
      ["blockquote", "code-block"], // Block elements
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ script: "sub" }, { script: "super" }], // Superscript/subscript
      [{ header: [1, 2, 3, false] }], // Headings

      ["link", "image", "formula"], // Media
      [{ color: [] }, { background: [] }], // Colors
      [{ align: [] }], // Alignment
      ["clean"], // Remove formatting
    ],
    clipboard: {
      matchVisual: false, // Prevent extra line breaks when pasting HTML
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "header",
    "link",
    "image",
    "formula",
    "color",
    "background",
    "align",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={editorHtml}
      onChange={handleEditorChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="Write something..."
      className="bg-white"
    />
  );
}
