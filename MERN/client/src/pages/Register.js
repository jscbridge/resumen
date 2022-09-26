import React, { useState } from "react";
import InfoRegisterUser from "../components/InfoRegisterUser";
import FaceId from "../components/FaceId";
import VerificationCode from "../components/VerificationCode";
import './css/Register.scss';


function Register() {

  // Estados para ir visuailizando los componentes de Register
  const [viewRegister, setViewRegister] = useState(true)
  const [viewVerification, setViewVerification] = useState(false)
  const [viewFaceId, setViewFaceId] = useState(false)
  const [dataRegisterUser, setDataRegisterUser] = useState("")

  return (

    <div className="App">
      <div>
    
        {viewRegister ? (<InfoRegisterUser saveDataUser={setDataRegisterUser} hidden={setViewRegister} show={setViewVerification} />) : ("")}
        {viewVerification ? (<VerificationCode hidden={setViewVerification} show={setViewFaceId} back={setViewRegister} />) : ("")}
        {viewFaceId ? (<FaceId />) : ("")}
      </div>
    </div>
  );

}

export default Register;
