import React, { useEffect, useState } from 'react';
import DiscoverCarousel from '../../components/DiscoverCarousel';
import Layout from '../../components/Layout';
import PageCover from '../../components/PageCover';
import Helmet from 'react-helmet';
import { Row, Container } from 'react-bootstrap';

const Discover = () => {
    const [romanticBooks, setRomanticBooks] = useState([]);
    const [fantasyBooks, setFantasyBooks] = useState([]);
    const [misteryBooks, setMisteryBooks] = useState([]);
    const [classicBooks, setClassicBooks] = useState([]);

    useEffect(() => {
        const fetchRomanticBooks = async () => {
            await fetch('/getBooks/romance',{
                credentials: 'include'
            })
            .then( res => { res.json()
              .then(data => {
                setRomanticBooks(data);
              })})
        }
        const fetchfantasyBooks = async () => {
            await fetch('/getBooks/fantasy',{
                credentials: 'include'
            })
            .then( res => { res.json()
              .then(data => {
                setFantasyBooks(data);
              })})
        }
        const fetchMisteryBooks = async () => {
            await fetch('/getBooks/mistery',{
                credentials: 'include'
            })
            .then( res => { res.json()
              .then(data => {
                setMisteryBooks(data);
              })})
        }
        const fetchClassicBooks = async () => {
            await fetch('/getBooks/classics',{
                credentials: 'include'
            })
            .then( res => { res.json()
              .then(data => {
                setClassicBooks(data);
              })})
        }
        fetchRomanticBooks();  
        fetchfantasyBooks(); 
        fetchMisteryBooks();
        fetchClassicBooks();
    },[]);

    return (
        <>
            <Helmet>
                <title>BookWorms. - Discover</title>
            </Helmet>
            <Layout>
                <PageCover img="images/books-white.png" title="Discover"/>
                {
                    fantasyBooks &&
                    <>
                        <Container style={{marginTop: 80}}>
                            <Row>
                                <h3>Most popular fantasy books</h3>
                            </Row>
                        </Container>
                        <DiscoverCarousel books={fantasyBooks} items={10} additionalTransfrom={250}/>
                    </>
                }
                {
                    misteryBooks &&
                    <>
                    <Container style={{marginTop: 80, marginBottom: 50}}>
                        <Row>
                            <h3>Best of mistery</h3>
                        </Row>
                    </Container>
                    <DiscoverCarousel books={misteryBooks} items={10} additionalTransfrom={250}/>
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
                        <DiscoverCarousel books={romanticBooks} items={10} additionalTransfrom={250}/>
                    </>
                }
                {
                    classicBooks &&
                    <>
                        <Container style={{marginTop: 80}}>
                            <Row>
                                <h3>Classic books</h3>
                            </Row>
                        </Container>
                        <DiscoverCarousel books={classicBooks} items={10} additionalTransfrom={250}/>
                    </>
                }
            </Layout>
        </>
    );
};

export default Discover;