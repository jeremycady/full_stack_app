import React, { useState, useEffect} from 'react';
import Header from './Components/Header';
import Courses from './Components/Courses';

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
      <Courses />
    </React.Fragment>
  );
}

export default App;
