import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import auth from '../../auth/Auth';

const SigninForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await fetch('/signin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                password2
            })
        }).then( res => { return res.json()})
        .then(data => {
            console.log(data.token);
            localStorage.setItem('token', data.token);
            auth.login(()=>{console.log('logged in')});
            history.push('/')
        }).catch( err => {
            console.log(err);
        })
    }

    return (
        <Card style={{ width: '60%', backgroundColor: 'rgba(255, 255, 255, 0.25)' }} className='align-items-start p-3' >
            <Card.Body style={{width: '100%'}}>
                <Form onSubmit={handleSubmit}>
                    <h1 className='title-logo text-white pb-3' style={{fontSize:48}}>Signin</h1>

                    <Form.Group className='py-2'>
                        <Form.Label className='text-white'>First Name</Form.Label>
                        <Form.Control 
                            className='text-white' 
                            type="text" 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='text-white'>Last Name</Form.Label>
                        <Form.Control 
                            className='text-white' 
                            type="text" 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label className='text-white'>Email address</Form.Label>
                        <Form.Control 
                            className='text-white' 
                            type="email" 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            />
                    </Form.Group>
                    <Form.Group className='py-2'>
                        <Form.Label className='text-white'>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            className='text-white' 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            />
                    </Form.Group>

                    <Form.Group className='pb-3'>
                        <Form.Label className='text-white'>Confirm password</Form.Label>
                        <Form.Control 
                            type="password" 
                            className='text-white' 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                            onChange={e => setPassword2(e.target.value)}
                            value={password2}
                            />
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