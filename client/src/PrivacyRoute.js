import React from 'react';
import {Redirect} from 'react-router-dom';

const PrivacyRoute = ({children, authUser}) => {
  console.log(authUser);
  return (
    <React.Fragment>
      {
        authUser
        ? children
        : <Redirect to="/signin"/>
      }
    </React.Fragment>
  );
};

export default PrivacyRoute;