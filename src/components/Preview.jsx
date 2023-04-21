import React, { useEffect, useRef } from "react";

const Preview = ({ template }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!template.htmlCode) return;
    if (containerRef.current) {
      // Parse the HTML string into a Document object
      const parser = new DOMParser();
      const doc = parser.parseFromString(template.htmlCode, "text/html");
      const styleTags = doc.getElementsByTagName("style");
      let style = "";
      if (styleTags.length > 0) {
        for (let i = 0; i < styleTags.length; i++) {
          const styleContent = styleTags[i].textContent;
          style += styleContent;
        }
      } else {
        console.log("No <style> tags found in the document");
      }

      // Select all elements with the "newpage" class
      const newpageElements = doc.querySelectorAll(".newpage");

      containerRef.current.innerHTML = "";

      // Create an iframe for each "newpage" element
      newpageElements.forEach((el) => {
        const iframe = document.createElement("iframe");

        const newOuterHTML = `<html><head><style>${style}</style></head><body>${el.outerHTML}</body></html>`;
        console.log(newOuterHTML);
        iframe.srcdoc = newOuterHTML;
        iframe.classList.add("preview-iframe");
        iframe.classList.add("m-auto");
        iframe.setAttribute("orientation", template.orientation);
        containerRef.current.appendChild(iframe);
      });
    }
  }, [template]);

  return (
    <div className="text-center">
      <h2 className="text-center">Preview</h2>
      <div
        ref={containerRef}
        style={{
          height: "80vh",
          overflow: "auto",
        }}
        className="previews-container m-auto"
      ></div>
      {/* <iframe
        title="preview"
        srcDoc={template.htmlCode}
        className="preview-iframe"
        orientation={template.orientation}
      /> */}
    </div>
  );
};

export default Preview;
