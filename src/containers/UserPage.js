import React from 'react';
import { connect } from 'react-redux';

import {
  getAllSelections,
  postSelection,
  deleteSelection
} from '../actions';

import Selection from './Selection';

class UserPage extends React.Component {

  componentDidMount () {
    if (this.props.selections.length === 0) {
      this.props.getAllSelections();
    }
  }

  render () {
    return (
      <div className="UserPage">
        <Selection
          selections={this.props.selections}
          onSave={(data) => this.props.postSelection(data)}
          onDelete={(data) => this.props.deleteSelection(data)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selections: state.selections.list
})

const mapDispatchToProps = (dispatch) => ({
  getAllSelections: () => dispatch(getAllSelections()),
  postSelection: (data) => dispatch(postSelection(data)),
  deleteSelection: (data) => dispatch(deleteSelection(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
