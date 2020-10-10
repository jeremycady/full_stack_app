import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = (props) => {
  const {authUser, path, Component} = props;
  if (authUser)
    return (<Route render={_=> <Component authUser={authUser} {...props}/>} />)
  else
    return (<Redirect from={path} to={{
      pathname: '/signin',
      from: props.location
    }} />);
};

export default PrivateRoute;