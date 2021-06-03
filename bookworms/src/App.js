import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Helmet from 'react-helmet';
import Discover from './pages/Discover';
import MyBooks from './pages/MyBooks';
import Search from './pages/Search';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <div className="App">
      <Helmet>
          <title>BookWorms.</title>
      </Helmet>
      <Router>
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/mybooks">
              <MyBooks />
            </Route>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/book/:id">
              <BookDetails />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signin">
                <Signin />
            </Route>
          </Switch>
      </Router>
    </div>
    
  );
}

export default App;
