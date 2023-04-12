import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useParams} from "react-router-dom";



const Home = () => {

    const [templates, setTemplates] = useState([]);


    const loadTemplates = async () => {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/templates/`);
        console.log(result);
        setTemplates(result.data.data);
    }

    const deleteUser = async (id) => {

        try {
            const res2 = await axios.delete(`${process.env.REACT_APP_BASE_URL}/templates/${id}`);
            loadTemplates();
        } catch (error) {
            console.log(error) 
        } 
        
    }


    useEffect(() => {
        // console.log("My App");
        loadTemplates();
    }, [])



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
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{template.title}</td>
                                {/* <td>{templates.htm}</td>
                                <td>{user.email}</td> */}
                                <td>
                                    <Link className="btn btn-primary m-2"><i className="fa-sharp fa-solid fa-eye"></i></Link>
                                    <Link className="btn btn-success m-2"><i className="fa-solid fa-pencil"></i></Link>
                                    <Link className="btn btn-danger m-2" onClick={() => deleteUser(template.template_id)}><i className="fa-solid fa-trash"></i></Link>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
