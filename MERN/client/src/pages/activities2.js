import React, { useState, useEffect } from "react";
import profesorAvatar from "../img/profesor.jpg";
import "./css/Activity1.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { circlesArray } from "../circles.js";
import useAxiosAuth from "../hooks/useAxiosAuth";

const Activities = () => {
  const navigate=useNavigate()
  const [users, setUsers] = useState();
  const [allUsers, setAllUsers] = useState();
  const [session, setSession] = useState();
  const [dataActivity, setDataActivity] = useState();
  const [circles, setCircles] = useState("");
  const [idUser, setIdUser] = useState("");
  const [subscription, setSubscription] = useState("");
  const [showButton, setShowbutton] = useState(false);

  useEffect(() => {
    getBannerAct();
    getUsers();
  }, []);

  const { idact } = useParams();

  const [datauser, auth] = useAxiosAuth("/datauser");

  //user.data.data[0].idUser

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
        (act) => act.activities[0].idActivity == `${idActivity}`
      );

      setUsers(userss);
    });
  };

  const savePlan = () => {
    let obj = {
      session,
      idActivity: idact,
      idUser: idUser,
      status: "none",
    };

 

    axios.post("/saveplan", obj);

    

    navigate(`/reserved/${idact}`)
  };

  //! Se pasan los filtros de los usuarios por la session que se han apuntado
  const paintUsers = () => {
    if (session == 1) {
      let filtrado = users.filter((act) => {
        if (act.activities[0].session == session) {
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
              onClick={() =>
                user.avatar == "../img/circle.jpg" ? savePlan(1) : ""
              }
            />
          </div>
        );
      });

      return datos;
    } else if (session == 2) {
      let filtrado = users.filter((act) => {
        if (act.activities[0].session == session) {
          return act;
        }
      });

      let length = 20 - filtrado.length;
      let filterLength = 20 - length;

      for (let index = filterLength; index < circlesArray.length; index++) {
        filtrado.push(circlesArray[index]);
      }

      return filtrado.map((user, i) => {
        return (
          <div key={i}>
            <img
              src={user.avatar}
              onClick={() =>
                user.avatar == "../img/circle.jpg" ? savePlan(2) : ""
              }
            />
          </div>
        );
      });
    } else if (session == 3) {
      let filtrado = users.filter((act) => {
        if (act.activities[0].session == session) {
          return act;
        }
      });

      let length = 20 - filtrado.length;
      let filterLength = 20 - length;

      for (let index = filterLength; index < circlesArray.length; index++) {
        filtrado.push(circlesArray[index]);
      }

      return filtrado.map((user, i) => {
        return (
          <div key={i}>
            <img
              src={user.avatar}
              onClick={() =>
                user.avatar == "../img/circle.jpg" ? savePlan(3) : ""
              }
            />
          </div>
        );
      });
    }
  };

  // document.querySelector

  const paintButton = () => {
    if (session != "") {
      if (
        session == 1 &&
        subscription.status == true &&
        subscription.session == 1
      ) {
        return (
      
            <button className=" register">
              Cancelar subscripción
            </button>
           
         
        );
      } else if (
        session == 2 &&
        subscription.status == true &&
        subscription.session == 2
      ) {
        return (
       
            <button className=" register">
              Cancelar subscripción
            </button>
            
       
        );
      } else if (
        session == 3 &&
        subscription.status == true &&
        subscription.session == 3
      ) {
        return (
       
            <button className=" register">
              Cancelar subscripción
            </button>
          
        );
      }
    } else {
    }
  };
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
        
        <div className="sessions-container">
          {dataActivity
            ? dataActivity.sessions.map((act, i) => (
                <button
                  className="buttons-sessions"
                  onClick={() => setSession(act.numberSession)}
                  key={i}
                >
               {act.numberSession==1? "Hoy: 10:00" : ""}
               {act.numberSession==2? "Sábado: 10:00" : ""}
               {act.numberSession==3? "Domingo: 10:00" : ""}
                </button>
              ))
            : ""}
        </div>
      </div>

      <div className="ProfessorInfo">
        <img src={profesorAvatar} alt="" />
        <p>Profesor: Manuel</p>
      </div>
      <div>
        {" "}
        <h2>Plazas Disponibles</h2>
      </div>
      <div className="participants">{paintUsers()}
      
    
      </div>
      <div className="container-subscription-button  ">{paintButton()}</div>
      

      <Navbar />
    </div>
  );
};

export default Activities;