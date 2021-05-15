import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm'

const LoginLayout = (props) => {
    return (
        <Container 
            fluid 
            style={{ 
                backgroundImage: "url(/images/login-bg.png)",
                height: '100vh',
                width: '100%',
                paddingTop: props.padding
            }}
        >
            <Row className='display-flex align-items-center justify-content-around' >
                <Col className="text-white align-self-center text-align-start" lg={4} sm={12}>
                    <h1 className='title-logo' style={{fontSize:130}}>Book <br/>Worms.</h1>
                </Col>
                <Col className="center-block"lg={5} sm={12} >
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
};

export default LoginLayout;