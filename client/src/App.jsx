import {BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './Pages/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>



)

export default App
