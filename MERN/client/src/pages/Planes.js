import React, { useState, useEffect } from 'react'
import "./css/Planes.scss"
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useAxiosAuth from '../hooks/useAxiosAuth';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Planes.scss"


const Planes = () => {

    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState("");
    const [allActivities, setAllActivities] = useState("");


    const [user] = useAxiosAuth("datauser");

    useEffect(() => {
        if (user != "") {
            if (user.data.auth) {
                getActivities();
            } else {
                navigate("/");
            }
        }

    }, [user]);
    useEffect(() => {

    }, [])



    const getActivities = () => {
        let filter = {
            idUser: user.data.data[0].idUser
        }
        axios.post("/getactivitiesuser", filter).then((res) => {
            let cleanActivity = res.data;
            let datos = cleanActivity.filter((dat) => dat.status == "process")
            console.log(datos)

            console.log(cleanActivity)
            setAllActivities(datos);

        })

    }




    return (
        <div className='Planes'>
            <h1>Mis Reservas</h1>
            {allActivities ? allActivities.map((act, i) => {

                let relative = require(`${act.bannerSelec}`)


                return (


                    <div key={i} className="card-container">
                        <div className='card-hour'> HOY 10:00 </div>
                        <div className='card-img ' onClick={() => navigate(`/activityreserved/${act.idAct}/${act.session}`)}>
                            <img src={relative} alt="" />

                            <label >{act.nameAct}</label>
                        </div>

                    </div>)
            }

            ) : ""}

            <Navbar />

        </div>
    )
}

export default Planes