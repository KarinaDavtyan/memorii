import React from 'react';
import UserPath from './UserPath';
import LogInForm from './LogInForm';

class LogIn extends React.Component {

  state = {
    loggedIn: false,
    test:true
  }

  render () {
    let { loggedIn, test } = this.state;
    if (test) {
      return (
        <div>
          <LogInForm />
        </div>
      )
    } else {
      if (loggedIn) {
        return (
          <div>
            <h1>
              loggedIn
            </h1>
          </div>
        )
      } else {
        return (
          <div>
            <UserPath />
          </div>
        )
      }
    }
  }
}

export default LogIn;
