import React, { useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";

// import Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';

function App() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/courses')
  //     .then(response => response.json())
  //     .then(result => setData(result));
  //   console.log(data);
  // },[]);

  return (
    <React.Fragment>
      <Header />
      <Router>
        <Route exact path="/">
          <Redirect to="/courses" />
        </Route>
        <Route exact path="/courses" render={Courses}/>
        <Route path="/courses/:id" render={CourseDetail}/>
        <Route path ="/signin" render={UserSignIn}/>
      </Router>
    </React.Fragment>
  );
}

export default App;
