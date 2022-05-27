import './App.css';
import LadingPage from "./Components/LandingPage/landingPage";
import {Route} from "react-router-dom";
import React from "react";
import Videogames from "./Components/Videogames/Videogames.jsx";
import Search from "./Components/Search/Search.jsx";
import VideogameDetail from "./Components/VideogameDetail/VideogameDetail.jsx";
import Navbar from "./Components/Nav/Nav.jsx";
import AddVideogame from "./Components/AddVideogame/addVideogame.jsx";
import Filters from "./Components/Filters/Filters.jsx";


function App() {
  return (
    <div className="App">
      {/* vamos a renderizar cada uno de los componentes con su ruta correspondiente */}
      <Route path="/" component={Navbar}/>
      <Route exact path={"/"} component={LadingPage}/>
      <Route exact path="/home" component={Search} />
      <Route exact path="/home" component={Filters}/>
      <Route exact path={"/home"} component={Videogames}/>
      <Route exact path="/home/:id" component={VideogameDetail}/>
      <Route exact path="/addvideogame" component={AddVideogame}/>
    </div>
  );
}

export default App;
