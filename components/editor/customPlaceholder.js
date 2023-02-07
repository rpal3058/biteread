import React, { useState, useCallback } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import CustomEditor from "./customEditor";
import { Leaf } from "./leaf";
import { Element } from "./elements";
import { MarkButton } from "./markButton";
import { BlockButton } from "./blockButton";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const CustomPlaceholder = () => {
  // Creating a Slate editor object that won't change across renders.
  const [editorState] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    // Add a toolbar with buttons that call the same methods.
    <Slate editor={editorState} value={initialValue}>
      <MarkButton editorState={editorState} format="bold" icon="Bold" />
      {/* <BlockButton editorState={editorState} format="centre" icon="Bullet" /> */}
      <Editable
        editorState={editorState}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        // Hot Keys definition
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editorState);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editorState);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};
export default CustomPlaceholder;
