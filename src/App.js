import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {pinkA400} from 'material-ui/styles/colors';

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
        <Router />
      </MuiThemeProvider>
    );
  }
}

export default App;
