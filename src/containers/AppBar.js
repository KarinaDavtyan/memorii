import React from 'react';
import Bar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class AppBar extends React.Component {

  state = {
    chat: false
  }

  chatOption = () => {
    return (
      <Link to='/chat'>
        <h3>
          memorii_chat
        </h3>
      </Link>
    )
  }
  renderLinks = () => {
    return (
      <div className='Links'>
        <a href='https://web.telegram.org/#/im?p=@memorii_bot'>
          <h3>
            @memorii_bot
          </h3>
        </a>
        <h3>
          /
        </h3>
        {this.chatOption()}
      </div>
    )
  }

  renderLogButton = () => {
    return (
      this.props.auth
        ?
        <div>
          <FlatButton
            label='Log Out'
            onClick={this.props.clearAuthorization}
          />
        </div>
        :
        <Link to='/login'>
          <FlatButton
            label='Log In'
          />
        </Link>
    )
  }
  render () {
    const style = {
      left: {
        marginTop: 0
      },
      right: {
        paddingTop: 5
      },
      main: {
        backgroundColor: 'white'
      }
    }
    return (
      <div className="AppBar">
        <Bar
          style={style.main}
          iconElementLeft={this.renderLinks()}
          iconElementRight={this.renderLogButton()}
          iconStyleLeft={style.left}
          iconStyleRight={style.right}
        />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch({
    type: 'CLEAR_AUTHORIZATION'
  })
})


export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
