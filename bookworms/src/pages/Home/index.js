import React from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import auth from '../../auth/Auth';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>BookWorms. - Home</title>
            </Helmet>
            <Layout>
                {auth.getToken()}
            </Layout>
        </>
    );
};

export default Home;