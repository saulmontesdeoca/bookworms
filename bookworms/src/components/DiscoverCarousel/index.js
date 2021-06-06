import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import BookCover from '../BookCover';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
      slidesToSlide: 3 // optional, default to 1.
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

const DiscoverCarousel = (props) => {
    const books = props.books;
    return (
        <div>
            <Carousel
                className='my-5'
                swipeable={true}
                draggable={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                autoPlay={false}
                keyBoardControl={true}
                transitionDuration={500}
                additionalTransfrom={250}
                containerClass='carousel-container-with-scrollbar'
                removeArrowOnDeviceType={["mobile"]}
                deviceType={'desktop'}
            >
            {books && books.map( (book, key) =>(
                  <Link to={`/book/${book.book_id}`}>
                    <BookCover key={key} cover={book.image_url}/>
                  </Link> 
                  ) )
            }
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Carousel>
        </div>
    );
};

export default DiscoverCarousel;