import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link, Redirect }  from 'react-router-dom';

import { getUserSession, showNotification } from '../actions';

class LogInForm extends React.Component {

  state = {
    username: '',
    password: '',
    validated: false
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.validated !== this.state.validated
          && this.state.validated === true) {
      let { username, password } = this.state;
      //temporary to wake up bot on login
      fetch(process.env.BOT, {
        mode: 'no-cors'
      })
      this.props.getUserSession(username, password);
    }
    if (prevProps.notificationTime !== this.props.notificationTime
          && this.props.notification === 'Invalid Credentials') {
      this.setState({
        username: '',
        password: '',
        validated: false
      })
    }
  }

  redirect = () => {
    if (this.props.auth) {
      return (
        <Redirect to={`/${this.props.username}`} />
      )
    }
  }

  validateString = () => {
    let { username, password } = this.state;
    let condition = {
      characters: {
        rule: username.match(/\W/) === null && password.match(/\W/) === null,
        msg: 'contain only letters, numbers or underscore'
      }
    }

    username ?
      !password ?
        this.props.showNotification('Please enter password')
        : condition.characters.rule ?
          this.setState({
            validated: true
          })
          : this.props.showNotification(`Input should ${condition.characters.msg}`)
      : this.props.showNotification('Please enter username')
  }


  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

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
              onClick={() => this.validateString()}
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
  username: state.auth.user,
  notification: state.notification.notificationMessage,
  notificationTime: state.notification.notificationTime
})

export default connect(mapStateToProps, {
  getUserSession, showNotification })(LogInForm);
