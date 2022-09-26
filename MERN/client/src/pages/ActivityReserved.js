import React, { useState, useEffect } from "react";
import profesorAvatar from "../img/profesor.png";
import "./css/ActivityReserved.scss";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { circlesArray } from "../circlesreserved"
import useAxiosAuth from "../hooks/useAxiosAuth";

const ActivityReserved = () => {


  const navigate = useNavigate()
  const [users, setUsers] = useState();
  const [allUsers, setAllUsers] = useState();
  const [session, setSession] = useState();
  const [dataActivity, setDataActivity] = useState();
  const [circles, setCircles] = useState("");
  const [idUser, setIdUser] = useState("");
  const [subscription, setSubscription] = useState("");
  const [showButton, setShowbutton] = useState(false);
  const [showMessage, setShowMessage] = useState(false)
  const { idact, sessionact } = useParams();
  useEffect(() => {
    getBannerAct();
    getUsers();
  }, [sessionact]);




  const [datauser, auth] = useAxiosAuth("/datauser");


  useEffect(() => {
    if (datauser != "") {
      let demos = datauser.data.data[0].activities.filter(
        (dat) => dat.idActivity == idact
      );

      if (demos) {
        if (demos[0].status == "process") {
          setSubscription({
            status: true,
            session: demos[0].session,
          });
        } else if (demos[0].status !== "process") {
        }
      } else {

      }

      setIdUser(datauser.data.data[0].idUser);
    }
  }, [datauser]);

  const getBannerAct = () => {
    axios.post("/getoneactivity", { idActivity: idact }).then((res) => {
      let clearActivity = res.data;
      setDataActivity(clearActivity);
    });
  };
  // console.log(session)

  //!Seleciona a los users que se han apuntado a la actividad

  const getUsers = async () => {

    await axios.get("/getusers").then((res) => {


      let cleanUsers = res.data;
      let idActivity = idact;



      setAllUsers(res.data);

      let userss = cleanUsers.filter(
        (act) => act.activities[0].idActivity == `${idActivity}` && act.activities[0].session == `${sessionact}`
      );



      setUsers(userss);
    });
  };

  const savePlan = () => {
    let obj = {
      session: sessionact,
      idActivity: idact,
      idUser: idUser,
      status: "none",
    };




    axios.post("/deleteplan", obj);



    navigate(`/planes`)
  };

  //! Se pasan los filtros de los usuarios por la session que se han apuntado
  const paintUsers = () => {



    if (users != undefined) {




      if (sessionact == 1) {



        let filtrado = users.filter((act) => {
          if (act.activities[0].session == sessionact) {
            return act;
          }
        });



        let length = 20 - filtrado.length;

        let filterLength = 20 - length;

        for (let index = filterLength; index < circlesArray.length; index++) {
          filtrado.push(circlesArray[index]);

        }





        let datos = filtrado.map((user, i) => {
          return (
            <div key={i}>
              <img
                src={user.avatar}

              /*   onClick={() =>
                  user.avatar == "../img/circle.jpg" ? savePlan(1) : ""
                } */
              />
            </div>
          );
        });

        return datos.reverse();
      } else if (sessionact == 2) {
        let filtrado = users.filter((act) => {
          if (act.activities[0].session == sessionact) {
            return act;
          }
        });

        let length = 20 - filtrado.length;
        let filterLength = 20 - length;

        for (let index = filterLength; index < circlesArray.length; index++) {
          filtrado.push(circlesArray[index]);
        }

        let datos = filtrado.map((user, i) => {
          return (
            <div key={i}>
              <img
                src={user.avatar}
              /*   onClick={() =>
                  user.avatar == "../img/circle.jpg" ? savePlan(2) : ""
                } */
              />
            </div>
          );
        });
        return datos.reverse();
      } else if (sessionact == 3) {
        let filtrado = users.filter((act) => {
          if (act.activities[0].session == sessionact) {
            return act;
          }
        });

        let length = 20 - filtrado.length;
        let filterLength = 20 - length;

        for (let index = filterLength; index < circlesArray.length; index++) {
          filtrado.push(circlesArray[index]);
        }

        let datos = filtrado.map((user, i) => {
          return (
            <div key={i}>
              <img
                src={user.avatar}
              /* onClick={() =>
                user.avatar == "../img/circle.jpg" ? savePlan(3) : ""
              } */
              />
            </div>
          );
        });
        return datos.reverse();
      }
    }

  };

  // document.querySelector




  return (
    <div className="Activity1">
      {/* Banner de la actividad */}

      {dataActivity ? (
        <img src={require(`${dataActivity.bannerSelec}`)} alt="" />
      ) : (
        ""
      )}
      <div className="prox-sessiones">
        {/* Se pinta botones de las sessiones que hay */}

        {dataActivity ? <p className="titles-sesiones nameAct">{dataActivity.name} </p> : ""}
        <p className="titles-sesiones">Próximas Sesiones</p>

        <div className="sessions-container">
          <button
            className="button-active"



          >
            {sessionact == 1 ? "Hoy: 10:00" : ""}
            {sessionact == 2 ? "Sábado: 10:00" : ""}
            {sessionact == 3 ? "Domingo: 10:00" : ""}
          </button>
        </div>
      </div>
      <p className="titles-sesiones">Monitor</p>
      <div className="ProfessorInfo">
        <img src={profesorAvatar} alt="" />
        <div className="entreParraf">

          <p>Pedro Álvarez</p>
          {dataActivity ? <div><p>Monitor de {dataActivity.name}</p></div> : ""}
        </div>
      </div>
      <div>
        {" "}
        <h2>Plazas Disponibles</h2>
      </div>
      <div className="participants">{paintUsers()}


      </div>
      <div className="container-subscription-button  ">  {sessionact != undefined ? <button onClick={() => setShowMessage(true)} className="button-cancelar">
        <p>
          Cancelar Subscripción
        </p>
      </button> : ""}</div>

      {showMessage ? <div className="message-info">
        <p className="uno">¿Estás seguro de que quieres cancelar?</p>
        <p className="dos"> Tu reserva se cancelará y tu plaza quedará disponible para otra persona</p>

        <div className="container-buttons-message">
          <button className="buttons-sessions">No</button>
          <button onClick={() => savePlan()} className="buttons-sessions si">Si</button>

        </div>




      </div> : ""}



      <Navbar />
    </div>
  );
};

export default ActivityReserved;
