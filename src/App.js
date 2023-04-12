import React from "react";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import EditorPage from "./pages/Editor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/editor" element={<EditorPage />}></Route>
          <Route exact path="/editor/:id" element={<EditorPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
