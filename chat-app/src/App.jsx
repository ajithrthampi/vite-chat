import { useContext, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Homepage from './pages/Homepage'
// import Login from './pages/Login'
import Register from './pages/Register'
import { AuthContext } from './context/AuthContext'



function App() {
  const {currentUser} = useContext(AuthContext)
  

  const ProtectedRoute =  ({children}) => {
    if(!currentUser){
        return <Navigate to="/" />
    } 
    return children
}

  return (
    <>
      <div className=''>
        <Router>
          <Routes> 
            <Route path="/" element={<Register/>}/>
            <Route path="/home" element={
              <ProtectedRoute>
              <Homepage/>
            </ProtectedRoute>
            }/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
