import React from 'react';
import { Card, Image } from 'react-bootstrap';

const ProfileCover = (props) => {
    return (
        <div style={{position: 'relative'}}>
            <Card style={{position: 'absolute', width:'50%', bottom: 0, marginTop: 10, alignSelf: 'center', left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto'}}>
                <Card.Body style={{fontSize: 24, textAlign: 'center', fontWeight: 'bolder'}}>
                    {props.title}
                </Card.Body>
            </Card>
            <Image src={props.img} fluid style={{height: 500, width: '100%', objectFit: 'cover'}}/>
        <div style={{height: 40}}></div>
    </div>
    );
};

export default ProfileCover;