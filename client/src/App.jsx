import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

import Navbar from './Pages/Navbar/Navbar.jsx'
import Welcome from './Components/Welcome/Welcome.jsx'
import About from './Components/About/About.jsx'
import Features from './Components/Features/Features.jsx'
import HowItWorks from './Components/Works/Works.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Footer from './Pages/Footer/Footer.jsx'

import Login from './Auth/Login/Login.jsx'
import Register from './Auth/Register/Register.jsx'

const App = () => {
  const location = useLocation()

  // Routes where navbar & footer should NOT show
  const hideLayoutRoutes = ['/login', '/register']

  const hideLayout = hideLayoutRoutes.includes(location.pathname)

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}

export default App
