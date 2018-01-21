import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';

class Register extends React.Component {

  render () {
    return (
      <div className="Register">
        <TextField
          floatingLabelText="Name & Surname"
        />
        <TextField
          floatingLabelText="Username"
        />
        <TextField
          floatingLabelText="Password"
        />
        <RaisedButton
          label="Register"
          labelColor={pinkA400}
        />
      </div>
    )
  }
}

export default Register;
