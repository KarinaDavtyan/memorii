import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

import WordsList from '../components/WordsList';

class Submit extends React.Component {

  componentDidMount () {
    this.fetchWords();
  }

  state = {
    firstWord: '',
    secondWord: '',
    selection: decodeURIComponent(window.location.pathname.split('/')[2]),
    words: ''
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

  saveWords = (data) => {
    fetch('http://Karina-MacBookPro.local:3000/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.fetchWords()
      })
  }

  deleteWords = (firstWord, secondWord) => {
    fetch(`http://Karina-MacBookPro.local:3000/words/${firstWord}/${secondWord}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      }
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.fetchWords()
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
      secondWord: ''
    })
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    console.log('mount');
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
          <div className='rightButton'>
            <Link to={`/${this.props.username}`}>
              <RaisedButton
                label='Selections'
                labelColor={pinkA400}
              />
            </Link>
          </div>
        </div>
        <WordsList
          words={this.state.words}
          selection={this.state.selection}
          onDelete={this.deleteWords}
        />
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
