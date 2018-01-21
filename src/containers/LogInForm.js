import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';

class LogInForm extends React.Component {

  render () {
    return (
      <div className="LogInForm">
        <TextField
          floatingLabelText="Username"
        />
        <TextField
          floatingLabelText="Password"
        />
        <RaisedButton
          label="Log In"
          labelColor={pinkA400}
        />
      </div>
    )
  }
}

export default LogInForm;
