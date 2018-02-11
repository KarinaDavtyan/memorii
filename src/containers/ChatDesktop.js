import React from 'react';
import './css/ChatDesktop.css';
import { connect } from 'react-redux';
import SelectionIcon from '../components/SelectionIcon';
import WordCard from '../components/WordCard';

class ChatDesktop extends React.Component {

  state = {
    words: '',
    currentAnnounce: 'Choose selection',
    userInput: '',
    currentAnswer: '',
    finish: false,
    gotChosen: false
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.finish !== this.state.finish) {
      this.setState({
        currentAnnounce: 'Choose selection',
        inputBlock: true,
        finish: false
      })
    }
  }

  renderStartButton = () => {
    if (this.state.gotChosen) {
      return (
        <button
          onClick={this.handleStartButton}
        >
          <p>
            start
          </p>
        </button>
      )
    }
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
          currentAnnounce: 'Press start when ready',
          gotChosen: !this.state.gotChosen
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
      this.setState({
        currentAnnounce: currQuest,
        currentAnswer: currAnswer
      })
      twoWords.shift();
      this.setState({
        words: twoWords
      })

    } else {
      this.setState({
        finish: !this.state.finish
      })
    }
  }

  train = () => {
    let { words } = this.state;
    this.repetition(words)
  }

  handleStartButton = () => {
    this.train();
    this.setState({
      gotChosen: !this.state.gotChosen
    })
  }

  handleSendButton = () => {
    this.setState({
      userInput: ''
    })
    if (this.state.userInput === this.state.currentAnswer) {
      console.log('correct');
      this.train();
    } else {
      console.log('incorrect');
    }
  }

  renderWordCard = () => {
    const { currentAnnounce } = this.state;
    if (currentAnnounce.length > 0) {
      return (
        <WordCard current={currentAnnounce} />
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
        <div className='StartButtonChat'>
          {this.renderStartButton()}
        </div>
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
                onKeyPress={(e) => e.key === 'Enter' ? this.handleSendButton() : null}
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
