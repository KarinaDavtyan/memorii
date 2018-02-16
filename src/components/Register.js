import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createUser, showNotification } from '../actions';

class Register extends React.Component {

  state = {
    username: '',
    password: '',
    approvedUsername: false,
    approvedPassword: false,
    disabled: true
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.approvedPassword !== this.state.approvedPassword) {
      if (this.state.approvedUsername && this.state.approvedPassword) {
        this.setState({
          disabled: false
        })
      } else {
        this.setState({
          disabled: true
        })
      }
    }
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
      password: '',
      approvedUsername: false,
      approvedPassword: false,
      disabled: true
    })
  }


  inValidateUsername = (msg) => {
    this.setState({
      approvedUsername: false
    })
    this.props.showNotification(msg)
  }

  validateUsername = () => {
    let { username } = this.state;
    let condition = {
      length: {
        rule: username.length > 3,
        msg: 'be longer than 3 characters'
      },
      oneLetter: {
        rule: username.match(/[a-z]+/i) !== null,
        msg: 'contain at least 1 letter'
      },
      characters: {
        rule: username.match(/\W/) === null,
        msg: 'contain only letters, numbers or underscore'
      }
    }

    username ?
      !condition.length.rule && !condition.characters.rule && !condition.oneLetter.rule ?
        this.inValidateUsername(`locUsername should ${condition.length.msg}, ${condition.oneLetter.msg} and ${condition.characters.msg}`)
        : !condition.length.rule && !condition.characters.rule ?
          this.inValidateUsername(
            `lcUsername should ${condition.length.msg} and ${condition.characters.msg}`)
          : !condition.length.rule && !condition.oneLetter.rule ?
            this.inValidateUsername(
              `loUsername should ${condition.length.msg} and ${condition.oneLetter.msg}`)
            : !condition.characters.rule && !condition.oneLetter.rule ?
              this.inValidateUsername(
                `coUsername should ${condition.characters.msg} and ${condition.oneLetter.msg}`)
              : condition.length.rule ?
                condition.characters.rule ?
                  condition.oneLetter.rule ?
                    this.setState({
                      approvedUsername: true
                    })
                    : this.inValidateUsername(`Username should ${condition.oneLetter.msg}`)
                  : this.inValidateUsername(`Username should ${condition.characters.msg}`)
                : this.inValidateUsername(`Username should ${condition.length.msg}`)
      : this.inValidateUsername('Please enter username')
  }

  inValidatePassword = (msg) => {
    this.setState({
      approvedPassword: false
    })
    this.props.showNotification(msg)
  }

  validatePassword = () => {
    let { password } = this.state;
    let condition = {
      length: {
        rule: password.length > 8,
        msg: 'be longer than 8 characters'
      },
      oneLetter: {
        rule: password.match(/[A-Z]+/) !== null,
        msg: 'contain at least 1 uppercase letter'
      },
      characters: {
        rule: password.match(/\W/) === null,
        msg: 'contain only letters, numbers or underscore'
      }
    }

    password ?
      !condition.length.rule && !condition.characters.rule && !condition.oneLetter.rule ?
        this.inValidatePassword(`locPassword should ${condition.length.msg}, ${condition.oneLetter.msg} and ${condition.characters.msg}`)
        : !condition.length.rule && !condition.characters.rule ?
          this.inValidatePassword(
            `lcPassword should ${condition.length.msg} and ${condition.characters.msg}`)
          : !condition.length.rule && !condition.oneLetter.rule ?
            this.inValidatePassword(
              `loPassword should ${condition.length.msg} and ${condition.oneLetter.msg}`)
            : !condition.characters.rule && !condition.oneLetter.rule ?
              this.inValidatePassword(
                `coPassword should ${condition.characters.msg} and ${condition.oneLetter.msg}`)
              : condition.length.rule ?
                condition.characters.rule ?
                  condition.oneLetter.rule ?
                    this.setState({
                      approvedPassword: true
                    })
                    : this.inValidatePassword(`Password should ${condition.oneLetter.msg}`)
                  : this.inValidatePassword(`Password should ${condition.characters.msg}`)
                : this.inValidatePassword(`Password should ${condition.length.msg}`)
      : this.inValidatePassword('Please enter password')
  }

  redirect = () => {
    if (this.props.readyToLogin) {
      return (
        <Redirect to='/login' />
      )
    }
  }

  render () {
    return (
      <div className='Register'>
        {this.redirect()}
        <div className='TextField'>
          <TextField
            floatingLabelText='Username'
            onChange={this.handleChanges}
            name='username'
            value={this.state.username}
            onBlur={this.validateUsername}
            disabled={this.state.approvedUsername} //change for sth more user friendly (it breakes if after validating when register button is availbale user decides to change something invalid)
          />
          <TextField
            floatingLabelText='Password'
            onChange={this.handleChanges}
            name='password'
            value={this.state.password}
            disabled={this.state.approvedPassword}  //change for sth more user friendly
            type='password'
          />
        </div>
        <div className='buttons'>
          <div className='leftButton'>
            <RaisedButton
              label='Check password security'
              labelColor={pinkA400}
              onClick={this.validatePassword}
              disabled={this.state.password.length === 0 ? true : false}
            />
          </div>
          <div className='leftButton'>
            <RaisedButton
              label='Register'
              labelColor={pinkA400}
              onClick={this.handleSubmit}
              disabled={this.state.disabled}
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
  readyToLogin: state.auth.readyToLogin
})

export default connect(mapStateToProps, {
  createUser, showNotification
})(Register);
