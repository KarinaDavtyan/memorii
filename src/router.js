import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Submit from './containers/Submit';
import LogIn from './containers/LogIn';
import Register from './components/Register';
import UserPath from './containers/UserPath';
import LogInForm from './containers/LogInForm';


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={LogIn}/>
      <Route path="/submit" component={Submit}/>
      <Route path="/register" component={Register}/>
      <Route path="/welcome" component={UserPath}/>
      <Route path="/login" component={LogInForm}/>

    </div>
  </Router>
)

export default Routes;
