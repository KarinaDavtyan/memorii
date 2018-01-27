import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {pinkA400} from 'material-ui/styles/colors';
import { Link }  from 'react-router-dom';

import Selection from './Selection';

class UserPage extends React.Component {

  constructor (props) {
    super(props);
    this.fetchSelections();
  }

  state = {
    selections: ''
  }

  fetchSelections = () => {
    fetch('http://Karina-MacBookPro.local:3000/all-selections', {
      headers: {
        'Authorization': `Bearer ${this.props.auth}`,
        'Content-type': 'application/json'
      }
    })
      .then(selections => selections.json())
      .then(selections => {
        this.setState({
          selections
        })
      })
  }

  render () {
    return (
      <div className="UserPage">
        <div className='Selection'>
          <Selection selections={this.state.selections} />
        </div>
        <div className="UserPage-LogoutButton">
          <Link to={'/login'}>
            <RaisedButton
              label='LogOut'
              labelColor={pinkA400}
              onClick={this.props.clearAuthorization}
            />
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.token,
  };
}

const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch({
    type: 'CLEAR_AUTHORIZATION'
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
