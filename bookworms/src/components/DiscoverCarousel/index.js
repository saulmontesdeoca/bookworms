import React, {useEffect, useState} from 'react';
import Carousel from 'react-multi-carousel';
import BookCover from '../BookCover';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
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

const DiscoverCarousel = () => {

    const [recomendations, setRecomendations] = useState([])
  
    let myBooks = [25124132,6578787,396103,16248942, 17434747,16248942, 25124132,6578787,396103,16248942, 17434747,16248942];
  
    async function fetchBooks(){
        let recom = []
        for (let i=0; i < myBooks.length; i++){
          await fetch(`http://localhost:5000/find_book/${myBooks[i]}`).then( res => {
            res.json().then(data => {
              let auths = fetchAuthors(data.authors);
              data.authors = auths;
              console.log(data.authors);
              recom.push(data)
          })})
        }
  
        setRecomendations(recom);
    }
  
    function fetchAuthors(authors){
        let auths = []
        for(let i =0; i< authors.length; i++){
            fetch(`http://localhost:5000/find_author/${authors[i].author_id}`).then( res => {
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
            {recomendations.map( (book, key) =>(
                <BookCover key={key} cover={book.image_url}/>
            ))}
        </Carousel>
        </div>
    );
};

export default DiscoverCarousel;