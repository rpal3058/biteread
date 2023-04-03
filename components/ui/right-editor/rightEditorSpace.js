import React, { useState, useRef, useContext } from "react";
import dynamic from "next/dynamic";
import { QuillToolbar, Modules, Formats } from "./rightQuillToolbar";
import "react-quill/dist/quill.snow.css";
import { contentContext } from "../../../pages/create/index";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const MAX_LENGTH = 60;
const RightEditorSpace = () => {
  const { rightContent, setRightContent } = useContext(contentContext);

  const [length, setLength] = useState(0);
  const prevHTML = useRef(rightContent);

  function handleChange(value, delta, source, editor) {
    let length = editor.getLength() - 1;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editor.getHTML();
    if (tempDiv) {
      const mediaElements = tempDiv.querySelectorAll("img, video");
      mediaElements.forEach((media) => {
        const screenWidth = window.innerWidth;
        media.style.maxWidth = `${screenWidth * 0.2}px`;
        media.style.maxHeight = "auto"; // Change this value as needed
      });
    }
    setLength(length);
    //To prevent infinite loop that might be occurring because rightContent(tempDiv.innerHTML) causes a re-render of the component,
    // which then triggers handleChange again, and so on.
    // We are saving the currentState to ref and checking it with current value. Only if there is a difference do we setContent
    if (tempDiv.innerHTML !== prevHTML.current) {
      setRightContent(tempDiv.innerHTML);
      prevHTML.current = tempDiv.innerHTML;
    }
  }

  const checkCharacterCount = (event) => {
    if (length >= MAX_LENGTH && event.key !== "Backspace")
      event.preventDefault();
  };

  return (
    <div className="mt-12 mx-4 bg-slate-50	 ">
      <QuillToolbar />
      <QuillNoSSRWrapper
        className="h-96"
        modules={Modules}
        formats={Formats}
        theme="snow"
        value={rightContent}
        onChange={handleChange}
        onKeyDown={checkCharacterCount}
        placeholder={"Write something awesome..."}
      />
      <p className="text-sm mt-2">Character Count {length}</p>
      {length > MAX_LENGTH - 1 && (
        <p className="text-red-500 text-sm mt-2">
          Error: Character count cannot exceed {MAX_LENGTH}.
        </p>
      )}
    </div>
  );
};
export default RightEditorSpace;
