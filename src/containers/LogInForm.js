import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

class LogInForm extends React.Component {

  state = {
    username: '',
    password: ''
  }

  fetchUserSession = async () => {
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
        <Link to={`/${this.state.username}`}>
          <div className="buttons">
            <RaisedButton
              label='Log In'
              labelColor={pinkA400}
              onClick={this.handleSubmit}
            />
          </div>
        </Link>
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

export default connect(null, mapDispatchToProps)(LogInForm);
