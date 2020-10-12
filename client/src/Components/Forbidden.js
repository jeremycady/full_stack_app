import React from 'react';
import {Link} from 'react-router-dom';

const Forbidden = () => {
  return (
    <React.Fragment>
      <div className="bounds">
        <div className="grid-100">
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
      <div className="bounds course--detail">
      <div className="course--header">
        <h1>Forbidden</h1>
      </div>
        <p>Oh oh! You can't access this page.</p>
      </div>
    </React.Fragment>
  );
};

export default Forbidden;