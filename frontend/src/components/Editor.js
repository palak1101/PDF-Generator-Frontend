import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Editor.css';
import { Button } from 'react-bootstrap'

// const api = axios.create({
//     baseURL: 'http://localhost:5000',
// });

const Editor = () => {

    const [html, setHtml] = useState('');
    const resultRef = useRef();

    const handleHtmlChange = (event) => {
        setHtml(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = window.prompt("Enter a title:");

        try {
            const response = await axios.post('http://localhost:5000/save-data', { htmlCode: html, title: title });
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.innerHTML = html;
        }
    }, [html])

    return (
        <div>
            <Button className="save-button" variant="success" onClick={handleSubmit}>Save</Button>{' '}



            <div className="main-editor">

                <div className='html-panel'>
                    <h2>HTML Input</h2>

                    <div className="header-input">
                        <textarea placeholder="Enter header html" />
                    </div>


                    <div className="input-panel">

                        <textarea
                            value={html}
                            onChange={handleHtmlChange}
                            placeholder="Enter HTML code here..."
                        />
                    </div>

                    <div className="footer-input">
                        <textarea placeholder="Enter footer html" />
                    </div>

                </div>



                <div className="preview-panel">
                    <h2>Preview</h2>
                    <div ref={resultRef}></div>
                </div>

            </div>
        </div>
    );
}

export default Editor;