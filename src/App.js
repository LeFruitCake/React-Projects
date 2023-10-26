import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Dashboard from './dashboard';
import Test from './test';


function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Test/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    );
  }
  
  export default App;