import express, {Request, Response} from "express";
var SpaceDoorsList : Array<SpaceDoor> = require('./space-time-continuum.json')
const Graph = require('node-dijkstra')
var cors = require('cors')
import dotenv from "dotenv";
dotenv.config();
 

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;

interface Link {
    to : String;
    cost: Number;
}

interface SpaceDoor {
    name : String;
    links: Array<Link>;
}


// Get the entire universe mapping
app.get("/", (req, res) => {
    return res.send(SpaceDoorsList);
})


// for a given start Space Door and a given amount of Camemberts, list all the accessible Space Doors
app.post("/", (req : Request<{},{},{cost: Number, doorName: String},{}>, res : Response) => {

    var spaceDoorName : String = req.body.doorName;
    var spaceDoorCost : Number = req.body.cost;

    var spaceDoor : SpaceDoor | undefined = SpaceDoorsList.find( (door: SpaceDoor) => door.name == spaceDoorName);
    
    if(spaceDoor == undefined)
        return res.send("The Space Door Name is Not Found");

    var distinationSpaceDoors : Array<Link> | undefined = spaceDoor.links.filter( (link: Link) => link.cost <= spaceDoorCost);

    if(distinationSpaceDoors == undefined || distinationSpaceDoors.length == 0)
        return res.send("There is no Distination with this Cost");

    return res.send(distinationSpaceDoors);
    
})


// for a given start Space Door and a given end Space Door, get the path between those 2 locations that is the cheapest in Camemberts
app.post("/path", (req : Request<{},{},{first: String, second: String},{}>, res) => {
    
    var first : String = req.body.first;
    var second : String = req.body.second;

    const route = new Graph();

    SpaceDoorsList.map( (door: SpaceDoor) => {
        var connections = {};
        door.links.map((link: Link)=>{
            connections = {
                ...connections,
                [link.to.toString()]: link.cost,
              }
            });
        route.addNode(door.name, connections);
    }) 

    const path = route.path(first, second, { cost: true });

    return res.send(path);
})


app.listen(PORT, ()=> {
    console.log("Server is Up on Port: ", PORT);
})