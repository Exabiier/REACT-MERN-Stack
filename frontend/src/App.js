import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './Layout/Header';


function App() {
  return  <>
  <Router>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      
      </Routes>
    </div>
  </Router>
  </>

  

    
}

export default App;
