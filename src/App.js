import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Login from './containers/Login/Auth';
import Register from './containers/Register';
import Dashboard from './containers/Dashboard';

const isAuthenticated = true;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Route
          path="/dashboard"
          render={props =>
            isAuthenticated ? (
              <Dashboard {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
