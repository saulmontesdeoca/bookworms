import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import auth from '../../auth/Auth';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import FeedCarousel from '../../components/FeedCarousel';
import BookshelfCard from '../../components/BookshelfCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState({});
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        await fetch('/get_books', {credentials: 'include'})
        .then( res => {
                if(res.status === 408){
                    // this means the session has expired, logout and redirect to login
                    auth.logout(() => {
                    })
                    document.cookie = "token= "
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        setBooks(data)
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
                    document.cookie = "token="
                    history.push('/login')
                } 
                else{
                    res.json().then(data => {
                        setLoading(false);
                        setUser(data)
                    })
                }
            })
    }
    useEffect(() => {
        fetchBooks();
        fetchUser();
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
                            <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0, marginTop: 20}}>Your bookshelf resume, {user  ? `${user.first_name}` : null}</h5>
                            <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18}}></div>
                            {  <p>{user.recommendations}</p>
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
                            {   loading ? 
                                <div className='d-flex justify-content-center' style={{paddingTop:90, paddingBottom:70}}>
                                    <Spinner animation="border" variant="secondary" />
                                </div>
                                :
                                books.map( (book, key) =>(
                                    <Link key={key} to={`/book/${book.book_id}`}>
                                      <BookshelfCard cover={book.image_url} title={book.title} authors={book.authors} rating={book.average_rating}/>
                                    </Link>
                                ))
                                // <div className='d-flex justify-content-center' style={{paddingTop:90, paddingBottom:70}}>
                                //     <p className='text-omited'>No Posts found</p>
                                // </div>
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
                                <div className='d-flex justify-content-center' style={{paddingTop:60, paddingBottom:70}}>
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