import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
// import "./Home.css";
import axios from "axios";

const Home = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // console.log("My App");
        loadUsers();
    }, [users])


    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3001/users");
        // console.log(result);
        setUsers(result.data);
    }



    return (
        <div className="container">
            <div className="py-4">
                <h4>Templates</h4>
                <br></br>
                <table class="table">
                    <thead>
                        <tr className="bg-dark text-white">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td> */}
                        {users.map((user, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary m-2"><i class="fa-sharp fa-solid fa-eye"></i></Link>
                                    <Link className="btn btn-success m-2"><i class="fa-solid fa-pencil"></i></Link>
                                    <Link className="btn btn-danger m-2"><i class="fa-solid fa-trash"></i></Link>
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
