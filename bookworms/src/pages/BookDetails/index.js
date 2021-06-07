import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BookInfoHeader from '../../components/BookInfoHeader';
import ReactStars from "react-rating-stars-component";
import ReadMoreReact from 'read-more-react';
import BookCarousel from '../../components/BookCarousel';
import DiscoverCarousel from '../../components/DiscoverCarousel';

import auth from '../../auth/Auth';

const BookDetails = () => {
    const { id } = useParams();
    const history = useHistory();

    const [bookInfo, setBookInfo] = useState({});
    const [moreGenreBooks, setMoreGenreBooks] = useState([]);
    const [moreAuthorBooks, setMoreAuthorBooks] = useState([]);

    const [myRecommendations, setMyRecommendations] = useState([]);
    const [wantRead, setWantRead] = useState([]);
    const [read, setRead] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [change, setChange] = useState(0);

    const fetchBookshelf = async (bookshelf, setFunction) => {
        await fetch(`/mybookshelves/${bookshelf}`, {credentials: 'include'})
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
                        setFunction(data)
                    })
                }
            })
    }
    const getCustomButton = (bookshelf, variant, buttonTitle) => {
        let found = false;
        bookshelf.forEach( book => {
            if(book.book_id === bookInfo.book_id){
                found = true;
            }
        });
        if(found) {
            return <Button onClick={() => bookshelfAction(buttonTitle,'remove')} block size="lg" variant={`outline-${variant}`}>Remove from {buttonTitle}</Button>
            
        }
        return <Button onClick={() => bookshelfAction(buttonTitle,'add')} block size="lg" variant={variant}>Add to {buttonTitle}</Button>
    }

    const bookshelfAction = async (buttonTitle, action) => {
        let bookshelf;
        switch (buttonTitle) {
            case 'Recommendations':
                bookshelf = 'recommendations'
                break;
            case 'Want to Read':
                bookshelf = 'want_read'
                break;
            case 'Read':
                bookshelf = 'read'
                break;
            case 'Currently Reading':
                bookshelf = 'currently_reading'
                break;
        }
        await fetch(`/mybookshelf/${action}`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bookshelf,
                'book_id': bookInfo.book_id
            })
        })
        setChange(change+1);
    }

    useEffect(() => {
        async function fetchBookInfo(){
            await fetch(`/find_book/${id}`, 
            {
                credentials: 'include'
            }
            ).then( res => {
                if(res.status == 408){
                auth.logout(() => {
                    document.cookie = "token="
                    })
                    history.push('/login')
                }
                else{
                    res.json().then(async book => {
                        setBookInfo(book);
                        await fetch(`/getBooks/${book.genre}`, {credentials: 'include'})
                        .then( res => {
                            if(res.status == 408){
                            auth.logout(() => {
                                document.cookie = "token="
                                })
                                history.push('/login')
                            }
                            else{
                                res.json().then( data => {
                                    let more = data.filter(a_book => a_book.book_id !== book.book_id)
                                    setMoreGenreBooks(more)
                                })
                            }
                        })
                        await fetch('/getAuthorBooks', {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'author': book.authors[0]
                            })
                        })
                        .then( res => {
                            if(res.status == 408){
                            auth.logout(() => {
                                document.cookie = "token="
                                })
                                history.push('/login')
                            }
                            else{
                                res.json().then( data => {
                                    let more = data.filter(a_book => a_book.book_id !== book.book_id)
                                    setMoreAuthorBooks(more);
                                })
                            }
                        })
                    })
                }
            })
        }
        fetchBookInfo();
        fetchBookshelf('recommendations', setMyRecommendations);
        fetchBookshelf('want_read', setWantRead);
        fetchBookshelf('read', setRead);
        fetchBookshelf('currently_reading', setCurrentlyReading);

    }, [id, change]);
    return (
        <Layout>
            {
                bookInfo &&
                <>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <BookInfoHeader cover={bookInfo.image_url} title={bookInfo.title} authors={bookInfo.authors} rating={bookInfo.average_rating}/>
                            </Col>
                            <Col className='pt-4'>
                                <h1 className='book-title'>{bookInfo.title}</h1>
                                <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 8, width: 28, marginTop: 18}}></div>
                                <Row >
                                    <Col>
                                        <Row className='my-3'>
                                            <Col>
                                                <h2 className='book-authors'>by {bookInfo.authors}</h2>
                                            </Col>
                                            <Col>
                                                <Row className='pl-3'>
                                                    <ReactStars
                                                        count={5}
                                                        value={4.5}
                                                        isHalf= {true}
                                                        size={24}
                                                        activeColor="#294965"
                                                    />
                                                    <span style={{fontSize: '22px'}}>({bookInfo.average_rating})</span>
                                                </Row>
                                            </Col>
                                        </Row>
                                        { bookInfo.description !== null && bookInfo.description !== undefined &&
                                            <Row>
                                                <Col lg={10} style={{fontSize: 18}}>
                                                    <ReadMoreReact text={bookInfo.description}
                                                        min={150}
                                                        ideal={250}
                                                        max={300}
                                                        readMoreText='read more'/>
                                                </Col>
                                            </Row>

                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    { (myRecommendations || wantRead || read) && 
                    <Container className='mt-5'>
                        <Row>
                            {
                                currentlyReading &&
                                    <Col>
                                        {getCustomButton(currentlyReading, 'secondary', 'Currently Reading')}
                                    </Col>
                            }
                            {
                                myRecommendations &&
                                // if bookInfo.book_id in myRecommendations array myRecom.book_id === bookInfo.book_id
                                    <Col>
                                        {getCustomButton(myRecommendations, 'success', 'Recommendations')}
                                    </Col>
                            }
                            {
                                wantRead &&
                                    <Col>
                                        {getCustomButton(wantRead, 'info', 'Want to Read')}
                                    </Col>
                            }
                            {
                                read &&
                                    <Col>
                                        {getCustomButton(read, 'dark', 'Read')}
                                    </Col>
                            }
                        </Row>
                    </Container>
                    }
                    {
                        moreAuthorBooks && moreAuthorBooks.length > 0 &&
                        <Container className='mt-5 pt-3'>
                            <h2 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)'}}>More of {bookInfo.authors}</h2>
                            <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 48, marginTop: 8}}></div>
                            <DiscoverCarousel books={moreAuthorBooks} items={6} additionalTransfrom={10}/>
                        </Container>
                    }
                    {
                        moreGenreBooks && moreGenreBooks.length > 0 &&
                        <Container className='my-5 py-5'>
                            <h2 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)'}}>Explore other {bookInfo.genre} books</h2>
                            <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 48, marginTop: 8}}></div>
                            <BookCarousel books={moreGenreBooks}/>
                        </Container>
                    }

                    </>
            }
        </Layout>
    );
};

export default BookDetails;