import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "./Editor.css";

const DEFAULT_HTML_CODE = `
<html>
\t<head>
\t\t<style>
\t\t\t.newpage{
\t\t\t\tpage-break-before: always;
\t\t\t}
\t\t</style>
\t</head>
\t<body>

\t</body>
</html>
`;

const EditorPanel = () => {
  const [html, setHtml] = useState(DEFAULT_HTML_CODE);
  const resultRef = useRef();

  const handleHtmlChange = (event) => {
    setHtml(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = window.prompt("Enter a title:");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/saveTemplate`,
        {
          htmlCode: html,
          title: title,
        }
      );
      let res = response.data;
      console.log(res);

      if (res.success) {
        return alert(
          "Template saved successfully with ID: " + res?.data?.template_id
        );
      } else {
        return alert("Something went wrong " + res?.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.innerHTML = html;
    }
  }, [html]);

  return (
    <div className="mt-4">
      <div className="main-editor">
        <div className="html-panel">
          <h2>HTML Input</h2>

          <div className="input-panel">
            {/* <textarea
              value={html}
              onChange={handleHtmlChange}
              placeholder="Enter HTML code here..."
            /> */}

            <Editor
              value={html}
              onValueChange={(value) => setHtml(value)}
              highlight={(code) => highlight(code, languages.text)}
              padding={20}
              placeholder={"WRITE YOUR HTML HERE"}
            />
          </div>
        </div>

        <div className="preview-panel">
          <h2>Preview</h2>
          <div ref={resultRef}></div>
        </div>
      </div>

      <button className="save-button btn btn-success" onClick={handleSubmit}>
        Save Template
      </button>
    </div>
  );
};

export default EditorPanel;
