import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import auth from '../../auth/Auth';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import FeedCarousel from '../../components/FeedCarousel';
import PostCard from '../../components/PostCard';
import FollowingCard from '../../components/FollowingCard';
import BookshelfResume from '../../components/BookshelfResume';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState({});
    const [myRecommendations, setMyRecommendations] = useState([]);
    const [wantRead, setWantRead] = useState([]);
    const [read, setRead] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [following, setFollowing] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const fetchBooks = async () => {
        await fetch('/get_books', {credentials: 'include'})
        .then( res => {
                if(res.status === 408){
                    // this means the session has expired, logout and redirect to login
                    auth.logout(() => {
                    })
                    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        setBooks(data);
                    })
                }
            })
    }
    const fetchUser = async () => {
        await fetch(`/user/${auth.getToken()}`, {credentials: 'include'})
        .then( res => {
                if(res.status === 408){
                    // this means the session has expired, logout and redirect to login
                    auth.logout(() => {
                    })
                    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        setUser(data)
                        setMyRecommendations(data.recommendations);
                        setWantRead(data.want_read);
                        setRead(data.read);
                        setCurrentlyReading(data.currently_reading);
                        setFollowing(data.following);
                    })
                }
            })
    }
    

    const fetchPosts = async () => {
        await fetch('/posts', {credentials: 'include'})
        .then( res => {
            if(res.status === 408){
                // this means the session has expired, logout and redirect to login
                auth.logout(() => {
                })
                document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                history.push('/login')
            } 
            else{
                res.json().then(data => {
                    setPosts(data);
                })
            }
        })
        setLoading(false);

    }

    useEffect(() => {
        fetchBooks();
        fetchUser();
        fetchPosts();
    }, []);
    return (
        <>
            <Helmet>
                <title>BookWorms. - Home</title>
            </Helmet>
            <Layout>
                <Container fluid>
                    <Row>
                        <Col style={{position: 'fixed', width: '30%', height: '100vh', paddingLeft: 80}}>
                            { myRecommendations && wantRead && read && currentlyReading && user &&
                                <BookshelfResume first_name={user.first_name} myRecommendations={myRecommendations} wantRead={wantRead} read={read} currentlyReading={currentlyReading} />
                            }
                            
                        </Col>
                        <Col style={{marginLeft: '30%', marginRight: '30%', overflow: 'hidden'}}>
                            <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0, marginTop: 20}}>Explore</h5>
                            <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18}}></div>
                            {   loading ? 
                                <div className='d-flex justify-content-center' style={{paddingTop:90, paddingBottom:70}}>
                                    <Spinner animation="border" variant="secondary" />
                                </div>
                                :
                                <FeedCarousel books={books} items={5}/>
                            }
                            <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0}}>Recent Posts</h5>
                            <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18}}></div>
                            {   loading && 
                                <div className='d-flex justify-content-center' style={{paddingTop:90, paddingBottom:70}}>
                                    <Spinner animation="border" variant="secondary" />
                                </div>
                            }
                            {
                                posts ?
                                    posts.map( (post, key) =>(
                                        <PostCard key={key} post={post}/>
                                    ))
                                :
                                <div className='justify-content-center' style={{paddingTop:90, paddingBottom:70, color: 'rgb(85, 85, 85)'}}>
                                    <p className='text-omited'>No Posts found</p>
                                </div>
                            }
                        </Col>
                        <Col style={{position: 'fixed', width: '30%', right: 0, height: '100vh'}}>
                            <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0, marginTop: 20}}>Following</h5>
                            <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18}}></div>
                            {   loading ? 
                                <div className='d-flex justify-content-center' style={{paddingTop:90, paddingBottom:70}}>
                                    <Spinner animation="border" variant="secondary" />
                                </div>
                                :
                                following ? 
                                <FollowingCard following={following}/>
                                :
                                <div className='d-flex justify-content-center' style={{paddingTop:60, paddingBottom:70, color: 'rgb(85, 85, 85)'}}>
                                    <p className='text-omited'>You haven't follow anyone yet</p>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
                
            </Layout>
        </>
    );
};

export default Home;