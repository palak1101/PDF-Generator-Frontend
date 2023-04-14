import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";
import beautify from "js-beautify";

import "./Editor.css";
import { useParams } from "react-router-dom";
import Toolbar from "../components/Toolbar";

const DEFAULT_HTML_CODE = `<html>
\t<head>
\t\t<style>
\t\t\t.newpage{
\t\t\t\tpage-break-before: always;
\t\t\t}
\t\t</style>
\t</head>
\t<body>

\t</body>
</html>`;

const DEFAULT_TEMPLATE = {
  htmlCode: DEFAULT_HTML_CODE,
  title: "",
  template_id: "",
  orientation: "Portrait",
  pageSize: "A4",
};

const EditorPage = () => {
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const { id } = useParams();

  const editorRef = useRef(null);

  const handleFormat = () => {
    if (editorRef.current) {
      const session = editorRef.current.editor.getSession();
      session.getSelection().clearSelection();
      session.setValue(
        beautify.html(session.getValue(), {
          indent_size: 2,
          wrap_attributes: "auto",
          preserve_newlines: false,
        })
      );
    }
  };

  useEffect(() => {
    if (id) {
      getTemplateById(id);
    }
  }, [id]);

  const getTemplateById = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/templates/${id}`)
      .then((response) => {
        const { success, data } = response.data;
        if (!success) {
          return alert("Error loading the selected template!");
        }

        setTemplate(data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error loading the selected template!");
      });
  };

  return (
    <div className="mt-4">
      <Toolbar template={template} setTemplate={setTemplate} />
      <div className="main-editor">
        <div className="html-panel">
          <h2 className="text-center">{template.title || "Code Editor"}</h2>

          <div className="input-panel">
            <AceEditor
              ref={editorRef}
              placeholder="Write your HTML here..."
              mode="html"
              theme="monokai"
              name="html-editor"
              onChange={(code) => setTemplate({ ...template, htmlCode: code })}
              debounceChangePeriod={500}
              fontSize={16}
              width="100%"
              // height="100%"
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              value={template.htmlCode}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                useWorker: false,
              }}
            />
            <button className="btn btn-primary my-2" onClick={handleFormat}>
              Format
            </button>
          </div>
        </div>

        <div className="preview-panel">
          <h2 className="text-center">Preview</h2>
          <iframe
            srcdoc={template.htmlCode}
            className="preview-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
