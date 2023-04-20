import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [templates, setTemplates] = useState([]);

  const loadTemplates = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/templates/`
    );
    console.log(result);
    setTemplates(result.data.data);
  };

  const copyTemplateId = (templateId) => {
    navigator.clipboard.writeText(templateId);
    toast.info("template id copied to clipboard!", {
      autoClose: 1800,
      theme: "dark",
    });
  };

  const deleteTemplate = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/templates/${id}`);
      loadTemplates();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h4>Templates</h4>
        <Link className="btn btn-success" to="/editor">
          <i className="fa-solid fa-plus"></i>&nbsp; Create new template
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Template ID</th>
            <th scope="col">View</th>
            <th scope="col">Last updated on</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template, index) => (
            <tr key={template.template_id}>
              <th scope="row">{index + 1}</th>
              <td>{template.title}</td>
              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => copyTemplateId(template.template_id)}
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </td>
              <td>
                <Link
                  className="btn btn-success m-2"
                  to={`/editor/${template.template_id}`}
                >
                  <i className="fa-solid fa-eye"></i>
                </Link>
              </td>
              <td>
                <p>{new Date(template.updatedAt).toDateString()}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
