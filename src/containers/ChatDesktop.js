import React from 'react';
import './css/ChatDesktop.css';
import { connect } from 'react-redux';
import SelectionIcon from '../components/SelectionIcon';
import WordCard from '../components/WordCard';

class ChatDesktop extends React.Component {

  state = {
    words: '',
    inputBlock: true,
    userInput: '',
    currentQuest: 'Choose selection',
    currentAnswer: '',
    answer: false
  }

  fetchWords (title) {
    fetch(`http://Karina-MacBookPro.local:3000/selection/${title}`, {
      headers: {
        'Authorization': `Bearer ${this.props.auth}`,
        'Content-type': 'application/json'
      }
    })
      .then(words => words.json())
      .then(words => {
        let twoWords = words.map((word) => {
          return {
            [word.firstWord]: word.secondWord
          }
        });
        this.setState({
          words: twoWords,
          currentQuest: 'Press start when ready'
        })
      })
  }


  renderSelectionItems = () => {
    if (this.props.selections) {
      let selections = this.props.selections.map(selection => {
        return (
          <button key={selection._id} onClick={() => this.fetchWords(selection.title)}>
            <SelectionIcon title={selection.title}  />
          </button>
        )
      })
      return selections;
    }
  }
  repetition (words) {
    let twoWords = words;
    if (twoWords.length > 0 ) {
      let currQuest = Object.keys(twoWords[0])[0];
      let currAnswer = Object.values(twoWords[0])[0];
      console.log(currQuest, currAnswer);
      console.log(twoWords, '2');
      this.setState({
        currentQuest: currQuest,
        currentAnswer: currAnswer,
        inputBlock: !this.state.inputBlock
      })
      twoWords.shift();
      this.setState({
        words: twoWords
      })

    }
  }

  train = () => {
    let { words } = this.state;
    this.repetition(words)
  }

  handleStartButton = () => {
    this.train();
  }

  handleSendButton = () => {
    this.setState({
      userInput: '',
      answer: !this.state.answer
    })
    console.log('here');
    console.log(this.state);
    if (this.state.userInput === this.state.currentAnswer) {
      console.log('correct');
    }
  }

  renderWordCard = () => {
    const { currentQuest } = this.state;
    if (currentQuest.length > 0) {
      return (
        <WordCard current={currentQuest} />
      )
    }
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render () {
    return (
      <div className="ChatDesktop">
        <button
          onClick={this.handleStartButton}
        >
          <p>
            start
          </p>
        </button>
        <div className='ChatBox'>
          <div className='ChatContainer'>
            <div className='SelectionListChat'>
              {this.renderSelectionItems()}
            </div>
            <div className='WordCardContainer'>
              {this.renderWordCard()}
            </div>
          </div>
          <div className='ChatContainerFooter'>
            <div className='Input'>
              <input
                name='userInput'
                onChange={this.handleChanges}
                value={this.state.userInput}
                disabled={this.state.inputBlock}
              >
              </input>
            </div>
            <div className='InputButtonChat'>
              <button
                onClick={this.handleSendButton}
              >
                <p>
                  send
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user,
  selections: state.selections.list
})

export default connect(mapStateToProps, null)(ChatDesktop);
