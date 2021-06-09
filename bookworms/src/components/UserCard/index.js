import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserCard = (props) => {
    const user = props.user;
    console.log(user);
    return (
        <Card className='shadow mt-3' style={{color: 'rgb(85, 85, 85)'}}>
            <Card.Body>
                <Image style={{height: 42, marginRight: 12}} src='/logo192.png' roundedCircle /><Link to={`/bookworm/${user._id['$oid']}`}><strong style={{color: '#294965'}}>{user.name}</strong></Link> 
            </Card.Body>
        </Card>
    );
};

export default UserCard;