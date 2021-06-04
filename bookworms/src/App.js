import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Helmet from 'react-helmet';
import Discover from './pages/Discover';
import MyBooks from './pages/MyBooks';
import Search from './pages/Search';
import BookDetails from './pages/BookDetails';
import PrivateRoute from './routing/PrivateRoute';

import auth from './auth/Auth';

function App() {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    console.log('Calling app useffect');
    const authenication = async () => {
      if(localStorage.getItem('token')){
        await fetch(`/session/${localStorage.getItem('token')}`)
        .then( res => { return res.json()})
        .then(data => {
          console.log(data);
          auth.login(() => {
            console.log('User logged in, has cache');
            data && setUser({
              'email': data.email,
              'token': data.token,
            });
            history.push('/');
          })
      }).catch( err => {
          console.log(err);
      })
      }
    }
    authenication();
  }, []);

  return (
    <div className="App">
      <Helmet>
          <title>BookWorms.</title>
      </Helmet>
      <Router>
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signin">
                <Signin />
            </Route>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute path="/mybooks" component={MyBooks}/>
            <PrivateRoute path="/discover" component={Discover}/>
            <PrivateRoute exact path="/search" component={Search}/>
            <PrivateRoute exact path="/book/:id" component={BookDetails}/>
          </Switch>
      </Router>
    </div>
    
  );
}

export default App;
