import React from 'react';
import Bar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class AppBar extends React.Component {

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
          iconElementLeft={
            <div>
              <a href='https://web.telegram.org/#/im?p=@memorii_bot'>
                <h3>
                  @memorii_bot
                </h3>
              </a>
            </div>
          }
          iconElementRight={
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
          }
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
