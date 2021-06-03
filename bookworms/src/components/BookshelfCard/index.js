import React, { useEffect, useState } from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const BookshelfCard = (props) => {
    return (
        <div style={{position: 'relative', margin: 20, height: '14rem', overflow:'hidden', borderRadius: '10'}}>
            <Image draggable={false} className='blur' src={props.cover} fluid style={{height: '100%', width: '100%', objectFit: 'cover'}} rounded />
            <Card style={{ 
                    position: 'absolute', 
                    width:'80%',
                    height:'80%', 
                    bottom: 0,
                    top: 0, 
                    alignSelf: 'center', 
                    left: 0, 
                    right: 0, 
                    margin: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    borderColor: 'rgba(255, 255, 255, 0)'
            }}>
                <Card.Body style={{fontSize: 24, fontWeight: 'bolder', padding:0}}>
                    <Row style={{paddingTop:15, bottom: 0, top: 0, margin: 'auto',}}>
                        <Col className='pr-0'>
                            <Image draggable={false} src={props.cover ? props.cover : 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'} fluid style={{height: '100%', objectFit: 'cover',}} rounded />
                        </Col>
                        <Col style={{color: 'white'}} className='p-0'>
                            {props.title &&
                                <p style={{fontWeight: 'bold', fontSize: 14}}>{props.title}</p>
                            }
                            {props.authors && 
                                <p style={{fontWeight: 'lighter', fontSize: 12}}>
                                    By {props.authors.join(', ')}
                                </p>
                            }
                            <ReactStars
                                count={5}
                                value={props.rating}
                                isHalf= {true}
                                size={12}
                                activeColor="white"
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookshelfCard;