import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';



class WordsList extends React.Component {

  deleteWords = (firstWord, secondWord) => {
    fetch(`http://Karina-MacBookPro.local:3000/words/${firstWord}/${secondWord}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      }
    })
  }

  renderWordsList = () => {
    if (this.props.words) {
      let words = this.props.words.map(word => {
        return (
          <div className='WordsItem' key={word._id}>
            <div className='WordsTitle'>
              <p>
                {word.firstWord} & {word.secondWord}
              </p>
              <div className='DeleteButton'>
                <FlatButton
                  label='DELETE'
                  onClick={() => this.deleteWords(word.firstWord, word.secondWord)}
                />
              </div>
            </div>
            <Divider/>
          </div>
        )
      })
      return words;
    }
  }

  render () {
    return (
      <div className='WordsList'>
        <h1>{this.props.selection}</h1>
        <div className='WordsContainer'>
          {this.renderWordsList()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.token,
  };
}

export default connect(mapStateToProps, null)(WordsList);
