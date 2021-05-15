import React from 'react';
import LoginForm from '../../components/LoginForm'
import { Container, Row, Col, Image } from 'react-bootstrap'
const Login = () => {
    return (
        <Container 
            fluid 
            style={{ 
                backgroundImage: "url(/images/login-bg.png)",
                height: '100vh',
                width: '100%',
                paddingTop: '15%'
            }}
        >
            <Row className='display-flex align-items-center justify-content-around' >
                <Col className="text-white align-self-center text-align-start" lg={4} sm={12}>
                    <h1 className='title-logo' style={{fontSize:130}}>Book <br/>Worms.</h1>
                </Col>
                <Col className="center-block"lg={5} sm={12} >
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;