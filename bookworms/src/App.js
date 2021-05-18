import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Helmet from 'react-helmet';

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
