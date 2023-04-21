import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="main-navbar">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Template Creator
          </Link>
          <div className="" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/editor"
                >
                  Editor
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/readme"
                >
                  Read me
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
