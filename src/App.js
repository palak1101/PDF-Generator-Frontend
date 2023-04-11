import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import EditorPage from "./components/Editor";

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <EditorPage />
    </div>
  );
};

export default App;
