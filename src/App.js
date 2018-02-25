import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pinkA400 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

import './App.css';
import Router from './router';

const muiTheme = getMuiTheme({
  textField: {
    textColor: pinkA400,
    floatingLabelColor: pinkA400,
    focusColor: pinkA400,
    borderColor: pinkA400,
  },
});

class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Router />
          <Snackbar
            open={(new Date()).getTime() <= this.props.noteTime}
            message={this.props.noteMsg}
            autoHideDuration={5000}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  noteTime: state.notification.notificationTime,
  noteMsg: state.notification.notificationMessage
})

export default connect(mapStateToProps, null)(App);
