import React from 'react';
import Layout from '../../components/Layout';
import PageCover from '../../components/PageCover';
import BookCarousel from '../../components/BookCarousel';
import { Container, Row } from 'react-bootstrap';

const MyBooks = () => {
    return (
        <Layout>
            <PageCover img='images/bookshelf-blue.png' title='My bookshelf'/>
            <Container style={{marginTop: 80}}>
                <Row>
                    <h1>My recomendations</h1>
                    <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- 4 books</p>
                </Row>
                <BookCarousel />
                <Row>
                    <h1 >Want to read</h1>
                    <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- 4 books</p>
                </Row>  
                <BookCarousel />
                <Row>
                    <h1 >Read</h1>
                    <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- 4 books</p>
                </Row>
                <BookCarousel />
            </Container>

        </Layout>
    );
};

export default MyBooks;