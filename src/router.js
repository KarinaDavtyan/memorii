import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Submit from './containers/Submit';
import LogIn from './containers/LogIn';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={LogIn}/>
      <Route path="/submit" component={Submit}/>
    </div>
  </Router>
)

export default Routes;
