import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = ({children, ...props}) => {
  const {authUser, path} = props;
  console.log(path);
  return (
    <Route path={path}>
      {
        authUser
        ? children
        : <Redirect to="/signin"/>
      }
    </Route>
  );
};

export default PrivateRoute;