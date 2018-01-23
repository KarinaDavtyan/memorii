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
  return (
    <Route
      {...rest} render={props => (
        auth !== null ? (
          <Component {...props} {...rest}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
  )
}

class Routes extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LogIn}/>
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
