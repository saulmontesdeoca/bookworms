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

    const [recomendations, setRecomendations] = useState([]);

    useEffect( () =>{
      const fetchBooks = async () => {
        let recom = []
        for (let i=0; i < props.books.length; i++){
          await fetch(`/find_book/${props.books[i]}`).then( res => {
            res.json().then(data => {
              recom.push(data);
              // console.log(data);
          })})
        }
  
        setRecomendations(recom);
    }
    fetchBooks();  
},[props.books]);

    
    return (
        <div>
            <Carousel
                className='my-5'
                swipeable={true}
                draggable={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                autoPlay={false}
                keyBoardControl={false}
                transitionDuration={500}
                additionalTransfrom={250}
                containerClass='carousel-container-with-scrollbar'
                removeArrowOnDeviceType={["mobile"]}
                deviceType={'desktop'}
            >
            {recomendations ? recomendations.map( (book, key) =>{
                if(book != null){
                  if(!(book.image_url === 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png')){
                    return <Link to={`/book/${book.book_id}`}>
                    <BookCover key={key} cover={book.image_url}/>
                  </Link>
                  }
                }
              }): null}
        </Carousel>
        </div>
    );
};

export default DiscoverCarousel;