import React from 'react';
import Paper from 'material-ui/Paper';
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
    title: '',
  }

  handleSubmit = () => {
    const { title } = this.state;
    this.props.onSave(title);
    this.setState({
      title:''
    })
  }

  handleDelete = (title) => {
    this.props.onDelete(title)
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderSelection = () => {
    const style = {
      margin: 20
    };
    if (this.props.selections) {
      let selections = this.props.selections
        .sort(ReverseSort)
        .map(selection => {
          let path = selection.title.replace(/\s/g, '');
          return (
            <div className='SelectionItem' key={selection._id}>
              <Paper style={style} zDepth={2} >
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
              </Paper>
            </div>
          )
        })
      return selections;
    }
  }

  render () {
    if (this.props.selections.length > 0) {
      return (
        <div className="SelectionList">
          <div className="SelectionContainer">
            {this.renderSelection()}
          </div>
          <div className='InputButtonSelection'>
            <div className='addSelectionInput'>
              <TextField
                floatingLabelText='New Selection'
                onChange={this.handleChanges}
                name='title'
                value={this.state.title}
              />
            </div>
            <div className='addSelectionButton'>
              <RaisedButton
                label='Add Selection'
                labelColor={pinkA400}
                onClick={this.handleSubmit}
              />
            </div>
          </div>
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
}

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  username: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  saveSelectionTitle: (title) => dispatch(getCurrentSelection(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
