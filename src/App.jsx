import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import Medication from './Medication'
import Symptoms from './Symptoms'
import profile from './profile'
import './App.css'


function App() {
  
  return (
    <Router>
      <div className="container">
        <header className='app-header'>
    <h1>💚My Health Buddy</h1>
        </header>

        <main className='app-main'>
    {/* Navigation Menu */}
    <div className="nav-bar">
      <nav>
      <ul className='nav-links'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/medication">Medication</Link></li>
        <li><Link to="/symptoms">Symptoms</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      </nav>
    </div>

{/* Routes */}
<div className="routes">
  <Routes>
   <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path='/medication' element={<Medication/>}/>
       <Route path='/symptoms' element={<Symptoms/>}/>
       <Route path='/profile' element={<profile />} />
  </Routes>
</div>
</main>
  </div>
    </Router>
  

  )
}

export default App
