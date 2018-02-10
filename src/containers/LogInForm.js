import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link, Redirect }  from 'react-router-dom';

import { setAuthorization } from '../actions';

class LogInForm extends React.Component {

  state = {
    username: '',
    password: ''
  }

  redirect = () => {
    if (this.props.auth) {
      return (
        <Redirect to={`/${this.props.username}`} />
      )
    }
  }

  fetchUserSession = () => {
    let { username, password } = this.state;
    const encoded = btoa(`${username}:${password}`);
    fetch('http://Karina-MacBookPro.local:3000/sign-in', {
      headers: {
        'Authorization': `Basic ${encoded}`,
      }
    })
      .then(user => user.json())
      .then(user => {
        this.props.addAuthorization(user);
      })
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => this.fetchUserSession();

  render () {
    return (
      <div className='LogInForm'>
        {this.redirect()}
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
        <div className="buttons">
          <div className='leftButton'>
            <RaisedButton
              label='Log In'
              labelColor={pinkA400}
              onClick={this.handleSubmit}
            />
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

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  addAuthorization: (data) =>  dispatch(setAuthorization(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
