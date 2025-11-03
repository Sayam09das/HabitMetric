import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './Pages/Navbar/Navbar.jsx'
import Welcome from './Components/Welcome/Welcome.jsx'
import About from './Components/About/About.jsx'
import Features from './Components/Features/Features.jsx'
import HowItWorks from './Components/Works/Works.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Footer from './Pages/Footer/Footer.jsx'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
