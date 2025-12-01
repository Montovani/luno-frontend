
import { Route, Router, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard'
import FindSitter from './pages/FindSitter'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/pet-sitter' element={<FindSitter />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </>
  )
}

export default App
