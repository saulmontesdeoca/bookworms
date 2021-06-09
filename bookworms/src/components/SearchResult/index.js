import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookshelfCard from '../BookshelfCard';
import UserCard from '../UserCard';

const SearchResult = (props) => {
    const books = props.books;
    const authorBooks = props.authorBooks;
    const users = props.users;
    // console.log(props.users);
    // console.log(props.books);
    // console.log(props.authorBooks);
    
    return (
        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: 48}}>
            <Row>
                <Col>
                    <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0, marginTop: 20}}>Books</h5>
                    <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18, marginBottom: 32}}></div>
                        {books ? books.map( (book, key) =>(
                            <Link key={key} to={`/book/${book.book_id}`}>
                                <BookshelfCard cover={book.image_url} title={book.book_title} authors={book.authors} rating={book.average_rating}/>
                            </Link>
                                ))
                            : 
                            <div className='justify-content-center' style={{paddingTop:90, paddingBottom:70, color: 'rgb(85, 85, 85)'}}>
                                <p className='text-omited'>No books found</p>
                            </div>
                        }
                </Col>
                <Col>
                    <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0, marginTop: 20}}>Authors</h5>
                    <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18, marginBottom: 32}}></div>
                    {authorBooks ? authorBooks.map( (book, key) =>(
                            <Link key={key} to={`/book/${book.book_id}`}>
                                <BookshelfCard cover={book.image_url} title={book.book_title} authors={book.authors} rating={book.average_rating}/>
                            </Link>
                                ))
                            : 
                            <div className='justify-content-center' style={{paddingTop:90, paddingBottom:70, color: 'rgb(85, 85, 85)'}}>
                                <p className='text-omited'>No authors found</p>
                            </div>
                        }
                </Col>
                <Col>
                    <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0, marginTop: 20}}>Bookworms</h5>
                    <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18, marginBottom: 32}}></div>
                    {
                        users ? users.map((user, key) => (
                            <UserCard key={key} user={user}/>
                        ))
                        : (<div className='d-flex justify-content-center' style={{paddingTop:90, paddingBottom:70, color: 'rgb(85, 85, 85)'}}>
                            <p className='text-omited'>No bookworms found</p>
                        </div>)
                    }
                </Col>
            </Row>
        </div>
    );
};

export default SearchResult;