import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
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
