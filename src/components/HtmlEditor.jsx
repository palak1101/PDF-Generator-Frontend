import React, { useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";
import beautify from "js-beautify";

const HtmlEditor = ({ code, changeCode }) => {
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

  return (
    <div className="text-center">
      <div className="d-flex flex-row align-items-center justify-content-center">
        <h5 className="mb-0">HTML Editor</h5>
        <button className="btn btn-dark m-2" onClick={handleFormat}>
          <i className="fa-solid fa-file-code"></i>&nbsp; Format
        </button>
      </div>
      <AceEditor
        ref={editorRef}
        placeholder="Write your HTML here..."
        mode="html"
        theme="monokai"
        name="html-editor"
        onChange={changeCode}
        debounceChangePeriod={500}
        fontSize={16}
        width="100%"
        // height="100%"
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
        }}
      />
    </div>
  );
};

export default HtmlEditor;
