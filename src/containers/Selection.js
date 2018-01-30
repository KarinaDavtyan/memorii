import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { pinkA400 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { selectionsChange } from '../actions';


class Selection extends React.Component {

  state = {
    toDelete: '',
    selection: '',
    title: '',
    selections: ''
  }


  componentWillReceiveProps (nextProps) {
    if (this.props.selections.length !== nextProps.selections.length) {
      console.log(this.props.selections, nextProps.selections);
      this.setState({
        selections: nextProps.selections.length
      })
    }
  }

  handleSubmit = () => {
    const { title } = this.state;
    this.saveSelections(title);
    this.setState({
      title:''
    })
    this.props.selectionsChange();
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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
      .then(data => data)
  }

  saveSelections = (data) => {
    fetch(`http://Karina-MacBookPro.local:3000/selection/${data}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth}`
      }
    })
  }

  // handleDelete = (title) => {
  //   this.deleteSelection(title);
  //   this.props.selectionsChange();
  // }

  renderSelection = () => {
    const style = {
      margin: 20
    };
    if (this.props.selections) {
      let selections = this.props.selections.map(selection => {
        return (
          <div className='SelectionItem' key={selection._id}>
            <Paper style={style} zDepth={2} >
              <div className='PaperContainer'>
                <Link to={`/${this.props.username}/${this.state.selection}`}>
                  <div className='SelectionTitle' onMouseUp={()=> this.setState({ selection : selection.title })}>
                    <p>
                      {selection.title}
                    </p>
                  </div>
                </Link>
                <div className='DeleteButton'>
                  <FlatButton
                    label='DELETE'
                    onClick={() => this.deleteSelection(selection.title)}
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
          <h1>
            {this.props.username}'s Selections
          </h1>
          <div className="SelectionContainer">
            {this.renderSelection()}
          </div>
          <div className='addSelectionButton'>
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

const mapDispatchToProps = (dispatch) => ({
  selectionsChange: () =>  dispatch(selectionsChange())
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth.token,
    username: state.auth.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
