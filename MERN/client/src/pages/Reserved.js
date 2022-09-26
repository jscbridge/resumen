import React from 'react'
import confirmed from "../pages/img/confirmed.png"
import "./css/Reserved.scss"
import {Link ,useParams } from "react-router-dom"

const Reserved = () => {

    const {id}=useParams()
  return (
    <div className='Reserved'>
 
        <img src={confirmed} alt="" />

        <button className='login'> <Link to={`/planes`}>Aceptar</Link></button>
    </div>
  )
}

export default Reserved