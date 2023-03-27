import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { QuillToolbar, Modules, Formats } from "./rightQuillToolbar";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const MAX_LENGTH = 10;
const EditorSpace = () => {
  const { data: session } = useSession();
  const [contentState, setContentState] = useState({ value: null });
  const [length, setLength] = useState(0);
  function handleChange(value, delta, source, editor) {
    let length = editor.getLength() - 1;
    console.log(length);
    console.log(value);
    setLength(length);
    setContentState({ value });
  }
  const checkCharacterCount = (event) => {
    if (length >= MAX_LENGTH && event.key !== "Backspace")
      event.preventDefault();
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const blogId = uuidv4().substr(0, 8);
    let { value } = contentState;
    let username = session.user.email;
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          blogId: blogId,
          username: username,
          blog: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error response from server");
      }
    } catch (error) {
      console.error(error);
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
        onKeyDown={checkCharacterCount}
        placeholder={"Write something awesome..."}
      />
      <p className="text-sm mt-2">Character Count {length}</p>
      {length > MAX_LENGTH - 1 && (
        <p className="text-red-500 text-sm mt-2">
          Error: Character count cannot exceed 10.
        </p>
      )}
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
