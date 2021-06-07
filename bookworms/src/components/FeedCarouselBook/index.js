import React from 'react';
import { Card, Image } from 'react-bootstrap';

const BookInfoHeader = (props) => {
    return (
        <div style={{position: 'relative', margin: 20, width: '7rem', height: '9rem', overflow:'hidden', borderRadius: '4%'}}>
            <Image draggable={false} className='blur-intense' src={props.cover} fluid style={{height: '100%', width: '100%', objectFit: 'cover'}} rounded />
            <Card style={{ 
                    position: 'absolute', 
                    width:'70%',
                    height:'90%', 
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
                    <Image draggable={false} src={props.cover ? props.cover : 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'} fluid style={{height: '100%', objectFit: 'cover'}} rounded />
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookInfoHeader;