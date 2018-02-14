import React from 'react';
import { ReverseSort } from '../helpers';


class WordsList extends React.Component {

  state = {
    first: ''
  }

  renderWord = (first, second) => {
    if (this.state.first === first) {
      return (
        <div className='WordsCard'>
          <p>
            {second}
          </p>
        </div>
      )

    } else {
      return (
        <div className='WordsCard'>
          <p>
            {first}
          </p>
        </div>
      )
    }
  }
  renderWordsList = () => {
    if (this.props.words) {
      let words = this.props.words.sort(ReverseSort).map(word => {
        return (
          <div
            className='Word'
            key={word._id}
            onMouseEnter={() => {
              this.setState({
                first: word.firstWord
              })
            }}
            onMouseLeave={() => {
              this.setState({
                first: ''
              })
            }}
            onDoubleClick={
              () => this.props.onDelete({
                firstWord: word.firstWord,
                secondWord: word.secondWord
              })
            }
          >
            {this.renderWord(word.firstWord, word.secondWord)}
          </div>
        )
      })
      return words;
    }
  }

  render () {
    return (
      <div className='WordsList'>
        <h3>{this.props.selection}</h3>
        <div className='WordsContainer'>
          {this.renderWordsList()}
        </div>
      </div>
    )
  }
}

export default WordsList;
