import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createUser } from '../actions';

class Register extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    let { username, password } = this.state;
    this.props.createUser({
      username,
      password
    })
    this.setState({
      username: '',
      password: ''
    })
  }
  render () {
    return (
      <div className='Register'>
        <div className='TextField'>
          <TextField
            floatingLabelText='Username'
            onChange={this.handleChanges}
            name='username'
            value={this.state.username}
          />
          <TextField
            floatingLabelText='Password'
            onChange={this.handleChanges}
            name='password'
            value={this.state.password}
            type='password'
          />
        </div>
        <div className='buttons'>
          <div className="leftButton">
            <Link to='/login'>
              <RaisedButton
                label='Register'
                labelColor={pinkA400}
                onClick={this.handleSubmit}
              />
            </Link>
          </div>
          <div className='rightButton'>
            <Link to='/'>
              <RaisedButton
                label='Home'
                labelColor={pinkA400}
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { createUser })(Register);
