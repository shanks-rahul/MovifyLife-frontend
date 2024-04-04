import { useState } from 'react'

import './App.css'
import HomeLayout from './layouts/HomeLayout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import DeniedPage from './pages/DeniedPage'
import RequireAuth from './components/Auth/RequireAuth'
import CreateMovie from './pages/Movies/createMovie'
import MovieList from './pages/Movies/MovieList'
import MovieDescription from './pages/Movies/MovieDescription'
import DisplayEpisodes from './pages/Dashboard/DisplayEpisodes'
import AddEpisodes from './pages/Dashboard/AddEpisodes'
import CheckOut from './pages/Payment/checkOut'
import CheckOutSuccess from './pages/Payment/CheckoutSuccess'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import Profile from './pages/User/Profile'
import EditProfile from './pages/User/EditProfile'
import NotFound from './pages/NotFound'
import ContactPage from './pages/ContactPage'

function App() {
  
  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='*' element={<NotFound/>} />
      <Route path='/login' element={<Login/>}  />
      <Route path='/contact' element={<ContactPage/>}  />
      <Route path='/denied' element={<DeniedPage/>} />
      <Route path='/movie' element={<MovieList/>} />
      <Route path='/checkout' element={<CheckOut/>} />
      <Route path='/user/profile' element={<Profile/>} />
      <Route path='/user/editprofile' element={<EditProfile/>} />
      <Route path='/checkout/success' element={<CheckOutSuccess/>} />
      <Route path='/movie/description' element={<MovieDescription/>} />
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
        <Route path='/movie/create' element={<CreateMovie/>} />
        <Route path='/movie/addEpisode' element={<AddEpisodes/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        <Route path='/movie/displayEpisodes' element={<DisplayEpisodes/>} />
      </Route>
     </Routes>
    </>
  )
}

export default App
