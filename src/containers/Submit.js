import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

class Submit extends React.Component {

  state = {
    firstWord: '',
    secondWord: ''
  }

  saveWords = (data) => {
    fetch('http://Karina-MacBookPro.local:3000/pair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      },
      body: JSON.stringify(data)
    })
  }

  handleSubmit = () => {
    const { username } = this.props;
    const { firstWord, secondWord } = this.state;

    this.saveWords({
      firstWord,
      secondWord,
      username
    })

    this.setState({
      firstWord: '',
      secondWord: ''
    })
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className='Submit'>
        <div>
          <p>
            Insert pair of words you want to learn.
          </p>
        </div>
        <div className='inputs'>
          <div className='firstInput'>
            <TextField
              floatingLabelText='One'
              onChange={this.handleChanges}
              name='firstWord'
              value={this.state.firstWord}
            />
          </div>
          <div className='secondInput'>
            <TextField
              floatingLabelText='Two'
              onChange={this.handleChanges}
              name='secondWord'
              value={this.state.secondWord}
            />
          </div>
        </div>
        <div className='buttons'>
          <div className='leftButton'>
            <RaisedButton
              label='Send'
              labelColor={pinkA400}
              onClick={this.handleSubmit}
            />
          </div>
          <div className='rightButton'>
            <Link to={'/login'}>
              <RaisedButton
                label='LogOut'
                labelColor={pinkA400}
                onClick={this.props.clearAuthorization}
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.token,
    username: state.auth.user,

  };
}

const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch({
    type: 'CLEAR_AUTHORIZATION'
  })
})


export default connect(mapStateToProps, mapDispatchToProps)(Submit);
