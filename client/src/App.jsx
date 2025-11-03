import React from 'react'
import './App.css'
import Navbar from './Pages/Navbar/Navbar.jsx'  
import Welcome from './Components/Welcome/Welcome.jsx'
import About from './Components/About/About.jsx'
import Footer from './Pages/Footer/Footer.jsx'
import Features from './Components/Features/Features.jsx'
import HowItWorks from './Components/Works/Works.jsx'
import Contact from './Components/Contact/Contact.jsx'

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Welcome />
      <About />
      <Features />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
