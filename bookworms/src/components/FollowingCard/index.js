import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../auth/Auth';

const FollowingCard = (props) => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const following = props.following;

    const getUsers = async () => {
        await fetch('/users', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                following,
            })
        })
        .then( res => {
            if(res.status === 408){
                // this means the session has expired, logout and redirect to login
                auth.logout(() => {
                })
                document.cookie = "token= "
                history.push('/login')
            } 
            else{
                res.json().then(data => {
                    setUsers(data);
                    console.log(data[0]._id['$oid'])
                })
            }
        })
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Card className='shadow mt-3' style={{color: 'rgb(85, 85, 85)'}}>
            <Card.Body>
                <ListGroup variant="flush">
                { users.map((user, key) => (
                    <ListGroup.Item key={key}><Image style={{height: 42, marginRight: 12}} src='/logo192.png' roundedCircle /><Link to={`/bookworm/${user._id['$oid']}`}><strong style={{color: '#294965'}}>{user.first_name} {user.last_name}</strong></Link> </ListGroup.Item>
                ))
                }
                </ListGroup>

            </Card.Body>
        </Card>
    );
};

export default FollowingCard;