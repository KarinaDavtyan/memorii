import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { pinkA400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

import { getCurrentSelection } from '../actions';

import { ReverseSort } from '../helpers';

class Selection extends React.Component {

  state = {
    selection: '',
    title: 'VERBS-Spanish',
  }

  handleSubmit = () => {
    const { title } = this.state;
    if (this.state.title.length > 0) {
      this.props.onSave({
        title
      });
    }
    this.setState({
      title:''
    })
  }

  handleDelete = (title) => {
    this.props.onDelete({
      title
    })
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderSelection = () => {
    if (this.props.selections) {
      let selections = this.props.selections
        .sort(ReverseSort)
        .map(selection => {
          let path = selection.title.replace(/\s/g, '');
          return (
            <div className='SelectionItem' key={selection._id}>
              <div className='PaperContainer'>
                <Link
                  to={`/${this.props.username}/${path}`}
                  onClick={() => this.props.saveSelectionTitle(selection.title)}
                >
                  <div className='SelectionTitle' >
                    <p>
                      {selection.title}
                    </p>
                  </div>
                </Link>
                <div className='DeleteButton'>
                  <FlatButton
                    label='DELETE'
                    onClick={() => this.handleDelete(selection.title)}
                  />
                </div>
              </div>
            </div>
          )
        })
      return selections;
    } else {
      return null
    }
  }

  renderSelectionContainer = () => {
    if (this.props.selections && this.props.selections.length > 0) {
      return (
        <div>
          {this.renderSelection()}
        </div>
      )
    }
  }

  render () {
    return (
      <div className='SelectionList'>
        <div className='SelectionContainer'>
          {this.renderSelectionContainer()}
        </div>
        <div className='AddSelection'>
          <div className='TitleInput'>
            <TextField
              floatingLabelText='Collection title'
              onChange={this.handleChanges}
              name='title'
              value={this.state.title}
              onKeyPress={(e) => e.key === 'Enter' ? this.handleSubmit() : null}
            />
          </div>
          <div className='TitleSaveButton'>
            <RaisedButton
              label='Save'
              labelColor={pinkA400}
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  saveSelectionTitle: (title) => dispatch(getCurrentSelection(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
