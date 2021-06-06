import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PageCover from '../../components/PageCover';
import BookCarousel from '../../components/BookCarousel';
import { Container, Row } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router';
import auth from '../../auth/Auth';

const MyBooks = () => {
    const history = useHistory();

    const [myRecommendations, setMyRecommendations] = useState([]);
    const [wantRead, setWantRead] = useState([]);
    const [read, setRead] = useState([]);

    const fetchRecommendations = async () => {
        await fetch('/mybookshelves/recommendations', {credentials: 'include'})
        .then( res => {
            console.log('Resoponse');
                if(res.status === 408){
                    // this means the session has expired, logout and redirect to login
                    auth.logout(() => {
                        document.cookie = "token="
                    })
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        console.log('then');

                        console.log(data);
                        setMyRecommendations(data)
                    })
                }
            })
    }
    const fetchWantRead = async () => {
        await fetch('/mybookshelves/want_read', {credentials: 'include'})
        .then( res => {
                if(res.status === 408){
                    // this means the session has expired, logout and redirect to login
                    auth.logout(() => {
                        document.cookie = "token="
                    })
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        setWantRead(data)
                    })
                }
            })
    }
    const fetchRead = async () => {
        await fetch('/mybookshelves/read', {credentials: 'include'})
        .then( res => {
                if(res.status === 408){
                    // this means the session has expired, logout and redirect to login
                    auth.logout(() => {
                        document.cookie = "token="
                    })
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        setRead(data)
                    })
                }
            })
    }

    useEffect(() => {
        fetchRecommendations();
        fetchWantRead();
        fetchRead();
    }, []);

    return (
        <>
            <Helmet>
                <title>BookWorms. - My Books</title>
            </Helmet>
            <Layout>
                <PageCover img='images/bookshelf-blue.png' title='My bookshelf'/>
                <Container style={{marginTop: 80}}>
                    <Row>
                        <h1>My recommendations</h1>
                        {myRecommendations && <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- {myRecommendations.length} books</p>}
                    </Row>
                    <BookCarousel books={myRecommendations}/>
                    <Row>
                        <h1 >Want to read</h1>
                        {wantRead && <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- {wantRead.length} books</p>}
                    </Row>  
                    <BookCarousel books={wantRead}/>
                    <Row>
                        <h1 >Read</h1>
                        {read && <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- {read.length} books</p>}
                    </Row>
                    <BookCarousel books={read}/>
                </Container>
            </Layout>
        </>
    );
};

export default MyBooks;