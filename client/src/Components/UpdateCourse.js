import React, { useEffect, useState }from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import btoa from 'btoa';

const UpdateCourse = (props) => {
  const [course, setCourse] = useState({});
  const [errors, setErrors] = useState({});
  const {authUser} = props;
  const history = useHistory();

  let id = props.computedMatch.params.id;
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.log(err));
  }, [id]);

  const handleCancel = e => {
    e.preventDefault();
    history.push(`/courses/${id}`);
  };

  const handleChange = (event) => {
    setCourse({...course, [event.target.name]: event.target.value});
  }

  const checkStatus = (status) => {
    if (status === 204) {
      history.push(`/courses/${id}`);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const emailAddress = JSON.parse(Cookies.get('authUser')).emailAddress;
    const password = JSON.parse(Cookies.get('authUser')).password;
    
    await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`),
      },
      credentials: 'same-origin',
      body: JSON.stringify(course),
    })
    .then(res => checkStatus(res.status))
    .catch(err => setErrors(errors))
  }

  return (
    <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={course.title ? course.title : ''} onChange={handleChange} /></div>
                <p>{`By ${authUser.firstName} ${authUser.lastName}`}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className="" placeholder="Course description..." value={course.description ? course.description : ''} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={course.estimatedTime ? course.estimatedTime : ''} onChange={handleChange}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={course.materialsNeeded ? course.materialsNeeded : ''} onChange={handleChange}/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
          </form>
        </div>
      </div>
  );
};

export default UpdateCourse;