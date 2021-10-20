import React from 'react'

export default function Planet(props) {

    const currentPlanet = props.currentPlanet;
    const flagColor = props.flagColor;
    

    return (
        <div className="box">
            <div className="planet">
                <div className="planet-copy">
                </div>
                <div className="white-circle">
                </div>
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <div className="circle-3"></div>
                <div className="circle-4"></div>
                <div className="circle-5"></div>
                <div className="circle-6"></div>
                <div className="circle-7"></div>
            </div>
            <div className="flag" style={{background:flagColor}}>
                <div style={{textAlign:"center", marginTop:"15%", fontSize:"250%"}}>{currentPlanet}</div> 
                <div className="pole"></div>
            </div>
            <div className="tube-1"></div>
            <div className="tube-2"></div>
            <div className="tube-3"></div>
            <div className="tube-4"></div>
            <div className="tube-5"></div>
            <div className="tube-6"></div>
        </div>
    )
}
