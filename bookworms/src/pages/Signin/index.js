import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import SigninForm from '../../components/SigninForm'

const Signin = () => {
    return (
        <LoginLayout padding='8%'>
            <SigninForm />
        </LoginLayout>
    );
};

export default Signin;