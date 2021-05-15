import React from 'react';
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SigninForm = () => {
    return (
        <Card style={{ width: '60%', backgroundColor: 'rgba(255, 255, 255, 0.25)' }} className='align-items-start p-3' >
            <Card.Body style={{width: '100%'}}>
                <Form>
                    <h1 className='title-logo text-white pb-3' style={{fontSize:48}}>Signin</h1>

                    <Form.Group className='py-2'>
                        <Form.Label className='text-white'>First Name</Form.Label>
                        <Form.Control className='text-white' type="text" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='text-white'>Last Name</Form.Label>
                        <Form.Control className='text-white' type="text" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label className='text-white'>Email address</Form.Label>
                        <Form.Control className='text-white' type="email" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                    </Form.Group>
                    <Form.Group className='py-2'>
                        <Form.Label className='text-white'>Password</Form.Label>
                        <Form.Control type="password" className='text-white' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}/>
                    </Form.Group>

                    <Form.Group className='pb-3'>
                        <Form.Label className='text-white'>Confirm password</Form.Label>
                        <Form.Control type="password" className='text-white' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}/>
                    </Form.Group>
                    <Button variant="outline-light" type="submit" block>
                        Signin
                    </Button>
                    <Form.Group className='pt-3'>
                        <Form.Text className="text-white text-center">
                            Already have an account? <Link className="text-decoration-none text-white"to='/login'>Login</Link>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default SigninForm;