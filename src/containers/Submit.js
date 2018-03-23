import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import {
  getWords,
  postWords,
  deleteWords
} from '../actions';

import WordsList from '../components/WordsList';

class Submit extends React.Component {

  state = {
    firstWord: '',
    secondWord: '',
    selection: this.props.selection,
    words: ''
  }

  componentDidMount () {
    this.props.getWords(this.props.selection)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.words !== this.props.words) {
      this.setState({
        words: this.props.words
      })
    }
  }

  handleSubmit = () => {
    const { firstWord, secondWord, selection } = this.state;

    this.props.postWords({
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
              label='Back to collections'
              labelColor={pinkA400}
            />
          </Link>
        </div>
        <h3>{this.props.selection}</h3>
        <div>
          <p>
            Insert pair of words you want to memorize.
          </p>
        </div>
        <br/>
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
                label='Save'
                labelColor={pinkA400}
                onClick={this.handleSubmit}
              />
            </div>
          </div>
          <br/>
        </div>
        <WordsList
          words={this.state.words}
          selection={this.state.selection}
          onDelete={(data) => this.props.deleteWords(data)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user,
  selection: state.selections.current,
  words: state.words.list
})

const mapDispatchToProps = (dispatch) => ({
  getWords: (path) => dispatch(getWords(path)),
  postWords: (data) => dispatch(postWords(data)),
  deleteWords: (data) => dispatch(deleteWords(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
