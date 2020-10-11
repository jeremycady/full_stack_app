import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const UserSignUp = (props) => {
  const { setAuthUser } = props;
  const [ formInfo, setFormInfo ] = useState({});
  const history = useHistory();

  const handleCancel = e => {
    e.preventDefault();
    history.push(`/`);
  };

  const handleChange = (event) => {
    setFormInfo({...formInfo, [event.target.name]: event.target.value});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    await fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
      body: JSON.stringify(formInfo),
    })
    .then(res => {
      if (res.status === 500) {
        return history.push('/error');
      } else {
        setAuthUser(formInfo);
        return history.push('/');
      }
    })
    .catch(err => console.log(err))
  }
  
  return (
    <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  className="" 
                  placeholder="First Name" 
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  className="" 
                  placeholder="Last Name" 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text" 
                  className="" 
                  placeholder="Email Address" 
                  onChange={handleChange}
                />
              </div>
              <div>
                <input 
                id="password" 
                name="password" 
                type="password" 
                className="" 
                placeholder="Password" 
                onChange={handleChange}
              />
              </div>
              <div>
                <input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  className="" 
                  placeholder="Confirm Password" 
                  onChange={handleChange}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
        </div>
      </div>
  );
};

export default UserSignUp;