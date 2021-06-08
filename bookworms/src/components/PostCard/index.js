import React from 'react';
import { Card, Image, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
    const post = props.post;
    // console.log(post.date);
    const date = new Date( post.date['$date']);
    let month = ''
    switch (date.getMonth()) {
        case 1:
            month = 'Jan'
            break;
        case 2:
            month = 'Feb'
            break;
        case 3:
            month = 'Mar'
            break;
        case 4:
            month = 'Apr'
            break;
        case 5:
            month = 'May'
            break;
        case 6:
            month = 'Jun'
            break;
        case 7:
            month = 'Jul'
            break;
        case 8:
            month = 'Ago'
            break;
        case 9:
            month = 'Sep'
            break;
        case 10:
            month = 'Oct'
            break;
        case 12:
            month = 'Nov'
            break;
        default:
            month = 'Dec'
            break;
    }
    let message = '';

    switch (post.bookshelf) {
        case 'currently_reading':
            message = 'is currently reading';
            break;
        case 'want_read':
            message = 'wants to read';
            break;
        case 'recommendations':
            message = 'recommends';
            break;
        case 'read':
            message = 'just read'
            break;
        default:
            break;
    }

    return (
            <Card className='shadow m-3' style={{color: 'rgb(85, 85, 85)'}}>
                <Card.Body>
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Image className='mr-3' style={{height: 42}} src='/logo192.png' roundedCircle />
                        <Link to={`/bookworm/${post.user_id}`}><strong style={{color: '#294965'}}>{post.first_name}</strong></Link> {message}
                        <div className='mt-4 mr-5' style={{position: 'absolute', right: 0, top: 0}}>{month}, {date.getDate()}th</div>
                        </ListGroup.Item>
                    <ListGroup.Item>
                        <Row style={{paddingTop:10, paddingBottom: 10, bottom: 0, top: 0, margin: 'auto',}}>
                            <Col className='pr-0 ml-4 '>
                                <Link to={`/book/${post.book_id}`}>
                                    <Image className='shadow' draggable={false} src={post.book_img ? post.book_img : 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'} fluid style={{height: '100%', objectFit: 'cover',}} rounded />
                                </Link>
                            </Col>
                            <Col lg={8} className='p-0'>
                                {post.book_title &&
                                    <p style={{fontWeight: 'bold', fontSize: 24}}>{post.book_title}</p>
                                }
                                {post.authors && 
                                    <p style={{fontWeight: 'lighter', fontSize: 18}}>
                                        By {post.authors.join(', ')}
                                    </p>
                                }
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
    );
};

export default PostCard;