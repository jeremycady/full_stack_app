import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = (props) => {
  const {authUser, path, Component} = props;
  if (authUser)
    return (<Route path={path} render={_=> <Component authUser={authUser} {...props}/>} />)
  else
    return (<Redirect to='/signin'/>);
};

export default PrivateRoute;