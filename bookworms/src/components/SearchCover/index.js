import React from 'react';
import { Card, Image, Form, InputGroup, Button  } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';


const SearchCover = () => {

    return (
        <div style={{position: 'relative'}}>
            <Card style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    position: 'absolute',
                    top:'40%',
                    width:'30%',
                    alignSelf: 'center',
                    left: 0,
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto'
            }}>
                <Card.Body style={{fontSize: 24, textAlign: 'center', fontWeight: 'bolder'}}>
                    <InputGroup>
                        
                        <Form.Control className='text-muted' type="text" placeholder="Search for author, book..." style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                        <InputGroup.Append>
                        <Button variant="outline-dark"><SearchIcon /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Body>
            </Card>
            <Image src='/images/search.jpeg' fluid style={{height: 500, width: '100%', objectFit: 'cover'}}/>
        </div>
    );
};

export default SearchCover;