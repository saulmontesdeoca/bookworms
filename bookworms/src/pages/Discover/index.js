import React, { useEffect, useState } from 'react';
import DiscoverCarousel from '../../components/DiscoverCarousel';
import Layout from '../../components/Layout';
import PageCover from '../../components/PageCover';
import { Row, Container } from 'react-bootstrap';

const Discover = () => {
    const [romanticBooks, setRomanticBooks] = useState([]);
    const [fictionBooks, setFictionBooks] = useState([]);
    const [misteryBooks, setMisteryBooks] = useState([]);

    useEffect(() => {
        const fetchRomanticBooks = async () => {
            await fetch('/get_romantic')
            .then( res => { res.json()
              .then(data => {
                setRomanticBooks(data.books);
              })})
        }
        const fetchFictionBooks = async () => {
            await fetch('/get_fiction')
            .then( res => { res.json()
              .then(data => {
                setFictionBooks(data.books);
              })})
        }
        const fetchMisteryBooks = async () => {
            await fetch('/get_mistery')
            .then( res => { res.json()
              .then(data => {
                setMisteryBooks(data.books);
              })})
        }
        fetchRomanticBooks();  
        fetchFictionBooks(); 
        fetchMisteryBooks(); 
    },[]);

    return (
        <Layout>
            <PageCover img="images/books-white.png" title="Discover"/>
            {
                misteryBooks &&
                <>
                <Container style={{marginTop: 80, marginBottom: 50}}>
                    <Row>
                        <h3>Best of mistery</h3>
                    </Row>
                </Container>
                <DiscoverCarousel books={misteryBooks}/>
                </>
            }
            {
                romanticBooks &&
                <>
                    <Container style={{marginTop: 80}}>
                        <Row>
                            <h3>Romance bookshelf</h3>
                        </Row>
                    </Container>
                    <DiscoverCarousel books={romanticBooks}/>
                </>
            }
            {
                fictionBooks &&
                <>
                    <Container style={{marginTop: 80}}>
                        <Row>
                            <h3>New releases fiction books</h3>
                        </Row>
                    </Container>
                    <DiscoverCarousel books={fictionBooks}/>
                </>
            }

        </Layout>
    );
};

export default Discover;