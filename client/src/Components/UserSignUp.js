import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const UserSignUp = (props) => {
  const { setAuthUser } = props;
  const [ formInfo, setFormInfo ] = useState({});
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  // sends user to home on cancel
  const handleCancel = e => {
    e.preventDefault();
    history.push(`/`);
  };

  // updates form info when input values change
  const handleChange = (event) => {
    setFormInfo({...formInfo, [event.target.name]: event.target.value});
  }

  // sends a post fetch to API with user info and returns valid or errors
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
      // sends to /error if server error
      if (res.status === 500) {
        return history.push('/error');
      // displays errors if validation errors
      } else if (res.status === 400) {
        return res.json();
      // if valid, sets user info and redirecsts to home 
      } else {
        setAuthUser(formInfo);
        return history.push('/');
      }
    })
    .then(data => setErrors(data.errors))
    .catch(err => console.log(err))
  }
  
  return (
    <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          {/* displays validation errors if errors */}
          {
            errors
            ? <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                  <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                  </ul>
                </div>
              </div>
            : ''
          }
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