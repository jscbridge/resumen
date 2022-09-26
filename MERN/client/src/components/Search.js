import axios from "axios"
import React, { useState, useEffect } from "react";
import Search from "./icons/Search.png";
import Micro from "./icons/Microphone.png";
import "./css/Search.scss";
function Filter() {

    const [searchData, setSearchData] = useState("");
    const [resultsData, setResultsData] = useState("");

    useEffect(() => {
        if (searchData != "") {
            sendBackend()
        }

    }, [searchData])

    const sendBackend = async () => {
        let filter = {
            population: searchData
        }

        await axios.post("search", filter).then((res) => setResultsData(res.data))
    }
    return (
        <div className="App">
        <div className="div-search">
            <img className="icons isearch" src={Search}></img>
            <input placeholder="Buscar Actividad" onChange={(e) => setSearchData(e.target.value)} />
            <img className="icons imicro" src={Micro}></img>
        </div>

            {/* {resultsData != "" ? resultsData.map((result) => {
                return (<div> 
                    <p>{result.name}</p>
                    <img src={result.photo}></img>
                    </div>)
            }) : ""} */}

        </div>
    );
}
export default Filter;
