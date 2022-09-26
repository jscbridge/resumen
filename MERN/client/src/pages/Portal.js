import React, { useState, useEffect } from "react";
import CategoryBanner from "../components/CategoryBanner";
import Search from "../components/Search";
import { useNavigate, Link } from "react-router-dom";
import "./css/Portal.scss";
import Buttonb from "../components/icons/Buttonb.png";
import axios from "axios";
import Navbar from "../components/Navbar";
import useAxiosAuth from "../hooks/useAxiosAuth";
import BarraPortal from "../components/BarraPortal";
import { arrayRecomenders } from "../arrayRecomender";

const Portal = () => {
  const navigate = useNavigate();
  const [allActivities, setAllActivities] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [viewCategories, setViewCategories] = useState(true);
  const [viewButton, setViewButton] = useState(false);
  const [recomendValues, setRecomendValues] = useState("");
  const [arrayRecomended, setArrayRecommended] = useState("");

  const [user, auth] = useAxiosAuth("datauser");

  useEffect(() => {
    if (auth === true) {
      navigate("/portal");
    } else if (auth === false) {
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    bannerActivities();
    /*   recomendedActs(); */
  }, []);

  const bannerActivities = () => {
    axios.get("getactivities").then((res) => {
      let cleanActivity = res.data;
      setAllActivities(cleanActivity);
    });
  };

  useEffect(() => {
    if (allActivities != "") {
      let arrayClean = [];
      for (let i = 0; i < arrayRecomenders.length; i++) {
        let element = arrayRecomenders[i];

        for (let index = 0; index < allActivities.length; index++) {
          const elementosIdactivity = allActivities[index];

          if (elementosIdactivity.idActivity === element) {
            arrayClean.push(elementosIdactivity);
          }
        }
      }

      setArrayRecommended(arrayClean);
    }
  }, [allActivities]);

  /*   const recomendedActs =  () => { */
  //Debido a problemas con el fetch por la latencia cancelamos la petición
  /*  setRecomendValues(arrayRecomenders) */
  /*    await axios.get(`http://3.14.80.216/api/model/recommender/643` ).then((res) => {
       let  arrayVacio= []
      
         for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index];
              
      
              if(element !== 2 && element !==  15 && element !== 17 && element <33) {
                  arrayVacio.push(element)
              } 
          }  
           console.log(arrayVacio)
           }) */
  /*  }; */

  return (
    <div className="Portal">
      {viewButton ? (
        <div className="button-position">
          <img
            className="buttonBackPortal button-position"
            src={Buttonb}
            onClick={() => {
              setViewCategories(true);
              setViewButton(false);
            }}
          ></img>
        </div>
      ) : (
        ""
      )}
      {viewCategories ? (
        <div className="navbar-top-fixed">
          <div className="perfilname">
            {user && auth ? (
              user.data.data[0].idUser == 1 ? (
                <img src={require("../img/Mari.png")}></img>
              ) : (
                <img src={user.data.data[0].avatar}></img>
              )
            ) : (
              ""
            )}
            {user && auth ? (
              <span>
                {" "}
                Hola, <span className="namebold">{user.data.data[0].name}</span>
              </span>
            ) : (
              ""
            )}
          </div>
          <Search />
          <CategoryBanner
            setFilter={setFilterCategory}
            setHidden={setViewCategories}
            setButton={setViewButton}
          />
        </div>
      ) : (
        ""
      )}
      {/* {arrayRecommended && <Barra>
        
        </Barra>} */}
      {/* Existe allActivities ? ->  */}
      <div className="cont-actividades">
        <p className="title-recomended">Actividades que deberías probar</p>
        {arrayRecomended
          ? // Para pintar todas no tiene que haber filtro de categorías
            !filterCategory
            ? arrayRecomended.map(
                (act, i) => (
                  <Link key={i} to={`/act1/${act.idActivity}`}>
                    {" "}
                    <img
                      className="Activity"
                      src={require(`${arrayRecomended[i].banner}`)}
                    ></img>
                  </Link>
                )
                // Si hay giltro solo pinta las actividades filtradas
              )
            : arrayRecomended
                .filter((alt) => alt.id_Category === filterCategory)
                .map((act, j) => (
                  <Link key={j} to={`/act1/${act.idActivity}`}>
                    {" "}
                    <img
                      className="Activity"
                      src={require(`${act.banner}`)}
                    ></img>
                  </Link>
                ))
          : ""}
      </div>
      
      <BarraPortal />
    </div>
  );
};

export default Portal;
