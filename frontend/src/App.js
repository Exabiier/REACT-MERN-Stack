import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

///////////// Pages ////////////
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './Layout/Header';
import NewTicket from './Pages/New-Ticket/NewTicket';
import PrivateRoutes from './Pages/New-Ticket/PrivateRoutes';


function App() {
  return  <>
  <Router>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

        <Route path="/new-ticket" element={<PrivateRoutes />}>
        <Route path="/new-ticket" element={<NewTicket />} />
        </Route>

      </Routes>
    </div>
  </Router>
  <ToastContainer />
  </>

  

    
}

export default App;
