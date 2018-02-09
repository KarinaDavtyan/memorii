import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectionIcon from '../components/SelectionIcon';

class ChatDesktop extends React.Component {
  renderSelectionItems = () => {
    if (this.props.selections) {
      let selections = this.props.selections.map(selection => {
        return (
          <button>
            <SelectionIcon title={selection.title} key={selection._id} />
          </button>
        )
      })
      return selections;
    }
  }

  render () {
    return (
      <div className="ChatDesktop">
        <div>
          <h2>
            Memorii chat room
          </h2>
        </div>
        <div className='ChatBox'>
          <div className='ChatContainer'>
            <div className='SelectionListChat'>
              {this.renderSelectionItems()}
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
