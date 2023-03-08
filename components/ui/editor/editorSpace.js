import React, { useState } from "react";
import dynamic from "next/dynamic";
import { QuillToolbar, Modules, Formats } from "./quillToolbar";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const EditorSpace = () => {
  const [contentState, setContentState] = useState({ value: null });
  const [loading, setLoading] = useState(false);
  const handleChange = (value) => {
    setContentState({ value });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let { value } = contentState;
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          username: "test",
          blog: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
      setStatus(error);
    }
  };

  return (
    <div className="mx-2 ">
      <QuillToolbar />
      <QuillNoSSRWrapper
        className="h-96"
        modules={Modules}
        formats={Formats}
        theme="snow"
        value={contentState.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-sm text-sm"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditorSpace;
