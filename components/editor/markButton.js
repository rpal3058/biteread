import React from "react";
import { Editor } from "slate";

export const MarkButton = ({ editorState, format, icon }) => {
  return (
    <button
      active={isMarkActive(editorState, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editorState, format);
      }}
    >
      {icon}
    </button>
  );
};

const toggleMark = (editorState, format) => {
  const isActive = isMarkActive(editorState, format);
  if (isActive) {
    Editor.removeMark(editorState, format);
  } else {
    Editor.addMark(editorState, format, true);
  }
};

const isMarkActive = (editorState, format) => {
  const marks = Editor.marks(editorState);
  return marks ? marks[format] === true : false;
};
