import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import animationFaceId from "../img/faceid.gif"
import Buttonb from "./icons/Buttonb.png"
import useAxiosAuth from "../hooks/useAxiosAuth";


import "./css/Faceid.scss"

const FaceId = () => {

  const navigate = useNavigate();
  const [user, auth] = useAxiosAuth("datauser");

  useEffect(() => {
    if (auth === true) {
      setTimeout(() => {
        navigate("/portal")
      }, 5000);

    } else if (auth === false) {
      setTimeout(() => {
        navigate("/");
      }, 5000)
    }
  }, [auth])

  return (
    <div className="Faceid">

      <Link to={"/"}> <img className="buttonBack" src={Buttonb} ></img></Link>
      <img src={animationFaceId}></img>
      <p>Reconocimiento Facial</p>


    </div>
  )
}

export default FaceId