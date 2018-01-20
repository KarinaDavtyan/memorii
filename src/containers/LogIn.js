import React from 'react';

class LogIn extends React.Component {

  state = {
    loggedIn: false,
  }

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
          <h1>
            not logged in
          </h1>
        </div>
      )
    }
  }
}

export default LogIn;
