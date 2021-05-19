import React from 'react';
import Carousel from 'react-multi-carousel';
import BookshelfCard from '../BookshelfCard';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  const data = {'isbn': '',                                                                                              
              'text_reviews_count': '7',                                                                               
              'series': ['189911'],                                                                                    
              'country_code': 'US',                                                                                    
              'language_code': 'eng',                                                                                  
              'popular_shelves': [{'count': '58', 'name': 'to-read'},                                                  
                                  {'count': '15', 'name': 'fantasy'},                                                  
                                  {'count': '6', 'name': 'fiction'},                                                   
                                  {'count': '5', 'name': 'owned'},],                                               
              'asin': 'B00071IKUY',                                                                                    
              'is_ebook': 'false',                                                                                     
              'average_rating': '4.03',                                                                                
              'kindle_asin': '',                                                                                       
              'similar_books': ['19997', '828466', '1569323', '425389', '1176674', '262740', '3743837',                
                                '880461', '2292726', '1883810', '1808197', '625150', '1988046', '390170',              
                                '2620131', '383106', '1597281'],                                                       
              'description': 'Omnibus book club edition containing the Ladies of Madrigyn and the Witches of Wenshar.',
              'format': 'Hardcover',                                                                                   
              'link': 'https://www.goodreads.com/book/show/7327624-the-unschooled-wizard',                             
              'authors': [{'author_id': '10333', 'role': ''}],                                                         
              'publisher': 'Nelson Doubleday, Inc.',                                                                   
              'num_pages': '600',                                                                                      
              'publication_day': '',                                                                                   
              'isbn13': '',                                                                                            
              'publication_month': '',                                                                                 
              'edition_information': 'Book Club Edition',                                                              
              'publication_year': '1987',                                                                              
              'url': 'https://www.goodreads.com/book/show/7327624-the-unschooled-wizard',                              
              'image_url': 'https://images.gr-assets.com/books/1304100136m/7327624.jpg',                               
              'book_id': '7327624',                                                                                    
              'ratings_count': '140',                                                                                  
              'work_id': '8948723',                                                                                    
              'title': 'The Unschooled Wizard (Sun Wolf and Starhawk, #1-2)',                                          
              'title_without_series': 'The Unschooled Wizard (Sun Wolf and Starhawk, #1-2)'} 


const BookCarousel = (props) => {
    return (
        <Carousel
            className='my-5'
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={'desktop'}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >
            <BookshelfCard cover={data.image_url} title={data.title} author={data.authors}/>
            <BookshelfCard cover={data.image_url} title={data.title} author={data.authors}/>
            <BookshelfCard cover={data.image_url} title={data.title} author={data.authors}/>
            <BookshelfCard cover={data.image_url} title={data.title} author={data.authors}/>
            <BookshelfCard cover={data.image_url} title={data.title} author={data.authors}/>
            <BookshelfCard cover={data.image_url} title={data.title} author={data.authors}/>
    </Carousel>
    );
};

export default BookCarousel;