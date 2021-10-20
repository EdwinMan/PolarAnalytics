import React, {useState, useEffect} from 'react'
import { Grid } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';

export default function SideBar(props) {

  const currentPlanetHandler = props.currentPlanetHandler;
  const currentPlanet = props.currentPlanet;
  
    const [coins, setCoins] = useState(20);
    const [planets, setPlanets] = useState([]);
    const [planetDistination, setPlanetDistination] = useState("");
    const [path, setPath] = useState("");


    useEffect(()=>{

      axios.get('http://localhost:5000/')
      .then(function ({data}) {
        setPlanets(data);
        currentPlanetHandler(data[0].name);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      
    }, [])


    const selectPlanetHandler = (planet) => {
      if( planet === currentPlanet)
        alert("You are already on This Planet")
      else{

        axios.post('http://localhost:5000/path', {
          first:currentPlanet,
          second:planet
      })
        .then(function ({data}) {
          console.log(data);
          setPath(data)
          setPlanetDistination(planet)
          
        })
      }
    }

    const travelHandler = (cost) => {
      currentPlanetHandler(planetDistination)
      setPath("")
      setCoins(coins - cost)
    }

    const container = {
      background:'#FFD07F',
      border:"3px solid #FDA65D",
      height:'90%',
      borderRadius:'20px',
      margin:'40px 0 0 20px',
      paddingTop:'40px',
      opacity:"93%"
      }


    return (
<div style={container}>
    <Grid style={{textAlign: "center", justifyContent:'center'}} container columns={12}>

        <Grid style={{marginBottom:'50px', fontSize:"30px"}} item xs={12}>
            {coins} Camemberts
        </Grid>


        {planets.map((element, index) => 
        <>
            <Grid key={index} onClick={()=> selectPlanetHandler(element.name)} className="hover" item xs={12}>
            {element.name}{element.name === currentPlanet ? <PublicIcon color="success" fontSize="large"/> : <PublicIcon color="info" fontSize="large"/>}
            </Grid>
            <br />
            <br />
            <br />
        </>
        )} 

        <br />
        <br />          
        <br />
        <br />
        {path === "" ? 
        <Grid style={{marginBottom:'50px', fontSize:"25px"}} item xs={12}>
          There is No Planet Selected
        </Grid>
        :
        path.path === null ? 
        <Grid style={{marginBottom:'50px', fontSize:"25px", color:"#852747"}} item xs={12}>
          This Planet is not Reachable from Here
        </Grid>
        :
        null
        }


        {path.path instanceof Array ?             
        <Grid style={{marginBottom:'50px', fontSize:"25px"}} item xs={12}>
            {path.path.map(elemnt => 
            <div>
              <div>{elemnt}<PublicIcon color="info" fontSize="small"/></div>
              {path.path.at(-1) != elemnt ? <span>&#8595;</span> : null}
            </div>
             )}
            <br/>
             Total Camemberts Needed: {path.cost}
            <br/>

            {coins < path.cost ? 
            <button disabled>Not Enough Camemberts</button>
            :
            <button onClick={()=> travelHandler(path.cost)}>GO :)</button>
            }
              
        </Grid>
        : 
        null}

    </Grid>
      </div>

    )
}
