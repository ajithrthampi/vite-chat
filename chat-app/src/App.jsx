import { useContext, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Homepage from './pages/Homepage'
// import Login from './pages/Login'
import Register from './pages/Register'
import { AuthContext } from './context/AuthContext'
import { ThemeContext } from './components/context/ThemeContext'



function App() {

  const [value, setValue] = useState(false)
  const {currentUser} = useContext(AuthContext)
  // console.log("ENV file", process?.env);

  const ProtectedRoute =  ({children}) => {
    if(!currentUser){
        return <Navigate to="/" />
    } 
    return children
}





  return (
    <>
      <div className={
        value === true ? "theme-light" : ""
      }>
        <ThemeContext.Provider value={{value, setValue}}>
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
        </ThemeContext.Provider>
      </div>
    </>
  )
}

export default App
