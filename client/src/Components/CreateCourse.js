import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const CreateCourse = (props) => {
  const [course, setCourse] = useState({});
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const {authUser} = props;
  const history = useHistory();

  const handleCancel = e => {
    e.preventDefault();
    history.push(`/`);
  };

  const handleChange = (event) => {
    setCourse({...course, [event.target.name]: event.target.value});
  }

  const validationError = (errors) => {
    return (
      <div>
        <h2 className="validation--errors--label">Update Error</h2>
        <div className="validation-errors">
          <ul>
            <li>You are not Authorized to update this course</li>
          </ul>
        </div>
      </div>
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const emailAddress = JSON.parse(Cookies.get('authUser')).emailAddress;
    const password = JSON.parse(Cookies.get('authUser')).password;
    
    await fetch(`http://localhost:5000/api/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`),
      },
      credentials: 'same-origin',
      body: JSON.stringify(course),
    })
    .then(res => res.headers.get('Location'))
    .then(location => history.push(location))
    .catch(err => setErrors(err))
  }

  return (
    <div className="bounds course--detail">
    <h1>Create Course</h1>
      <div>
       {isError && validationError()}

      <form onSubmit={handleSubmit}>
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <div>
              <input 
                id="title" 
                name="title" 
                type="text" 
                className="input-title course--title--input" 
                placeholder="Course title..."
                onChange={handleChange}
              />
            </div>
            <p>{`By ${authUser.firstName} ${authUser.lastName}`}</p>
          </div>
          <div className="course--description">
            <div>
              <textarea 
                id="description" 
                name="description" 
                className="" 
                placeholder="Course description..." 
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <div>
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    type="text" 
                    className="course--time--input"
                    placeholder="Hours" 
                    onChange={handleChange} 
                  />
                </div>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <div>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded" 
                    className="" 
                    placeholder="List materials..." 
                    onChange={handleChange} 
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">Create Course</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default CreateCourse;