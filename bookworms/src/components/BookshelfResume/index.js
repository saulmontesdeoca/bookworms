import React from 'react';
import { Card, ListGroup } from 'react-bootstrap'; 

const BookshelfResume = (props) => {
    const myRecommendations = props.myRecommendations;
    const currentlyReading = props.currentlyReading;
    const read = props.read;
    const wantRead = props.wantRead;
    return (
        <div>
            <h5 style={{fontFamily: 'Alfa Slab One', color: 'rgb(85, 85, 85)', marginLeft: 18, paddingBottom: 0, marginTop: 20}}>Your bookshelves resume, {props.first_name  ? `${props.first_name}` : null}</h5>
            <div style={{backgroundColor: 'rgb(85, 85, 85)', height: 5, width: 28, marginLeft: 18}}></div>
            <Card className='shadow mt-3' style={{color: 'rgb(85, 85, 85)'}}>
                <Card.Body>
                    <ListGroup variant="flush">
                    {  myRecommendations ? 
                        <ListGroup.Item><strong> My recomendations:</strong> {myRecommendations.length} books</ListGroup.Item>
                        :
                        <ListGroup.Item><strong>My recomendations:</strong> 0 books</ListGroup.Item>
                    }
                    {  currentlyReading ? 
                        <ListGroup.Item><strong>Currently Reading:</strong> {currentlyReading.length} books</ListGroup.Item>
                        :
                        <ListGroup.Item><strong>Currently Reading:</strong> 0 books</ListGroup.Item>
                    }
                    {  read ? 
                        <ListGroup.Item><strong>Read:</strong> {read.length} books</ListGroup.Item>
                        :
                        <ListGroup.Item><strong>Read:</strong> 0 books</ListGroup.Item>
                    }
                    {  wantRead ? 
                        <ListGroup.Item><strong>Want to Read:</strong> {wantRead.length} books</ListGroup.Item>
                        :
                        <ListGroup.Item><strong>Want to Read:</strong> 0 books</ListGroup.Item>
                    }
                    </ListGroup>

                </Card.Body>
            </Card>
        </div>
    );
};

export default BookshelfResume;