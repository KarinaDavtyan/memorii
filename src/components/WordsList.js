import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';


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
    const style = {
      padding: 5
    };
    if (this.props.words) {
      let words = this.props.words.map(word => {
        return (
          <div className='WordsItem' key={word._id}>
            <div className='WordsTitle'>
              <div className="Word">
                <Paper style={style}> {word.secondWord} </Paper>
                <Paper style={style}> {word.firstWord} </Paper>
              </div>
              {/* </div> */}
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
