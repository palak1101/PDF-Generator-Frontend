import React from "react";
import "./Readme.css";

const Readme = () => {
  return (
    <div className="readme-container container">
      <h3 className="text-center">PDF Generation Service</h3>
      <br></br>
      <h4 className="mb-3">About the application:</h4>
      <p>
        <h5>Home Page</h5>A home page will display a list of templates saved in
        the database, along with option to view/edit them and a button to copy
        its template_id.
      </p>
      <p>
        <h5>Editor Page</h5>
        <p>
          <b>HTML Code Editor:</b> User will be able to write or paste the html
          code in here.
        </p>
        <p>
          <b>JSON Schema Viewer:</b> A json will be shown here according to the
          html written by user, this will include a template_id and data. This
          data contains all the dynamic fields in the document, we can replace
          their values according to our requirements and generate the pdf.
        </p>
        <p>
          <b>Toolbar:</b> User can customise the page as portrait/landscape,
          will be able to save/update the template and copy its template_id.
        </p>
        <p>
          <b>Preview:</b> The preview of html written will be shown here, it
          will help user to visualise user that how the final pdf document will
          be looking.
        </p>
      </p>
      <br></br>
      <h4>Read Me:</h4>
      <ol>
        <li className="mb-4">
          The home page displays a list of templates that have been previously
          saved."
        </li>
        <li className="mb-4">
          The buttons 'template_id' and 'view' are provided to get the
          template_id of the specific template and view the template.
        </li>
        <li className="mb-4">
          Using 'create new template' button, a new template can be created.
        </li>
        <li className="mb-4">
          On the 'Editor Page', you can use the Code Editor to create or modify
          a template.
        </li>
        <li className="mb-4">
          The 'Preview Panel' is used to visualize the template in the PDF
          format.
        </li>
        <li className="mb-4">
          The options to change the page orientation to 'Portrait' or
          'Landscape' are provided to meet the user's preferences.
        </li>
        <li>
          "The 'Update Template' button enables users to update or add changes
          to a specific template."
        </li>
      </ol>
      <br></br>
      <h4>Assumptions:</h4>
      <ol>
        <li className="mb-4">
          To generate pdf using a specific template with dynamic value, follow
          below instructions-
        </li>
        <ul>
          <li className="mb-4">
            Add attributes to the tags where you want to add dynamic data. Use
            one of the following attributes based on your requirements:
          </li>
          <ul className="mb-4">
            <li>`data-text` for adding dynamic text</li>
            <li>`data-img` for adding dynamic images</li>
            <li>`data-table` for adding dynamic table</li>
          </ul>
          <ul className="mb-4">
            <li>
              <code>data-text="key-for-text"</code>
            </li>
            <li>
              <code>data-img="key-for-image"</code>
            </li>
            <li>
              <code>data-table="key-for-table"</code>
            </li>
          </ul>
          <li className="mb-4">
            After adding the attribute, give a value to the attribute that will
            be used as the key to add dynamic value to the tag which will be
            used in the pdf generation api.
          </li>
        </ul>
        <li className="mb-4">
          Avoid using the `flex` property to style elements. Instead, use tables
          to achieve a similar effect.
        </li>
        <li className="mb-4">
          Avoid using max-width and max-height to style elements.
        </li>
        <li className="mb-4">
          It is generally not recommended to use percentage values to set the
          size of elements.
        </li>
        <li>
          To see the content of the `div` in newpage, add class="newpage" to the
          particular `div`.
        </li>
      </ol>
    </div>
  );
};

export default Readme;
