import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter  }  from 'react-router-dom';

class LogInForm extends React.Component {

  state = {
    username: '',
    password: ''
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.auth !== this.props.auth) {
      console.log(nextProps.auth);
      <Redirect to='/register' />
    }
  }

  componentWillUnmount () {
  console.log('About UNMOUNT');
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
            <Link to={`/${this.props.username}`}>
              <RaisedButton
                label='Log In'
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

const mapDispatchToProps = (dispatch) => ({
  addAuthorization: (data) =>  dispatch({
    type: 'SET_AUTHORIZATION',
    data
  })
})

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogInForm));
