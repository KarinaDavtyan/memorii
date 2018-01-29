import React from 'react';

class WordsList extends React.Component {

  renderWordsList = () => {
    if (this.props.words) {
      let words = this.props.words.map(word => {
        return (
          <div className='WordsItem' key={word._id}>
            <p>
              {word.firstWord} & {word.secondWord}
            </p>
          </div>
        )
      })
      return words;
    }
  }
  render () {

    return (
      <div className='WordsList'>
        {this.renderWordsList()}
      </div>
    )
  }
}

export default WordsList;
