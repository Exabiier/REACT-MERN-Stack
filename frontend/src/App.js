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
import Tickets from './Pages/TicketsFolder/Tickets';
import Ticket from './Pages/Ticket';


function App() {
  return  <>
  <Router>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

        {/* Protected Routes */}
        <Route path="/new-ticket" element={<PrivateRoutes />}>
        <Route path="/new-ticket" element={<NewTicket />} />
        </Route>
        <Route path="/tickets" element={<PrivateRoutes />}>
        <Route path="/tickets" element={<Tickets />} />
        </Route>
        <Route path="/ticket/:ticketId" element={<PrivateRoutes />}>
        <Route path="/ticket/:ticketId" element={<Ticket />} />
        </Route>

      </Routes>
    </div>
  </Router>
  <ToastContainer />
  </>

  

    
}

export default App;
