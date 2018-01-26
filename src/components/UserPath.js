import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { pinkA400 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';

const UserPath = () => {
  return (
    <div className="UserPath">
      <h1>
        Are you new here?
      </h1>
      <div className="buttons">
        <div className="yesButton">
          <Link to="/register">
            <RaisedButton
              label="Yes"
              labelColor={pinkA400}
            />
          </Link>
        </div>
        <div className="noButton">
          <Link to="/login">
            <RaisedButton
              label="No"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserPath;
