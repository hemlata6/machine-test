import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from './components/Login/LoginForm';
import VisitorDashboard from './components/dashboard/VisitorDashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/visiter" element={<VisitorDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
