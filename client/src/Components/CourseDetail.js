import React, { useState, useEffect } from 'react';

const CourseDetail = ({match}) => {
  const [course, setCourse] = useState({});

  let id = 1;
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.log(err));
  }, [id]);

  let ownerData = {...course.owner};
  
  return (
    <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href={`/courses/${course.id}/update`}>Update Course</a><a className="button" href={`/courses/${course.id}/delete`}>Delete Course</a></span><a
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
