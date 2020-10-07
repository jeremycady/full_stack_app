import React, { useState, useEffect} from 'react';
import Header from './Components/Header';

function App() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/courses')
  //     .then(response => response.json())
  //     .then(result => setData(result));
  //   console.log(data);
  // },[]);

  return (
    <Header />
  );
}

export default App;
