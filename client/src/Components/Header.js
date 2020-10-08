import React from 'react';

const Header = (props) => {
  const { authUser, setAuthUser} = props;

  const signOut = () => {
    setAuthUser(null);
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          {
            authUser
            ? <nav><span>{`Welcome, ${authUser.firstName}!`}</span><a className="signing" onClick={signOut} href="/">Sign Out</a></nav>
            : <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
          }
          
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Header;