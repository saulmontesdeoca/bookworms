import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import BookshelfCard from '../BookshelfCard';
import { Link } from 'react-router-dom';

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
  const [recomendations, setRecomendations] = useState([])
  
  let myBooks = [25124132,6578787,396103,16248942, 17434747,16248942];

  async function fetchBooks(){
      let recom = []
      for (let i=0; i < myBooks.length; i++){
        await fetch(`/find_book/${myBooks[i]}`).then( res => {
          res.json().then(data => {
            let auths = fetchAuthors(data.authors);
            data.authors = auths;
            recom.push(data)
        })})
      }

      setRecomendations(recom);
  }

  function fetchAuthors(authors){
      let auths = []
      for(let i =0; i< authors.length; i++){
          fetch(`/find_author/${authors[i].author_id}`).then( res => {
              res.json().then( author => {
                  auths.push(author.name)
              })
          })
      }
      return auths
  }

    useEffect( () =>{
        fetchBooks();
    },[]);

    if (recomendations){
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
      {recomendations.map( (book, key) =>(
          <Link key={key} to={`/book/${book.book_id}`}>
            <BookshelfCard cover={book.image_url} title={book.title} authors={book.authors} rating={book.average_rating}/>
          </Link>
      ))}
</Carousel>
      )
    }
    else{
      return (
      
          <></>
    
    
        );
    }
  

};

export default BookCarousel;