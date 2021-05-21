import React, { useEffect, useState } from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';

const BookshelfCard = (props) => {
    // const [authors, setAuthors] = useState([]);

    // useEffect( () => {
    //     async function fetchData(){
    //         let auths = []
    //         for(let i =0; i< props.authors.length; i++){
    //             await fetch(`/find_author/${props.authors[i].author_id}`).then( res => {
    //                 res.json().then( author => {
    //                     auths.push(author.name)
    //                 })
    //             })
    //         }
    //         setAuthors(auths);
    //     }
    //     fetchData();
    // }, []);
    console.log(props.authors);
    
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
                            <Image draggable={false} src={props.cover} fluid style={{height: '100%', objectFit: 'cover',}} rounded />
                        </Col>
                        <Col style={{color: 'white'}} className='p-0'>
                            <p style={{fontWeight: 'bold', fontSize: 14}}>{props.title}</p>
                            <p style={{fontWeight: 'lighter', fontSize: 12}}>
                                By {props.authors.join(', ')}
                            </p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookshelfCard;