import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UseAxiosAuth = (props) => {

  const [res, setRes] = useState("");
  const [auth, setAuth] = useState("");



  useEffect(() => {
    postBackend(props)

  }, []);


  const postBackend = async (props) => {

    //Recoge el token de las cookies
    let token = cookies.get("token")
    if (token) {

      const dataRes = await axios.get(`${props}`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      if (dataRes.data.auth == true) {

        setRes(dataRes);
        setAuth(true)
      } else {

        setAuth(false)
      }


    } else {

      let data = { auth: false }
      setRes(data);
      setAuth(false)

    }

    //Busca el endpoint de Routes con el props que se metio
    //

  };



  return [res, auth];


};

export default UseAxiosAuth;
