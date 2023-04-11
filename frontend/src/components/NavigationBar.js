import React from 'react';
import {Container, Navbar} from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <div className="main-navbar">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">HTML Viewer</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar;