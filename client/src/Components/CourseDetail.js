import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CourseDetail = (props) => {
  const {authUser, match } = props;
  const [course, setCourse] = useState({});
  const history = useHistory();
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${match.params.id}`)
    .then(res => handleInitialFetch(res))
    .catch(err => console.log(err));
  }, []);

  const ownerData = {...course.owner};

  async function handleInitialFetch(res) {
    if (res.status === 200) {
      const data = await res.json();
      setCourse(data);
    } else {
      history.push('/notfound');
    }
  };

  const handleUpdate = () => {
    if (authUser && ownerData.emailAddress !== authUser.emailAddress) {
      history.push('/forbidden');
    } else {
      history.push(`/courses/${match.params.id}/update`);
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
    .catch(err => console.log(err))
    } else {
      history.push('/forbidden');
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
