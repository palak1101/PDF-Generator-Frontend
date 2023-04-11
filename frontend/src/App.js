import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './components/NavigationBar';
import Editor from './components/Editor';
import Footer from './components/Footer';
// import {Button} from 'react-bootstrap'

const App = () => {

  // const handleClick = () => {
  //   toast.success('Template Saved!', {
  //     position: 'top-right',
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // };

  return (
    <div className="App">
      <NavigationBar />
      {/* <Button className="save-button" variant="success">Save</Button>{' '} */}
      <ToastContainer />
      <Editor />
      <Footer />
    </div>
  );
}

export default App;
