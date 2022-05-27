import React from "react";
import {Link} from "react-router-dom";
import {configure, shallow} from "enzyme";
import Adpater from "@wojtekmaj/enzyme-adapter-react-17" ;

import Nav from "../Components/Nav/Nav.jsx";

configure({adapter: new Adpater()})
//se configura la enzima para usa el adaptador

describe("<Nav />", () => {
    let nav;
    //se ejecuta antes de qie se ejecuta cada una de las pruebas
    beforeEach(() => {
        nav = shallow(<Nav/>);
    });

    it('Deberia renderizar tres <Link to="" />. El primero que vaya a "/", el segundo que vaya a "/home y el tercero que vaya a "/addvideogame"', () => {
        //podemos importar el componente Link de react-router-dom para utilizarlo
        expect(nav.find(Link).length).toBeGreaterThanOrEqual(3);
        expect(nav.find(Link).at(0).prop('to')).toEqual('/');
        expect(nav.find(Link).at(1).prop('to')).toEqual('/home');
        expect(nav.find(Link).at(2).prop('to')).toEqual('/addvideogame');
    })
    it('Deberia tener un primer Link con el texto "Empieza" que cambie la ruta hacia "/"', () =>{
        // El orden en el que se declaran los Links es importante!
        expect(nav.find(Link).at(0).prop("to")).toEqual("/")
        expect(nav.find(Link).at(0).text()).toEqual("Empieza")
    })
    it('Deberia tener un segundo Link con el texto "Home" que cambie la ruta hacia "/home"', () =>{
        // El orden en el que se declaran los Links es importante!
        expect(nav.find(Link).at(1).prop("to")).toEqual("/home")
        expect(nav.find(Link).at(1).text()).toEqual("Home")
    })
    it('Deberia tener un tercer Link con el texto "Añadir Videojuego" que cambie la ruta hacia "/addvideogame"', () =>{
        // El orden en el que se declaran los Links es importante!
        expect(nav.find(Link).at(2).prop("to")).toEqual("/addvideogame")
        expect(nav.find(Link).at(2).text()).toEqual("Añadir Videojuego")
    })
})



