import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const itemsPerPage = 5;

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  useEffect(() => {
    const pages = Math.ceil(templates.length / itemsPerPage);
    setTotalPages(pages);
  }, [templates]);

  const getPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return templates.slice(startIndex, endIndex);
  };

  const handlePageClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

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
          {getPageItems().map((template, index) => (
            <tr key={template.template_id}>
              <th scope="row">
                {itemsPerPage * (currentPage - 1) + (index + 1)}
              </th>
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

      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button
                class="page-link"
                aria-label="Previous"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => prev - 1);
                }}
                disabled={currentPage === 1}
              >
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </button>
            </li>

            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                class="page-item"
                onClick={(e) => handlePageClick(e, index + 1)}
                style={{
                  cursor: "pointer",
                }}
              >
                <span class="page-link">{index + 1}</span>
              </li>
            ))}

            <li class="page-item">
              <button
                class="page-link"
                aria-label="Next"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => prev + 1);
                }}
                disabled={currentPage === totalPages}
              >
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
