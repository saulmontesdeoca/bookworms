import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import SearchCover from '../../components/SearchCover';
import Helmet from 'react-helmet';
import SearchResult from '../../components/SearchResult';
import { Card, Image, Form, InputGroup, Button  } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';
import auth from '../../auth/Auth';

const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [authorBooks, setAuthorBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getQuery = async (query, route, setFunction) => {
        await fetch(`/${route}`,  {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'query': query.toLowerCase()
            })
        }).then( res => {
            if(res.status === 408){
                // this means the session has expired, logout and redirect to login
                auth.logout(() => {
                })
                document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                history.push('/login')
            } 
            else{
                res.json().then(data => {
                    setFunction(data);
                })
            }
        })
    }

    const handleQuery = () =>{
        if(query){
            getQuery(query, 'get_books', setBooks);
            getQuery(query, 'get_authors', setAuthorBooks);
            getQuery(query, 'get_users', setUsers);
            setLoaded(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>BookWorms. - Search</title>
            </Helmet>
            <Layout>
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
                                
                                <Form.Control 
                                    className='text-muted' 
                                    type="text" 
                                    placeholder="Search for author, book or bookworm..." 
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                                    onChange={e => setQuery(e.target.value)}
                                    value={query}
                                    />
                                <InputGroup.Append>
                                <Button onClick={handleQuery} variant="outline-dark"><SearchIcon /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Card.Body>
                    </Card>
                    <Image src='/images/search.jpeg' fluid style={{height: 500, width: '100%', objectFit: 'cover'}}/>
                </div>
                {
                    loaded &&
                        <SearchResult books={books} authorBooks={authorBooks} users={users}/>
                }
                
            </Layout>
        </>
    );
};

export default Search;