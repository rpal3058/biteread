import React from "react";
import { Transforms, Editor, Element as SlateElement } from "slate";
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const BlockButton = ({ editorState, format, icon }) => {
  return (
    <button
      active={isBlockActive(
        editorState,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editorState, format);
      }}
    >
      {icon}
    </button>
  );
};
const isBlockActive = (editorState, format, blockType = "type") => {
  const { selection } = editorState;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editorState, {
      at: Editor.unhangRange(editorState, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );
  return !!match;
};

const toggleBlock = (editorState, format) => {
  const isActive = isBlockActive(
    editorState,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editorState, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes < SlateElement > (editorState, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editorState, block);
  }
};
