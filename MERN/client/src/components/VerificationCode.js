import React, { useEffect, useState } from "react";
import "./css/VerificationCode.scss";
import { Link } from 'react-router-dom'
import Buttonb from "./icons/Buttonb.png"

const VerificationCode = (props) => {

  const [msm1, setMsm1] = useState("");
  const [msm2, setMsm2] = useState("");
  const [msm3, setMsm3] = useState("");
  const [msm4, setMsm4] = useState("");
  const [secretNumber, setSecretNumber] = useState("");
  useEffect(() => {

  }, []);
  const test = () => {
    props.show(true);
    props.hidden(false);
  };

  const generateRandomNumber = () => {

    let randomNumber = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    setSecretNumber(randomNumber)

    alert("Su código de verificación es " + randomNumber)

  }


  return (
    <div >

      <img className="buttonBack" src={Buttonb} onClick={() => {
        props.back(true);
        props.hidden(false);
      }}></img>

      <h2 className="titleCreate">Crear una cuenta</h2>

      <div className="VerificationCodes">

        <p className="textSMS">Código de verificación SMS</p>
        <p className="textInfo">Hemos enviado un código de seguridad a su número de teléfono</p>
        <div className="VerificationCode">
          <input type="text" value={secretNumber[0]} onChange={(e) => setMsm1(e.target.value)} />
          <input type="text" value={secretNumber[1]} onChange={(e) => setMsm2(e.target.value)} />
          <input type="text" value={secretNumber[2]} onChange={(e) => setMsm3(e.target.value)} />
          <input type="text" value={secretNumber[3]} onChange={(e) => setMsm4(e.target.value)} />

        </div>

        <div className="button-div">
          {secretNumber ? <button onClick={test}>Confirmar</button> : <button onClick={generateRandomNumber}>Confirmar</button>
          }
        </div>
      </div>

    </div>
  );
};

export default VerificationCode;
