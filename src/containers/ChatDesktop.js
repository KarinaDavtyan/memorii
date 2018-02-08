import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';


class ChatDesktop extends React.Component {

  render () {
    return (
      <div className="ChatDesktop">
        <div>
          <h2>
            Memorii chat room
          </h2>
        </div>
        <div className='ChatContainer'>
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
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user
})

export default connect(mapStateToProps, null)(ChatDesktop);
