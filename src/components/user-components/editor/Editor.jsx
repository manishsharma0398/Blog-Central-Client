import { useMemo } from "react";
import MagicUrl from "quill-magic-url";
import { useDispatch } from "react-redux";
import ReactQuill, { Quill } from "react-quill";
// import BlotFormatter from "quill-blot-formatter";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";

import { uploadBlogImages } from "../../../features/upload/uploadSlice";

// Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/magicUrl", MagicUrl);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

import "quill/dist/quill.snow.css";
import "./editor.scss";

const Editor = ({
  id,
  value,
  theme,
  onChange,
  innerRef,
  placeholder,
  newImageAddedToQuill,
}) => {
  const dispatch = useDispatch();

  function insertToEditor(url) {
    const editor = innerRef.current.getEditor();
    editor.insertEmbed(editor.getSelection().index, "image", url);
  }

  async function saveToServer(file) {
    const res = await dispatch(uploadBlogImages(file));
    console.log("Getting image object from server: ", res);
    const data = res?.payload;
    const url = data.url;
    newImageAddedToQuill(data);
    insertToEditor(url);
  }

  const selectLocalImage = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      console.log("Getting file from computer: ", file);
      await saveToServer(file);
    };
  };

  async function imageHandler(imageDataUrl, type, imageData) {
    // const blob = imageData.toBlob();
    const file = imageData.toFile();
    await saveToServer(file);
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: selectLocalImage,
        },
      },
      // blotFormatter: {},
      magicUrl: true,
      imageDropAndPaste: {
        handler: imageHandler,
      },
    }),
    []
  );

  return (
    <ReactQuill
      id={id}
      value={value}
      ref={innerRef}
      placeholder={placeholder}
      onChange={onChange}
      theme={theme}
      modules={modules}
    />
  );
};

export default Editor;
