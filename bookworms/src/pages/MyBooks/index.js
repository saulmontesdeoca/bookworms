import React from 'react';
import Layout from '../../components/Layout';
import PageCover from '../../components/PageCover';
import BookCarousel from '../../components/BookCarousel';
import { Container } from 'react-bootstrap';

const MyBooks = () => {
    return (
        <Layout>
            <PageCover img='images/bookshelf-blue.png' title='My bookshelf'/>
            <Container style={{marginTop: 80}}>
              <h1 style={{marginBottom: 20}}>My recomendations</h1>
              <BookCarousel />
              <h1 style={{marginBottom: 20}}>Want to read</h1>
              <BookCarousel />
              <h1 style={{marginBottom: 20}}>Read</h1>
              <BookCarousel />
            </Container>

        </Layout>
    );
};

export default MyBooks;