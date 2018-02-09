import React from 'react';
import './css/ChatDesktop.css';
import { connect } from 'react-redux';
import SelectionIcon from '../components/SelectionIcon';
import WordCard from '../components/WordCard';

class ChatDesktop extends React.Component {

  state = {
    words: '  '
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
        this.setState({
          words
        })
        console.log(this.state);
      })
  }


  renderSelectionItems = () => {
    console.log(this.fetchWords);
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

  render () {
    return (
      <div className="ChatDesktop">
        <div className='ChatBox'>
          <div className='ChatContainer'>
            <div className='SelectionListChat'>
              {this.renderSelectionItems()}
            </div>
            <div className='WordCardContainer'>
              <WordCard/>
            </div>
          </div>
          <div className='ChatContainerFooter'>
            <div className='Input'>
              <input id='chatInput'>
              </input>
            </div>
            <div className='InputButtonChat'>
              <button>
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
