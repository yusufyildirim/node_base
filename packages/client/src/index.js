import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { storage, axios } from 'utils';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

const token = storage.getAccessToken();

if (token) {
  axios.setToken(token);
}

const BaseRoute = ({ component: Component, ...props }) => (
  <Route {...props} render={props => 
    !storage.getAccessToken() ? (
      <Component  {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )
  }
/>
);
const Routes = () => (
  <Router>
    <Switch>
      <BaseRoute exact path="/" component={LoginPage} />
    </Switch>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
