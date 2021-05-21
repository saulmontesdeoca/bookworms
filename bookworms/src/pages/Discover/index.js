import React from 'react';
import DiscoverCarousel from '../../components/DiscoverCarousel';
import Layout from '../../components/Layout';
import PageCover from '../../components/PageCover';
import { Row, Container } from 'react-bootstrap';

const Discover = () => {
    return (
        <Layout>
            <PageCover img="images/books-white.png" title="Discover"/>
            <Container style={{marginTop: 80}}>
                <Row>
                    <h3>Most read this week</h3>
                </Row>
            </Container>
            <DiscoverCarousel />
            <Container style={{marginTop: 80}}>
                <Row>
                    <h3>New releases this month</h3>
                </Row>
            </Container>
            <DiscoverCarousel />
            <Container style={{marginTop: 80}}>
                <Row>
                    <h3>New releases this week</h3>
                </Row>
            </Container>
            <DiscoverCarousel />
        </Layout>
    );
};

export default Discover;