import React from 'react';
import UserPath from './UserPath';

class LogIn extends React.Component {

  state = {
    loggedIn: false  }

  render () {
    let { loggedIn } = this.state;
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

export default LogIn;
