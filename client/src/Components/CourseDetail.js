import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CourseDetail = (props) => {
  const {authUser, match } = props;
  const [course, setCourse] = useState({});
  const [isOwner, setIsOwner] = useState(true);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const ownerError = () => {
    return (
      <div>
        <h2 className="validation--errors--label">Authorization Error</h2>
        <div className="validation-errors">
          <ul>
            <li>You are not Authorized to make changes to this course</li>
          </ul>
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${match.params.id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.log(err));
  }, []);

  const ownerData = {...course.owner};

  const handleUpdate = () => {
    if (ownerData.emailAddress === authUser.emailAddress) {
      history.push(`/courses/${match.params.id}/update`);
    } else {
      setIsOwner(false);
    }
  };

  const checkStatus = (status) => {
    if (status === 204) {
      history.push(`/courses`);
    }
  };

  async function handleDelete() {
    if (ownerData.emailAddress === authUser.emailAddress) {
      await fetch(`http://localhost:5000/api/courses/${match.params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`),
      },
      credentials: 'same-origin',
    })
    .then(res => checkStatus(res.status))
    .catch(err => setErrors(err))
    } else {
      setIsOwner(false);
    }
  }
  
  return (
    <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><span className="button" onClick={handleUpdate}>Update Course</span><span className="button" onClick={handleDelete}>Delete Course</span></span><a
                className="button button-secondary" href="/">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">

          {!isOwner && ownerError()}
          

          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {ownerData.firstName} {ownerData.lastname}</p>
            </div>
            <div className="course--description">
              {course.description}
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
                    {course.materialsNeeded}
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
