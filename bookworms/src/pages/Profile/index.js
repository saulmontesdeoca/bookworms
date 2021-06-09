import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Container, Row, Card, Image, Button } from 'react-bootstrap';
import BookCarousel from '../../components/BookCarousel';
import ProfileCover from '../../components/ProfileCover';
import Helmet from 'react-helmet';
import auth from '../../auth/Auth';

const Profile = () => {
    const { id } = useParams();
    const history = useHistory();

    const [myInfo, setMyInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});

    const [myRecommendations, setMyRecommendations] = useState([]);
    const [wantRead, setWantRead] = useState([]);
    const [read, setRead] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    
    const [change, setChange] = useState(0);

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
    const handleFollow = async (action, id1, id2) => {
        await fetch('/follow', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': id2,
                action
            })
        })
        setChange(change+1);
    } 

    const getFollowButton = (info, id2) => {
        let found = false;
        if(info.following){
            for(let i = 0; i < info.following.length; i++){
                if(info.following[i] === id2){
                    found = true;
                    break;
                }
            }
            if(found){
                return (<div style={{width: '30%'}}>
                            <Button onClick={() => handleFollow('unfollow', info._id['$oid'], id2 )} variant='outline-success' size="lg" block>Following</Button>
                        </div>)
            }
            return (<div style={{width: '30%'}}>
                        <Button onClick={() => handleFollow('follow', info._id['$oid'], id2)} variant='success' size="lg" block>Follow</Button>
                    </div>)
        }
    }

    useEffect(() => {
        async function fetchUser(the_id, setFunction){
            await fetch(`/user/${the_id}`, 
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
                        setFunction(usr);
                        console.log(usr);
                    })
                }
            })
        }

        fetchUser(id, setUserInfo);
        fetchUser(auth.getToken(), setMyInfo);
        fetchBookshelf('recommendations', setMyRecommendations);
        fetchBookshelf('want_read', setWantRead);
        fetchBookshelf('read', setRead);
        fetchBookshelf('currently_reading', setCurrentlyReading);

    }, [id, change]);
    return (
        <>
            <Helmet>
                <title>BookWorms. - Profile</title>
            </Helmet>
            <Layout>

                <div style={{position: 'relative'}}>
                    <Card style={{position: 'absolute', width:'50%', bottom: 0, marginTop: 10, alignSelf: 'center', left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto'}}>
                        <Card.Body style={{fontSize: 24, textAlign: 'center', fontWeight: 'bolder'}}>
                            <Row className='justify-content-center'>
                                {userInfo && userInfo.first_name}'s bookshelves
                            </Row>
                            <Row className='justify-content-center'>
                                { myInfo && getFollowButton(myInfo, id)}
                            </Row>
                        </Card.Body>
                    </Card>
                    <Image src='/images/books-purple.png' fluid style={{height: 500, width: '100%', objectFit: 'cover'}}/>
                    <div style={{height: 40}}></div>
                </div>

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