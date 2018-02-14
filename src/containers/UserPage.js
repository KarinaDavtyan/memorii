import React from 'react';
import { connect } from 'react-redux';

import {
  showNotification,
  clearAuthorization,
  getAllSelections
} from '../actions';
import { checkStatus } from '../helpers';

import Selection from './Selection';

class UserPage extends React.Component {


  componentDidMount () {
    if (this.props.selections.length === 0) {
      this.props.getAllSelections();
    }
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
        this.props.getSelections(selections)
      })
      .catch(error => {
        error.status === 401 ?
          this.props.clearAuthorization()
          : console.log(error);
      })
  }

  saveSelection = (data) => {
    fetch('http://Karina-MacBookPro.local:3000/selection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
      .then(data => {
        this.props.showNotification(`Added ${data} selection`)
        this.props.getAllSelections();
      })
  }

  deleteSelection = (data) => {
    fetch('http://Karina-MacBookPro.local:3000/selection', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
      .then(data => {
        this.props.showNotification(`Deleted ${data} selection`)
        this.props.getAllSelections();
      })
  }

  render () {
    return (
      <div className="UserPage">
        <Selection
          selections={this.props.selections}
          onSave={this.saveSelection}
          onDelete={this.deleteSelection}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user,
  selections: state.selections.list
})

const mapDispatchToProps = (dispatch) => ({
  clearAuthorization: () => dispatch(clearAuthorization()),
  showNotification: (msg) => dispatch(showNotification(msg)),
  getAllSelections: () => dispatch(getAllSelections())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
