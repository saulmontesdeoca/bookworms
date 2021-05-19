import React from 'react';
import { Container } from 'react-bootstrap';
import Nav from '../Nav';

const Layout = (props) => {
    return (
        <>
            <Nav />
            {props.children}
        </>
    );
};

export default Layout;