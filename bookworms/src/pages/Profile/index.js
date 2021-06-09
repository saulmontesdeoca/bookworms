import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Container, Row } from 'react-bootstrap';
import BookCarousel from '../../components/BookCarousel';
import ProfileCover from '../../components/ProfileCover';
import Helmet from 'react-helmet';import auth from '../../auth/Auth';

const Profile = () => {
    const { id } = useParams();
    const history = useHistory();

    const [userInfo, setUserInfo] = useState({});

    const [myRecommendations, setMyRecommendations] = useState([]);
    const [wantRead, setWantRead] = useState([]);
    const [read, setRead] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);

    const fetchBookshelf = async (bookshelf, setFunction) => {
        await fetch(`/mybookshelves/${id}/${bookshelf}`, {credentials: 'include'})
        .then( res => {
                if(res.status === 408){
                    // this means the session has expired, logout and redirect to login
                    auth.logout(() => {
                        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                    })
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        setFunction(data)
                    })
                }
            })
    }

    useEffect(() => {
        async function fetchUser(){
            await fetch(`/user/${id}`, 
            {
                credentials: 'include'
            }
            ).then( res => {
                if(res.status === 408){
                auth.logout(() => {
                    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                    })
                    history.push('/login')
                }
                else{
                    res.json().then( usr => {
                        setUserInfo(usr);
                    })
                }
            })
        }
        fetchUser();
        fetchBookshelf('recommendations', setMyRecommendations);
        fetchBookshelf('want_read', setWantRead);
        fetchBookshelf('read', setRead);
        fetchBookshelf('currently_reading', setCurrentlyReading);

    }, [id]);
    return (
        <>
            <Helmet>
                <title>BookWorms. - Profile</title>
            </Helmet>
            <Layout>
                <ProfileCover img='/images/books-purple.png' title={`${userInfo.first_name}'s bookshelves`}/>
                <Container style={{marginTop: 80}}>
                    <Row>
                        <h1>{userInfo && userInfo.first_name}'s recommendations</h1>
                        {myRecommendations && <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- {myRecommendations.length} books</p>}
                    </Row>
                    <BookCarousel books={myRecommendations}/>
                    <Row>
                        <h1>{userInfo && userInfo.first_name} is currently reading</h1>
                        {currentlyReading && <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- {currentlyReading.length} books</p>}
                    </Row>
                    <BookCarousel books={currentlyReading}/>
                    <Row>
                        <h1 >Wants to read</h1>
                        {wantRead && <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- {wantRead.length} books</p>}
                    </Row>  
                    <BookCarousel books={wantRead}/>
                    <Row>
                        <h1>Has Read</h1>
                        {read && <p className='text-muted pt-2 pl-3' style={{fontSize: 24}}>- {read.length} books</p>}
                    </Row>
                    <BookCarousel books={read}/>
                </Container>
            </Layout>
    </>
    );
};

export default Profile;