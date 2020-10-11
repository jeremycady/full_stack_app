import React, { useEffect, useState }from 'react';
import { useHistory } from 'react-router-dom';
import btoa from 'btoa';

const UpdateCourse = (props) => {
  const [course, setCourse] = useState({});
  const [errors, setErrors] = useState(null);
  const {authUser} = props;
  const history = useHistory();
  
  // fetches course details and sets course in state
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${props.computedMatch.params.id}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 500) {
          return history.push('/error');
        } else {
          history.push('/notfound');
        }
      })
      .then(data => {
        if (data) {
          return setCourse(data);
        }
      })
      .catch(err => console.log(err));
  }, [history, props.computedMatch.params.id]);

  // return user to CourseDetail if cancelled
  const handleCancel = e => {
    e.preventDefault();
    history.push(`/courses/${props.computedMatch.params.id}`);
  };

  // updates course form info on input values change
  const handleChange = (event) => {
    setCourse({...course, [event.target.name]: event.target.value});
  }

  // on submit, sends authUser and updated course info to API
  async function handleSubmit(e) {
    e.preventDefault();
    
    await fetch(`http://localhost:5000/api/courses/${props.computedMatch.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`),
      },
      credentials: 'same-origin',
      body: JSON.stringify(course),
    })
    .then(res => {
      // successful put sends user to CourseDetail
      if (res.status === 204) {
        history.push(`/courses/${props.computedMatch.params.id}`);
      // server error sends user to /error
      } else if (res.status === 500) {
        return history.push('/error');
      // validation error displays errors
      } else if (res.status === 400) {
        const getErrors = async () => {
          const data = await res.json();
          return setErrors(data.errors);
        };

        return getErrors();
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="bounds course--detail">
        <h1>Update Course</h1>
        {/* if validation errors, they are displayed */}
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