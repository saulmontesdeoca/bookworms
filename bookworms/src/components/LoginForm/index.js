import React from 'react';
import { Card, Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    return (
        <Card style={{ width: '60%', backgroundColor: 'rgba(255, 255, 255, 0.25)' }} className='align-items-start p-3' >
            <Card.Body style={{width: '100%'}}>
                <Form>
                    <h1 className='title-logo text-white pb-3' style={{fontSize:48}}>Login</h1>
                    <Form.Group >
                        <Form.Label className='text-white'>Email address</Form.Label>
                        <Form.Control className='text-white' type="email" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='py-3'>
                        <Form.Label className='text-white'>Password</Form.Label>
                        <Form.Control type="password" className='text-white' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}/>
                    </Form.Group>
                    <Button variant="outline-light" type="submit" block>
                        Enter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default LoginForm;