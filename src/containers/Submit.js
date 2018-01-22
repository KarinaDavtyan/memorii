import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {pinkA400} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

class Submit extends React.Component {
  render () {
    console.log(this.props);
    return (
      <div className="Submit">
        <div>
          <p>
            Insert pair of words you want to learn.
          </p>
        </div>
        <div className="inputs">
          <div className="firstInput">
            <TextField
              floatingLabelText="One"
            />
          </div>
          <div className="secondInput">
            <TextField
              floatingLabelText="Two"
            />
          </div>
        </div>
        <div className="buttons">
          <div className="leftButton">
            <RaisedButton
              label="Send"
              labelColor={pinkA400}
            />
          </div>
          <div className="rightButton">
            <Link to={'/login'}>
              <RaisedButton
                label="LogOut"
                labelColor={pinkA400}
                onClick={this.props.clearAuthorization}
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.token,
  };
}

// const mapDispatchToProps = (dispatch) = ({
//   clearAuthorization: () => dispatch({
//     type: 'CLEAR_AUTHORIZATION'
//   })
// })

const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch({
    type: 'CLEAR_AUTHORIZATION'
  })
})


export default connect(mapStateToProps, mapDispatchToProps)(Submit);
