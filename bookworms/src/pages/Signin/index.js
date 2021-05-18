import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import SigninForm from '../../components/SigninForm'
import Helmet from 'react-helmet';

const Signin = () => {
    return (
        <>
        <Helmet>
            <title>BookWorms. - Signin</title>
        </Helmet>
        <LoginLayout padding='8%'>
            <SigninForm />
        </LoginLayout>
        </>
    );
};

export default Signin;