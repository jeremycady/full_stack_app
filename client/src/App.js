import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect, 
  Switch
} from "react-router-dom";

// import Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';

function App() {

  return (
    <React.Fragment>
      <Header />
      <Router>
        <Route exact path="/">
          <Redirect to="/courses" />
        </Route>
        <Switch>
          <Route exact path="/courses">
            <Courses />
          </Route>
          <Route path="/courses/create" render={CreateCourse}/>
          <Route exact path="/courses/:id" render={ () => <CourseDetail /> }/>
          <Route path="/signin" render={UserSignIn}/>
          <Route path="/signup" render={UserSignUp}/>
          <Route path="/courses/:id/update" render={UpdateCourse}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
