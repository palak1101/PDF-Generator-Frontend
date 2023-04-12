import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/pages/Home";
import EditorPage from "./components/pages/EditorPage";
import NavigationBar from "./components/layouts/NavigationBar";
import Footer from "./components/layouts/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/editor" element={<EditorPage />}></Route>
        </Routes>

        <Footer />
      </div>
    </Router>

  );
};

export default App;
