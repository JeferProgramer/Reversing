import React from "react";
import cargando from "./loading.gif"
import "./loading.css";
export default function Cargando(){
    return(
        <div className="loading">
            <img src={cargando} alt="" />
        </div>
    )
}