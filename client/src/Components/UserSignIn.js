import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import btoa from 'btoa';

const UserSignIn = (props) => {
  const { setAuthUser } = props;
  const [ formInfo, setFormInfo ] = useState({emailAddress: '', password: ''});
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${formInfo.emailAddress}:${formInfo.password}`),
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(data => {
      setAuthUser({emailAddress: formInfo.emailAddress, password: formInfo.password, firstName: data.firstName, lastName: data.lastName});
      history.push('/');
    })
    .catch(err => console.log('Wrong authentication'))

    
  }

  function handleCancel(event) {
    event.preventDefault();
    history.push('/');
  } 

  const change = (event) => {
    setFormInfo({...formInfo, [event.target.name]: event.target.value});
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={change} />
            </div>
            <div>
              <input id="password" name="password" type="password" className="" placeholder="Password" onChange={change}/>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Sign In</button>
              <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
      </div>
    </div>
  );

};

export default UserSignIn;