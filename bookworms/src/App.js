import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Helmet from 'react-helmet';
import Discover from './pages/Discover';
import MyBooks from './pages/MyBooks';
import Search from './pages/Search';
import BookDetails from './pages/BookDetails';
import PrivateRoute from './routing/PrivateRoute';

import PublicRoute from './routing/PublicRoute';

function App() {
  return (
    <div className="App">
      <Helmet>
          <title>BookWorms.</title>
      </Helmet>
      <Router>
        <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signin" component={Signin} />

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
