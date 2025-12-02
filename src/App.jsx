
import { Route, Router, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard'
import FindSitter from './pages/FindSitter'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Private from './components/Private'
import Profile from './pages/Profile'
import Request from './pages/Request'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path='/dashboard' element={<Private><Dashboard /></Private>}></Route>
        <Route path='/pet-sitter' element={<FindSitter />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/profile/:userId' element={<Profile />}></Route>
        <Route path='request/:userId' element={<Private><Request /></Private>}></Route>
      </Routes>
    </>
  )
}

export default App
