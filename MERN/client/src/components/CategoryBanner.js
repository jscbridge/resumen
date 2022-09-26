import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryBanner = ({ setFilter, setHidden, setButton }) => {

  // Guarda las categorias
  const [categories, setCategory] = useState("")

  useEffect(() => {
    bannerCategory();
  }, []);


  const bannerCategory = () => {
    
    axios.get("getcategory").then((res) => {
      let cleanCategories = res.data;
      setCategory(cleanCategories);
    })
  }


  return (
    <div>
      <p className='title-cat'>Categorías</p>
      <div className='categoryBanner'>


        {categories ? <img className="img-cat1" src={require(`../pages/img/Categorias/Fisico.png`)} onClick={() => { setFilter(categories[0].idCategories); setHidden(false); setButton(true) }}></img> : ""}
        {categories ? <img className="img-cat2" src={require(`../pages/img/Categorias/Talleres.png`)} onClick={() => { setFilter(categories[1].idCategories); setHidden(false); setButton(true) }}></img> : ""}
        {categories ? <img className="img-cat3" src={require(`../pages/img/Categorias/Gastro.png`)} onClick={() => { setFilter(categories[2].idCategories); setHidden(false); setButton(true) }}></img> : ""}
        {categories ? <img className="img-cat4" src={require(`../pages/img/Categorias/Ocio.png`)} onClick={() => { setFilter(categories[3].idCategories); setHidden(false); setButton(true) }}></img> : ""}
      </div>

    </div >
  )
}

export default CategoryBanner;