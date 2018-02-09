import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { ReverseSort } from '../helpers';


class WordsList extends React.Component {

  renderWordsList = () => {
    const style = {
      padding: 5
    };
    if (this.props.words) {
      let words = this.props.words.sort(ReverseSort).map(word => {
        return (
          <div className='WordsItem' key={word._id}>
            <div className='WordsTitle'>
              <div className="Word">
                <Paper style={style}> {word.firstWord} </Paper>
                <Paper style={style}> {word.secondWord} </Paper>
              </div>
              <div className='DeleteButton'>
                <FlatButton
                  label='DELETE'
                  onClick={() => this.props.onDelete(word.firstWord, word.secondWord)}
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
        <h3>{this.props.selection}</h3>
        <div className='WordsContainer'>
          {this.renderWordsList()}
        </div>
      </div>
    )
  }
}

export default WordsList;
