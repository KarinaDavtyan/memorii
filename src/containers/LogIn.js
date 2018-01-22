import React from 'react';
import { connect } from 'react-redux';
import UserPath from './UserPath';
import Submit from './Submit';

class LogIn extends React.Component {

  // state = {
  //   loggedIn: false
  // }

  render () {
    // let { loggedIn } = this.state;
    if (this.props.auth) {
      return (
        <div>
          <Submit />
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

const mapStateToProps = (state) => {
  return {
    auth: state.token,
  };
}
export default connect(mapStateToProps, null)(LogIn);
