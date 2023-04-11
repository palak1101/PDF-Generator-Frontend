import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";
import Editor from "./components/Editor";
import Footer from "./components/Footer";
// import {Button} from 'react-bootstrap'

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Editor />
    </div>
  );
};

export default App;
