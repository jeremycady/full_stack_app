import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const CourseDetail = ({match}) => {
  const [course, setCourse] = useState({});
  const [isOwner, setIsOwner] = useState(true);
  const history = useHistory();
  const ownerError = () => {
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

  let id = match.params.id;
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.log(err));
  }, [id]);

  const ownerData = {...course.owner};

  const updateHandler = () => {
    if (ownerData.emailAddress === JSON.parse(Cookies.get('authUser')).emailAddress) {
      history.push(`/courses/${id}/update`);
    } else {
      setIsOwner(false);
    }
  };
  
  return (
    <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><span className="button" onClick={updateHandler}>Update Course</span><a className="button" href={`/courses/${course.id}/delete`}>Delete Course</a></span><a
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
