import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Toolbar = ({ template, setTemplate }) => {
  const navigate = useNavigate();

  const copyTemplateId = () => {
    navigator.clipboard.writeText(template.template_id);
    toast.info("template id copied to clipboard!", {
      autoClose: 1800,
      theme: "dark",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const title = window.prompt("Enter updated title", template.title);
    if (!title) return alert("Please enter title to update the template!");
    const newTemplate = { ...template, title };
    setTemplate(newTemplate);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/templates/${template.template_id}`,
        newTemplate
      );
      let { success, data } = response.data;
      console.log(data);
      if (success) {
        setTemplate(data);
        return toast.success("Template updated successfully!");
      } else {
        return toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const title = window.prompt("Enter a title");
    if (!title) return alert("Please enter title to save the template!");
    const newTemplate = { ...template, title };
    setTemplate(newTemplate);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/templates/`,
        newTemplate
      );
      let { success, data } = response.data;
      console.log(data);
      if (success) {
        toast.success("Template saved successfully!");
        return navigate(`/editor/${data.template_id}`);
      } else {
        return toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-4 px-4 d-flex justify-content-center align-items-center">
      {template?.template_id ? (
        <div>
          <button className="btn btn-primary me-2" onClick={copyTemplateId}>
            <i className="fa-solid fa-copy"></i>&nbsp; Copy template ID
          </button>
          <button
            className="save-button btn btn-success ms-2"
            onClick={handleUpdate}
          >
            <i className="fa-solid fa-pencil"></i>&nbsp; Update Template
          </button>
        </div>
      ) : (
        <button className="save-button btn btn-success" onClick={handleSave}>
          <i className="fa-solid fa-save"></i>&nbsp; Save Template
        </button>
      )}
    </div>
  );
};

export default Toolbar;
