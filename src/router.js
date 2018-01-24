import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { connect } from 'react-redux';

import Submit from './containers/Submit';
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

const EntryRoute = ({component: Component, auth, username, ...rest}) => {
  return (
    <Route
      {...rest} render={props => (
        auth === null ? (
          <Component {...props} {...rest}/>
        ) : (
          <Redirect to={{
            pathname: `${username}`,
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
            <EntryRoute exact path="/" username={this.props.username} component={UserPath}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={LogInForm}/>
            <PrivateRoute path="/:username" auth={this.props.auth} component={Submit}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.token,
  username: state.user
})

export default connect(mapStateToProps, null)(Routes);
