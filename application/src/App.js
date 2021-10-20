import React, {useState} from 'react';
import './App.css';
import { Grid } from '@mui/material';
import Planet from './Components/Planet';
import SideBar from './Components/SideBar';


function App() {

  const [currentPlanet, setCurrentPlanet] = useState("")
  const [flagColor, setFlagColor] = useState("#DD4B37")
 
  const flagColorList = ["#DD4B37", "#E26A2C", "#FF8243", "#FDA65D", "#FFD07F", "#C36A2D", "#3E065F", "#700B97", "#8E05C2", "#7F7C82", "#BFA2DB", "#F0D9FF", "#F3F1F5"];

  const currentPlanetHandler = (planet) => {
    setCurrentPlanet(planet)
    setFlagColor(flagColorList[Math.floor(Math.random()*flagColorList.length)])
    
  }

  return (
    <Grid container columns={12}>
      <Grid item xs={3}>
        <SideBar currentPlanetHandler={currentPlanetHandler} currentPlanet={currentPlanet}/>
      </Grid>
      <Grid style={{marginTop:'60px'}} item xs={9}>
        <Planet flagColor={flagColor}  currentPlanet={currentPlanet}/>
      </Grid>
    </Grid>
  );
}

export default App;
