import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown')

const CourseDetail = (props) => {
  const {authUser, match } = props;
  const [course, setCourse] = useState({});
  const history = useHistory();
  
  // fetches course details and sets to state and handles 500 and 404s
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${match.params.id}`)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 500) {
        return history.push('/error');
      } else {
        return history.push('/notfound');
      }
    })
    .then(data => {
      if (data) {
        return setCourse(data)
      }
    })
    .catch(err => console.log(err));
  }, [history, match.params.id]);

  // had to set because course.owner.data was returning an error upon mounting. If owner did not have a value, calling a property would return an error. Using a spread operator and setting it to ownerData eliminated this error.
  const ownerData = {...course.owner};

  // checks if correct authUser
  // const handleUpdate = () => {
  //   if (authUser && ownerData.emailAddress !== authUser.emailAddress) {
  //     history.push('/forbidden');
  //   } else {
  //     history.push(`/courses/${match.params.id}/update`);
  //   }
  // };

  // checks the status of the handleDelete function
  const checkStatus = (status) => {
    if (status === 204) {
      history.push(`/courses`);
    } else if (status === 500) {
      history.push('/error');
    }
  };

  // checks authUser and either sends a delete request or /forbidden
  async function handleDelete() {
    if (authUser && ownerData.emailAddress === authUser.emailAddress) {
      await fetch(`http://localhost:5000/api/courses/${match.params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`),
      },
      credentials: 'same-origin',
    })
    .then(res => checkStatus(res.status))
    .catch(err => console.log(err))
    } else {
      history.push('/forbidden');
    }
  }
  
  return (
    <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            {/* if authUser renders Update and Delete buttons */}
            {
              (authUser && ownerData.emailAddress === authUser.emailAddress)
              ? <span>
                  <Link className="button" to={`/courses/${match.params.id}/update`}>Update Course</Link>
                  <button className="button" onClick={handleDelete}>Delete Course</button>
                </span>
              : ''
            }
              
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {ownerData.firstName} {ownerData.lastname}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={course.description}/>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={course.materialsNeeded}/>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CourseDetail;
