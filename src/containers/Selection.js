import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {pinkA400} from 'material-ui/styles/colors';
import { connect } from 'react-redux';


class Selection extends React.Component {

  state = {
    toDelete: ''
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


  handleClick = (data) => {
    this.deleteSelection(data);
  }
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
                <div className='SelectionTitle'>
                  <p>
                    {selection.title}
                  </p>
                </div>
                <div className='DeleteButton'>
                  <FlatButton
                    label='DELETE'
                    labelColor={pinkA400}
                    onClick={() => this.handleClick(selection.title)}
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
    return (
      <div className="SelectionList">
        <h1>
          {this.props.username}'s Selections
        </h1>
        <div className="SelectionContainer">
          {this.renderSelection()}
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

export default connect(mapStateToProps, null)(Selection);
