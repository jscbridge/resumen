import React, { useEffect ,useState} from "react";
import axios from "axios";


const Recomendador = () => {


    const [values,setValues]=useState("")

  useEffect(() => {
    axios.get(`http://3.14.80.216/api/model/recommender/1`, {}).then((res) => {

 
let  arrayVacio= []

    for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        
        if(element !== 2 && element !==  15 && element !== 17 && element <33) {
            arrayVacio.push(element)
        } 
    }
 

    setValues(arrayVacio)
    })
  }, []);
  

  return (<div>
      




  </div>);
};

export default Recomendador;
