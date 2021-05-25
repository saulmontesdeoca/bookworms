import React from 'react';
import { Image, } from 'react-bootstrap';

const BookCover = (props) => {
    return (
        <div>
            <Image draggable={false} src={props.cover} fluid style={{height: '100%', objectFit: 'cover',}} rounded />
        </div>
    );
};

export default BookCover;