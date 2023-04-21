import React from "react";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Readme from "./pages/Readme";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/editor" element={<EditorPage />}></Route>
          <Route exact path="/editor/:id" element={<EditorPage />}></Route>
          <Route exact path="/readme" element={<Readme />}></Route>
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
