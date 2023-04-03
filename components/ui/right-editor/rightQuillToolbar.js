export const Modules = {
  toolbar: {
    container: "#Toolbar_Right",
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const QuillToolbar = () => (
  <div id="Toolbar_Right">
    <span className="ql-formats">
      <button className="ql-header" value="1" />
      <button className="ql-header" value="2" />
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-image" />
      <button className="ql-video" />
      <button className="ql-clean" />
    </span>
  </div>
);
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
export const Formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "image",
  "video",
  "clean",
];
