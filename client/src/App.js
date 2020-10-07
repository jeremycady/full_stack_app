import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

// import Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';

function App() {

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
        <Route path ="/signup" render={UserSignUp}/>
      </Router>
    </React.Fragment>
  );
}

export default App;
