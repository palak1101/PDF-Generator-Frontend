import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Editor.css";
import { useParams } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import SchemaGenerator from "../components/SchemaGenerator";
import HtmlEditor from "../components/HtmlEditor";

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
      <div className="main-editor d-flex flex-column justify-content-between ">
        <div className="html-panel">
          <h2 className="text-center">{template.title}</h2>

          <div className="row">
            <div className="html-section col-md-6 p-0">
              <HtmlEditor
                code={template.htmlCode}
                changeCode={(newCode) =>
                  setTemplate({ ...template, htmlCode: newCode })
                }
              />
            </div>
            <div className="schema-section col-md-6 p-0">
              <SchemaGenerator template={template} />
            </div>
          </div>
        </div>

        <Toolbar template={template} setTemplate={setTemplate} />

        <div className="preview-panel">
          <h2 className="text-center">Preview</h2>
          <iframe
            srcDoc={template.htmlCode}
            className="preview-iframe"
            orientation={template.orientation}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
