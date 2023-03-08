export const Modules = {
  toolbar: {
    container: "#Toolbar",
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const QuillToolbar = () => (
  <div id="Toolbar">
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
  </div>
);
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
export const Formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
  "clean",
];
