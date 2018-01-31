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
import UserPath from './components/UserPath';
import UserPage from './containers/UserPage';
import LogInForm from './containers/LogInForm';
import AppBar from './containers/AppBar';

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
          <Component  {...props} {...rest}/>
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
        <div className="Container">
          <AppBar />
          <div className='App'>
            <Switch>
              <EntryRoute exact path="/"
                username={this.props.username}
                auth={this.props.auth}
                component={UserPath}
              />
              <Route path="/register" component={Register}/>
              <Route path="/login" component={LogInForm}/>
              <PrivateRoute path="/:username/:selection" auth={this.props.auth} component={Submit}/>
              <PrivateRoute path="/:username" auth={this.props.auth} component={UserPage}/>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user
})

export default connect(mapStateToProps, null)(Routes);
