import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Route,
  Redirect, 
  Switch
} from "react-router-dom";

// import Components
import PrivateRoute from './PrivateRoute';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';

function App() {
  const [authUser, setAuthUser] = useState(Cookies.getJSON('authUser') || null);

  useEffect(() => {
    if (authUser) {
      Cookies.set('authUser', authUser, {expires: 1});
    } else {
      Cookies.remove('authUser')
    }
  }, [authUser]);

  return (
    <Router>
      <Header authUser={authUser} setAuthUser={setAuthUser}/>
      <Route exact path="/">
        <Redirect to="/courses" />
      </Route>
      <Switch>
        <Route exact path="/courses" render={ () => <Courses /> }/>
        <PrivateRoute path="/courses/create" authUser={authUser} Component={CreateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail}/>
        <Route path="/signin" render={ () => <UserSignIn setAuthUser={setAuthUser} />}/>
        <Route path="/signup" render={UserSignUp}/>
        <PrivateRoute path="/courses/:id/update" authUser={authUser} Component={UpdateCourse} />
      </Switch>
    </Router>
  );
}

export default App;
