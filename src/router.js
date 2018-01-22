import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { connect } from 'react-redux';

import Submit from './containers/Submit';
import LogIn from './containers/LogIn';
import Register from './components/Register';
import UserPath from './containers/UserPath';
import LogInForm from './containers/LogInForm';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (auth) {
    return (
      <Route
        {...rest} render={props => (
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
  } else {
    return <Route
      path="/login" component={LogInForm}/>
  }
}

class Routes extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LogIn}/>
            {/* <PrivateRoute auth={this.props.auth} path="/submit" component={Submit}/> */}
            <Route path="/register" component={Register}/>
            <Route path="/welcome" component={UserPath}/>
            <Route path="/login" component={LogInForm}/>
            <PrivateRoute path="/:username" auth={this.props.auth} component={Submit}/>
          </Switch>
        </div>
      </Router>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.token
})

export default connect(mapStateToProps)(Routes);
