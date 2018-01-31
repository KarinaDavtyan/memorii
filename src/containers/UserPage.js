import React from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';

import Selection from './Selection';

class UserPage extends React.Component {

  state = {
    selections: ''
  }

  componentDidMount () {
    this.fetchSelections();
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

  saveSelection = (data) => {
    fetch(`http://Karina-MacBookPro.local:3000/selection/${data}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      }
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.fetchSelections();
      })
  }

  deleteSelection = (data) => {
    fetch(`http://Karina-MacBookPro.local:3000/selection/${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      }
    })
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.fetchSelections();
      })
  }

  render () {
    return (
      <div className="UserPage">
        <div className='Selection'>
          <Selection
            selections={this.state.selections}
            onSave={this.saveSelection}
            onDelete={this.deleteSelection}
          />
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
    username: state.auth.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch({
    type: 'CLEAR_AUTHORIZATION'
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
