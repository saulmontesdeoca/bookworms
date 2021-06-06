import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import BookshelfCard from '../BookshelfCard';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../auth/Auth';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
};

const BookCarousel = (props) => {
  const books = props.books;

    return (
        <Carousel
        className='my-5 pr-5'
        swipeable={true}
        draggable={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        autoPlay={false}
        keyBoardControl={false}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        deviceType={'desktop'}
      >
          {books.map( (book, key) =>(
              <Link key={key} to={`/book/${book.book_id}`}>
                <BookshelfCard cover={book.image_url} title={book.title} authors={book.authors} rating={book.average_rating}/>
              </Link>
          ))}
      </Carousel>
    )
  

};

export default BookCarousel;