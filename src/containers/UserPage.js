import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
    selections: '',
    title: ''
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

  saveSelections = (data) => {
    fetch('http://Karina-MacBookPro.local:3000/selection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      },
      body: JSON.stringify(data)
    })
  }

  handleSubmit = () => {
    const { title } = this.state;
    this.saveSelections({
      title
    })
    this.saveSelections(title);
    this.setState({
      title:''
    })
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderSelection = () => {
    if (this.state.selections.length > 0) {
      return (
        <div className='Selection'>
          <Selection  selections={this.state.selections}/>
        </div>
      )
    } else {
      return (
        <div className='PlaceHolder'>
          <p>
            Oops, nothing here yet:(
          </p>
          <TextField
            floatingLabelText='New Selection'
            onChange={this.handleChanges}
            name='title'
            value={this.state.title}
          />
          <RaisedButton
            label='Add Selection'
            labelColor={pinkA400}
            onClick={this.handleSubmit}
          />
        </div>
      )
    }
  }
  render () {
    return (
      <div className="UserPage">
        {this.renderSelection()}
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
