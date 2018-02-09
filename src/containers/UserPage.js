import React from 'react';
import { connect } from 'react-redux';

import { showNotification, getSelections } from '../actions';
import { checkStatus } from '../helpers';


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
      .then(checkStatus)
      .then(selections => selections.json())
      .then(selections => {
        this.setState({
          selections
        })
        this.props.getSelections(selections)
      })
      .catch(error => {
        error.status === 401 ?
          this.props.clearAuthorization()
          : console.log(error);
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
        this.props.showNotification(`Added ${data} selection`)
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
        this.props.showNotification(`Deleted ${data} selection`)
        this.fetchSelections();
      })
  }

  render () {
    return (
      <div className="UserPage">
        <Selection
          selections={this.state.selections}
          onSave={this.saveSelection}
          onDelete={this.deleteSelection}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.token,
    username: state.auth.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch({
    type: 'CLEAR_AUTHORIZATION'
  }),
  showNotification: (msg) => dispatch(showNotification(msg)),
  getSelections: (list) => dispatch(getSelections(list))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
