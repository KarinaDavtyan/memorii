import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';

class Register extends React.Component {

  createUser = (data) => {
    fetch('http://Karina-MacBookPro.local:3000/new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

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
    this.createUser({
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
        <Link to='/login'>
          <div className="buttons">
            <RaisedButton
              label='Register'
              labelColor={pinkA400}
              onClick={this.handleSubmit}
            />
          </div>
        </Link>
      </div>
    )
  }
}

export default Register;
