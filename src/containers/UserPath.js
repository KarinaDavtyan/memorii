import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';

class Register extends React.Component {

  state = {
    newUser: null,
  }

  handleYes = () => {
    this.setState({
      newUser: true
    })
  }
  render () {
    let { newUser } = this.state;
    if (newUser === null) {
      return (
        <div className="Register">
          <h1>
            Are you new here?
          </h1>
          <div className="buttons">
            <div className="yesButton">
              <Link to="/register">
                <RaisedButton
                  label="Yes"
                  labelColor={pinkA400}
                  onClick={this.handleYes}
                />
              </Link>
            </div>
            <div className="noButton">
                <RaisedButton
                  label="No"
                />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="loginButton">
          <RaisedButton
            label="LogIn"
          />
        </div>
      )
    }
  }
}

export default Register;
