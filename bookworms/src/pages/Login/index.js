import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import LoginForm from '../../components/LoginForm'
import Helmet from 'react-helmet';

const Login = () => {
    return (
        <>
        <Helmet>
            <title>BookWorms. - Login</title>
        </Helmet>
        <LoginLayout padding='15%'>
            <LoginForm />
        </LoginLayout>
        </>
    );
};

export default Login;