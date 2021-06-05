import React from 'react';
import Layout from '../../components/Layout';
import SearchCover from '../../components/SearchCover';
import Helmet from 'react-helmet';

const Search = () => {
    return (
        <>
            <Helmet>
                <title>BookWorms. - Search</title>
            </Helmet>
            <Layout>
                <SearchCover />
            </Layout>
        </>
    );
};

export default Search;