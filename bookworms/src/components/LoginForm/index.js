import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import auth from '../../auth/Auth';

const apiRoute = process.env.DEV_API;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await fetch('/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then( async res => { 
            if(!res.ok){
                throw new Error('User or password incorrect');
            }
            return await res.json();
        })
        .then(data => {
            console.log(data.token);
            localStorage.setItem('token', data.token);
            auth.login(()=>{console.log('logged in')});
            history.push('/');
        }).catch( err => setError(err.message));
    }

    return (
        <Card style={{ width: '60%', backgroundColor: 'rgba(255, 255, 255, 0.25)' }} className='align-items-start p-3' >
            <Card.Body style={{width: '100%'}}>
                <Form onSubmit={handleSubmit}>
                    <h1 className='title-logo text-white pb-3' style={{fontSize:48}}>Login</h1>
                    <Form.Group >
                        <Form.Label className='text-white'>User</Form.Label>
                        <Form.Control 
                            className='text-white'
                            type="email" 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='py-3'>
                        <Form.Label className='text-white'>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            className='text-white' 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            />
                    </Form.Group>
                    {
                        error &&
                            <Alert variant='danger' onClose={() => setError('')} dismissible>
                                {error}
                            </Alert>
                    }
                    <Button variant="outline-light" type="submit" block>
                        Login
                    </Button>
                    <Form.Group className='pt-3'>
                        <Form.Text className="text-white text-center">
                            Don't have an account? <Link className="text-decoration-none text-white"to='/signin'>Signin</Link>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default LoginForm;