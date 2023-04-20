import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";
import beautify from "js-beautify";
import { toast } from "react-toastify";

const SchemaGenerator = ({ template }) => {
  const [schema, setSchema] = useState({
    data: {},
  });
  const [json, setJson] = useState("");

  useEffect(() => {
    if (!schema) return;
    setJson(
      beautify(JSON.stringify(schema), {
        indent_size: 2,
        wrap_attributes: "auto",
        preserve_newlines: false,
      })
    );
  }, [schema]);

  useEffect(() => {
    if (!template) return;
    const localSchema = {};
    if (template.template_id) {
      localSchema["template_id"] = template.template_id;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(template?.htmlCode, "text/html");
    // Select all elements with data attributes
    const textElements = doc.querySelectorAll("[data-text]");
    const imgElements = doc.querySelectorAll("[data-img]");
    const tableElements = doc.querySelectorAll("[data-table]");

    const data = {};

    textElements.forEach((element) => {
      const key = element.getAttribute("data-text");
      data[key] = "TEXT VALUE";
    });
    imgElements.forEach((element) => {
      const key = element.getAttribute("data-img");
      data[key] = "Image Source Link";
    });
    tableElements.forEach((element) => {
      const key = element.getAttribute("data-table");
      data[key] = [
        {
          className: "css-class for <tr>",
          id: "css-id",
          data: [
            {
              className: "css-class for <td>",
              id: "css-id",
              data: "text/html to be inserted in <td>",
            },
            {
              className: "css-class for second <td>",
              id: "css-id",
              data: "text/html to be inserted in <td>",
            },
          ],
        },
      ];
    });

    localSchema["data"] = data;

    setSchema(localSchema);
  }, [template]);

  const copySchema = () => {
    navigator.clipboard.writeText(json);
    toast.info("schema copied to clipboard!", {
      autoClose: 1800,
      theme: "dark",
    });
  };

  return (
    <div className="text-center">
      <div className="d-flex flex-row align-items-center justify-content-center">
        <h5 className="mb-0">JSON Request Schema</h5>
        <button className="btn btn-dark m-2" onClick={copySchema}>
          <i className="fa-solid fa-copy"></i>&nbsp;Copy Schema
        </button>
      </div>

      <AceEditor
        placeholder="JSON Schema"
        mode="json"
        theme="dracula"
        name="json-editor"
        // onChange={(code) => setJson(code)}
        debounceChangePeriod={500}
        fontSize={12}
        width="100%"
        value={json}
        readOnly={true}
        // height="100%"
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: false,
          tabSize: 2,
          useWorker: false,
        }}
      />
    </div>
  );
};

export default SchemaGenerator;
