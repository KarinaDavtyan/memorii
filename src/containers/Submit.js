import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import {
  showNotification,
  clearAuthorization
} from '../actions';
import { checkStatus } from '../helpers';

import WordsList from '../components/WordsList';

class Submit extends React.Component {

  componentDidMount () {
    this.fetchWords();
  }

  state = {
    firstWord: '',
    secondWord: '',
    selection: this.props.selection,
    words: ''
  }

  fetchWords = () => {
    fetch(`http://Karina-MacBookPro.local:3000/selection/${this.state.selection}`, {
      headers: {
        'Authorization': `Bearer ${this.props.auth}`,
        'Content-type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(words => words.json())
      .then(words => {
        this.setState({
          words
        })
      })
      .catch((error) => {
        console.log(error);
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
        this.props.showNotification(`Added ${data.first} and ${data.second} words`)
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
        this.props.showNotification(`Deleted ${data.first} and ${data.second} words`)
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
    return (
      <div className='Submit'>
        <div className='backToSelections'>
          <Link to={`/${this.props.username}`}>
            <RaisedButton
              label='Back to selections'
              labelColor={pinkA400}
            />
          </Link>
        </div>
        <div>
          <p>
            Insert pair of words you want to learn.
          </p>
        </div>
        <div className='SendElements'>
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
            <div className='sendButton'>
              <RaisedButton
                label='Send'
                labelColor={pinkA400}
                onClick={this.handleSubmit}
              />
            </div>
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

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user,
  selection: state.selections.current
})

const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch(clearAuthorization()),
  showNotification: (msg) => dispatch(showNotification(msg))
})


export default connect(mapStateToProps, mapDispatchToProps)(Submit);
