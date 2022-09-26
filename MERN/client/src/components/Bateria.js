import React, { useState , useEffect } from "react";
import cabecera from "../img/Light.png";
import infoPhoneIcon from "../components/icons/infophone.png";

import "./css/Battery.scss";
 
const Bateria = () => {
  const [hour, setHour] = useState("");

 
  useEffect(() => {
    let hoy = new Date();
    let hora = hoy.getHours() + ':' + ('0'+hoy.getMinutes()).slice(-2);

    setHour(hora)
  }, [ ])
  

  return (
    <div className="Battery">
      <div className="hour-div"><h6>{hour}</h6></div>

      <div className="infophone-div">
        <img src={infoPhoneIcon}></img>
      </div>
 
    </div>
  );
};

export default Bateria;

