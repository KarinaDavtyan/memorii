import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LogIn extends React.Component {
  render () {
    return (
      <div className="LogIn">
        <div>
          <p>
            Insert pair of words you want to learn.
          </p>
        </div>
        <div className="inputs">
          <div className="firstInput">
            <TextField
              floatingLabelText="One"
            />
          </div>
          <div className="secondInput">
            <TextField
              floatingLabelText="Two"
            />
          </div>
        </div>
        <RaisedButton
          label="Send"
        />
      </div>
    )
  }
}

export default LogIn;
