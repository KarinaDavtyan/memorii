import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';

class Submit extends React.Component {
  render () {
    return (
      <div className="Submit">
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
          labelColor={pinkA400}
        />
      </div>
    )
  }
}

export default Submit;
