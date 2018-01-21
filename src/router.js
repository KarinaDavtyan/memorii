import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import { connect } from 'react-redux';

import Submit from './containers/Submit';
import LogIn from './containers/LogIn';
import Register from './components/Register';
import UserPath from './containers/UserPath';
import LogInForm from './containers/LogInForm';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (
    auth.token !== null ? (
      <Component {...props} {...rest}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={LogIn}/>
      <PrivateRoute auth={this.props.auth} path="/submit" component={Submit}/>
      <Route path="/register" component={Register}/>
      <Route path="/welcome" component={UserPath}/>
      <Route path="/login" component={LogInForm}/>

    </div>
  </Router>
)

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Routes);
