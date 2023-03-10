import React, { useState } from "react";
import dynamic from "next/dynamic";
import { QuillToolbar, Modules, Formats } from "./rightQuillToolbar";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const EditorSpace = () => {
  const { data: session } = useSession();
  const [contentState, setContentState] = useState({ value: null });
  const handleChange = (value) => {
    setContentState({ value });
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
