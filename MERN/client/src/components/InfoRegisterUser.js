import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "./css/InfoRegisterUser.scss";
import Buttonb from "./icons/Buttonb.png";

import Home from "./icons/Home.png";
import HomeGreen from "./icons/HomeGreen.png";

import Name from "./icons/Profile.png";
import NameGreen from "./icons/ProfileGreen.png";

import Tlf from "./icons/Call.png";
import TlfGreen from "./icons/CallGReen.png";

import Age from "./icons/Calandar.png";
import AgeGreen from "./icons/CalandarGreen.png";


function InfoRegisterUser(props) {
  const [idCoHousing, setidCoHousing] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [tlfUser, setTlfUser] = useState("");
  const [dateUser, setDateUser] = useState("");

  const [styleHouse, setStyleHouse] = useState("")
  const [styleName, setStyleName] = useState("")
  const [styleIphone, setStyleIphone] = useState("")
  const [styleAge, setStyleAge] = useState("");

  const [styleBorderHouse, setStyleBorderHouse] = useState()
  const [styleBorderName, setStyleBorderName] = useState()
  const [styleBorderTlf, setStyleBorderTlf] = useState()
  const [styleBorderDate, setStyleBorderDate] = useState()

  useEffect(() => {

    var regExpCode = new RegExp(/\d{9}/);
    var regExpName = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u);
    var regExpTlf = new RegExp(/\d{9}/);
    const idCoHousingOk = regExpCode.test(idCoHousing);
    const nameUserOk = regExpName.test(nameUser);
    const tlfUserOk = regExpTlf.test(tlfUser);
    const dateUserOk = (dateUser > 1912 && dateUser < 1967);

    idCoHousingOk ? setStyleHouse(true) : setStyleHouse(false);
    // idCoHousingOk ? setStyleBorderHouse("border-green") : setStyleBorderHouse("border-normal");

    nameUserOk ? setStyleName(true) : setStyleName(false);
    // nameUserOk ? setStyleBorderName("border-green") : setStyleBorderHouse("border-normal");

    tlfUserOk ? setStyleIphone(true) : setStyleIphone(false);
    // tlfUserOk ? setStyleBorderTlf("border-green") : setStyleBorderHouse("border-normal");

    dateUserOk ? setStyleAge(true) : setStyleAge(false);
    // dateUserOk ? setStyleBorderDate("border-green") : setStyleBorderHouse("border-normal");

  }, [idCoHousing, nameUser, tlfUser, dateUser])

  const test = () => {

    let filtro = {
      idCoHousing,
      nameUser,
      tlfUser,
      dateUser,
     
    };



    if (!styleHouse | !styleName | !styleIphone | !styleAge) {
      alert("revisa los campos");
    } else {


      axios.post("checkdata", filtro).then((res) => {
        alert(res.data.message);
        if (res.data.dataRegisterUser) {
          props.saveDataUser(res.data.dataRegisterUser);
          props.hidden(false);
          props.show(true);
      
        }
      });
    }
  };

  return (
    <div className="cnt-infregist">
      <Link to={"/"}> <img className="buttonBack" src={Buttonb} ></img></Link>
      <h2 className="titleCreate">Crear una cuenta</h2>

      <div className="InfoRegisterUser">

        <label>Código Co-Housing</label>

        <div className="border-green">


          <img className="icons ihome" src={styleHouse ? HomeGreen : Home}></img>
          <input
            type="number"
            placeholder="000-000-000"
            className="inputs-color"
            onChange={(e) => setidCoHousing(e.target.value)}
          />
        </div>

        <label>Nombre y Apellido</label>
        <div className={styleBorderName}>
          <img className="icons iname" src={styleName ? NameGreen : Name}></img>
          <input
            type="text"
            placeholder="Alberto Fernández"
            onChange={(e) => setNameUser(e.target.value)}
          />
        </div>

        <label>Número de Teléfono</label>
        <div className={styleBorderTlf}>
          <img className="icons itlf" src={styleIphone ? TlfGreen : Tlf}></img>
          <input
            type="number"
            placeholder="600 000 000"
            onChange={(e) => setTlfUser(e.target.value)}
          />

        </div>
        <label>Año de Nacimiento</label>
        <div className={styleBorderDate}>

          <img className="icons iage" src={styleAge ? AgeGreen : Age}></img>
          <input
            type="text"
            placeholder="1950"
            onChange={(e) => setDateUser(e.target.value)}
          />

        </div>
        <button onClick={test}>Continuar</button>
      </div>
    </div >

  );
}

export default InfoRegisterUser;