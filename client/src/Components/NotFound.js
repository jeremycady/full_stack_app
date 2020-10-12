import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return(
    <React.Fragment>
      <div className="bounds">
        <div className="grid-100">
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
    </div>
    <div className="bounds course--detail">
    <div className="course--header">
      <h1>Not Found</h1>
    </div>
      <p>Sorry! We couldn't find the page you're looking for.</p>
    </div>
    </React.Fragment>
  );
};

export default NotFound;