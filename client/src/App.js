import React, { useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(result => setData(result));
    console.log(data);
  },[]);
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
