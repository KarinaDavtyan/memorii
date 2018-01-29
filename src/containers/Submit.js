import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

import WordsList from '../components/WordsList';

class Submit extends React.Component {

  constructor (props) {
    super(props);
    this.fetchWords();
  }

  state = {
    firstWord: '',
    secondWord: '',
    selection: decodeURIComponent(window.location.pathname.split('/')[2]),
    words: '',
    sending: false
  }

  fetchWords = () => {
    fetch(`http://Karina-MacBookPro.local:3000/selection/${this.state.selection}`, {
      headers: {
        'Authorization': `Bearer ${this.props.auth}`,
        'Content-type': 'application/json'
      }
    })
      .then(words => words.json())
      .then(words => {
        this.setState({
          words
        })
      })
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.sending && !this.state.sending) {
      this.fetchWords();
      this.setState({
        sending: !this.state.sending
      })
    }
  }

  saveWords = (data) => {
    fetch('http://Karina-MacBookPro.local:3000/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      },
      body: JSON.stringify(data)
    })
  }

  handleSubmit = () => {
    const { firstWord, secondWord, selection } = this.state;

    this.saveWords({
      firstWord,
      secondWord,
      selection
    })

    this.setState({
      firstWord: '',
      secondWord: '',
      sending: !this.state.sending
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
        <WordsList words={this.state.words} selection={this.state.selection} />
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
