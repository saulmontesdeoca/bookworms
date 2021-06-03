import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import BookshelfCard from '../../components/BookshelfCard';

const BookDetails = () => {
    const { id } = useParams();
    const [bookInfo, setBookInfo] = useState({});

    useEffect(() => {
        const fetchAuthors = (authors) =>{
            let auths = []
            for(let i =0; i< authors.length; i++){
                fetch(`/find_author/${authors[i].author_id}`).then( res => {
                    res.json().then( author => {
                        auths.push(author.name)
                    })
                })
            }
            return auths
        }
        async function fetchBookInfo(){
            await fetch(`/find_book/${id}`).then( res => {
            res.json().then(data => {
                let auths = fetchAuthors(data.authors);
                data.authors = auths;
                setBookInfo(data)
            })})
        }
        fetchBookInfo();
    }, [id]);

    return (
        <Layout>
            {
                bookInfo &&
                    <>
                        <Container>
                            <Row>
                                <Col>
                                    <BookshelfCard cover={bookInfo.image_url} title={bookInfo.title} authors={bookInfo.authors} rating={bookInfo.average_rating}/>
                                </Col>
                            </Row>
                        </Container>
                    </>
            }
        </Layout>
    );
};

export default BookDetails;