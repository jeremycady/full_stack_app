import React from 'react';

const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Header;