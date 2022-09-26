import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./css/Home.scss"
import cohouse from "../img/COHAUSE.png";
 

const Home = () => {

useEffect( () => {

 }, [ ])


  return (
    <div className='Home'>
      <div className='Bienvenida'>
        <p className="text">Bienvenido a</p>
        <img src={cohouse}></img>

        <p className="text2">Disfruta de tu tercera juventud</p>

      </div>
      <div className='buttons'>
        <button className='login'><Link to={"/login"} > Iniciar sesión</Link></button>
        <button className='register'><Link to={"/register"} >Crear una cuenta</Link></button>
      </div>

     
    </div>
  )
}

export default Home