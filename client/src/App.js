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
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import Forbidden from './Components/Forbidden';
import UnhandledError from './Components/UnhandledError';
import NotFound from './Components/NotFound';

function App() {
  // initializes user to cookie informatin or to null
  const [authUser, setAuthUser] = useState(Cookies.getJSON('authUser') || null);

  // creates a cookie if new authUser or removes cookie if set to null (signin/signout)
  useEffect(() => {
    if (authUser) {
      Cookies.set('authUser', authUser, {expires: 1});
    } else {
      Cookies.remove('authUser')
    }
  }, [authUser]);

  return (
    <Router>
      <Header authUser={authUser} />
      <Route exact path="/">
        <Redirect to="/courses" />
      </Route>
      <Switch>
        <Route exact path="/courses" render={ () => <Courses /> }/>
        {/* Private route available to only authUser */}
        <PrivateRoute path="/courses/create" authUser={authUser} Component={CreateCourse} />
        <Route exact path="/courses/:id" render={(props) => <CourseDetail authUser={authUser} {...props}/>}/>
        <Route path="/signin" render={ (props) => <UserSignIn setAuthUser={setAuthUser} {...props}/>}/>
        <Route path="/signup" render={() => <UserSignUp setAuthUser={setAuthUser}/>}/>
        <Route path='/signout' render={() => <UserSignOut setAuthUser={setAuthUser} />}/>
        {/* Private route available to only authUser */}
        <PrivateRoute path="/courses/:id/update" authUser={authUser} Component={UpdateCourse} />
        <Route path="/forbidden" component={Forbidden}/>
        <Route path="/error" component={UnhandledError}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
