import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar.jsx'
import Home from './component/Home/Home.jsx'
import Signup from './component/Auth/Signup.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification/:id" element={<Otpverification />} />
        <Route path="/shop" element={<div className="p-10 text-2xl">Shop Page</div>} />
        <Route path="/garage" element={<div className="p-10 text-2xl">Garage Page</div>} />
        <Route path="/build" element={<div className="p-10 text-2xl">Build Page</div>} />
        <Route path="/community" element={<div className="p-10 text-2xl">Community Page</div>} />
        <Route path="/support" element={<div className="p-10 text-2xl">Support Page</div>} />
        <Route path="/category/:slug" element={<div className="p-10 text-2xl">Category Page</div>} />
      </Routes>
    </div>
  )
}
