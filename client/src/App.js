import React, { useState } from 'react';
import Cookies from 'js-cookie';
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
  const [authUser, setAuthUser] = useState(Cookies.getJSON('authUser') || null);

  return (
    <React.Fragment>
      <Header />
      <Router>
        <Route exact path="/">
          <Redirect to="/courses" />
        </Route>
        <Switch>
          <Route exact path="/courses" render={ () => <Courses /> }/>
          <Route path="/courses/create" render={CreateCourse}/>
          <Route exact path="/courses/:id" render={ () => <CourseDetail /> }/>
          <Route path="/signin" render={ () => <UserSignIn authUser={authUser} setAuthUser={setAuthUser} />}/>
          <Route path="/signup" render={UserSignUp}/>
          <Route path="/courses/:id/update" render={UpdateCourse}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
