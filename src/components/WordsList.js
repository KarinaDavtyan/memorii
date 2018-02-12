import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { ReverseSort } from '../helpers';


class WordsList extends React.Component {

  state = {
    first: ''
  }

  renderWord = (first, second) => {
    const style = {
      padding: 5
    };
    if (this.state.first === first) {
      return <Paper style={style}> {second} </Paper>

    } else {
      return <Paper style={style}> {first} </Paper>
    }
  }
  renderWordsList = () => {
    if (this.props.words) {
      let words = this.props.words.sort(ReverseSort).map(word => {
        return (
          <div className='WordsItem' key={word._id}>
            <div className='WordsTitle'>
              <div className="Word"
                onMouseEnter={() => {
                  this.setState({
                    first: word.firstWord
                  })
                }}
              >
                {this.renderWord(word.firstWord, word.secondWord)}
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
      <div className='WordsList'
        onMouseLeave={() => {
          this.setState({
            first: ''
          })
        }}
      >
        <h3>{this.props.selection}</h3>
        <div className='WordsContainer'>
          {this.renderWordsList()}
        </div>
      </div>
    )
  }
}

export default WordsList;
