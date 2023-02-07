import { Editor, Transforms, Text } from "slate";

const CustomEditor = {
  isBoldMarkActive(editorState) {
    const [match] = Editor.nodes(editorState, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editorState) {
    const [match] = Editor.nodes(editorState, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editorState) {
    const isActive = CustomEditor.isBoldMarkActive(editorState);
    Transforms.setNodes(
      editorState,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editorState) {
    const isActive = CustomEditor.isCodeBlockActive(editorState);
    Transforms.setNodes(
      editorState,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editorState, n) }
    );
  },
};
export default CustomEditor;
