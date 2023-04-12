import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const loadTemplates = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/templates/`
    );
    console.log(result);
    setTemplates(result.data.data);
  };

  const deleteTemplate = async (id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/templates/${id}`
      );
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
      <div className="py-4">
        <h4>Templates</h4>
        <br></br>
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td> */}
            {templates.map((template, index) => (
              <tr key={template.template_id}>
                <th scope="row">{index + 1}</th>
                <td>{template.title}</td>
                <td>
                  <Link
                    className="btn btn-success m-2"
                    to={`/editor/${template.template_id}`}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Link>
                  <Link
                    className="btn btn-danger m-2"
                    onClick={() => deleteTemplate(template.template_id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
