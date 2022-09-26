import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Portal from "../pages/Portal"
import Activities from "../pages/Activities"
import Planes from "../pages/Planes"
import "./css/Main.scss"
import FaceId from './FaceId'
import Reserved from "../pages/Reserved"
import ActivityReserved from '../pages/ActivityReserved'
import Recomendador from './Recomendador'
 


const Main = () => {
  return (
    <div className='Main'>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/portal' element={<Portal />} />
        <Route path='/act1/:idact' element={<Activities />} />
        <Route path='/planes' element={<Planes />} />
        <Route path='/reserved/:id' element={<Reserved />} />
        <Route path='/faceid' element={<FaceId />} />
        <Route path='/activityreserved/:idact/:sessionact' element={<ActivityReserved />} />
        <Route path='/recomendador' element={<Recomendador />} />

      </Routes>



    </div>
  )
}

export default Main