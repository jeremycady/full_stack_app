import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const UserSignOut = (props) => {
  const {setAuthUser} = props;

  // signs user out and redirects to home
  useEffect(() => {
    setAuthUser(null);
  });
  
  return(
    <Redirect to='/'/>
  );
};

export default UserSignOut;