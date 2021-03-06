import React from 'react';
import {Link} from 'react-router-dom';

const Error = () => {
  return (
    <React.Fragment>
      <div className="bounds">
        <div className="grid-100">
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
      <div className="bounds course--detail">
      <div className="course--header">
        <h1>Error</h1>
      </div>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </React.Fragment>
  );
};

export default Error;