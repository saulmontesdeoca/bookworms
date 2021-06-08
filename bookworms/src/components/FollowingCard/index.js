import React from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const FollowingCard = (props) => {
    const users = props.users;
    return (
        <Card className='shadow mt-3' style={{color: 'rgb(85, 85, 85)'}}>
            <Card.Body>
                <ListGroup variant="flush">
                { users.map((user, key) => (
                    <ListGroup.Item key={key}><Image style={{height: 42}} src='/logo192.png' roundedCircle /><Link to={`/bookworm/${user._id}`}>{user.first_name}</Link> </ListGroup.Item>
                ))
                }
                </ListGroup>

            </Card.Body>
        </Card>
    );
};

export default FollowingCard;