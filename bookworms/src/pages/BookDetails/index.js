import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import BookInfoHeader from '../../components/BookInfoHeader';
import ReactStars from "react-rating-stars-component";

import auth from '../../auth/Auth';

const BookDetails = () => {
    const { id } = useParams();
    const [bookInfo, setBookInfo] = useState({});
    const history = useHistory();

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
                    res.json().then(data => {
                        setBookInfo(data)
                    })
                }
            })
        }
        fetchBookInfo();
    }, [id]);

    return (
        <Layout>
            {
                bookInfo &&
                    <>
                        <div className='mx-5 px-5'>
                            <BookInfoHeader cover={bookInfo.image_url} title={bookInfo.title} authors={bookInfo.authors} rating={bookInfo.average_rating}/>
                        </div>
                        <Container>
                            <Row>
                                <Col>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <h1>{bookInfo.title}</h1>
                                <ReactStars
                                    count={5}
                                    value={bookInfo.average_rating}
                                    isHalf= {true}
                                    size={24}
                                    activeColor="white"
                                />
                                <p>{bookInfo.description}</p>
                            </Row>
                        </Container>
                    </>
            }
        </Layout>
    );
};

export default BookDetails;