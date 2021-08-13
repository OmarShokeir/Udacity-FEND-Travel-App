// Setup empty JS object to act as endpoint for GeoName API data
geonameData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const { allowedNodeEnvironmentFlags } = require('process');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log("Server running");
    console.log(`Running on port: ${port}`);
}

// Adding the  GET route for the tempData from GeoNames API
app.get('/all',function(req,res){
    res.send(geonameData);
})
// Adding the POST route
app.post('/add',function(req,res){
    dataEntry ={
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        country: req.body.country
    }
    geonameData = dataEntry;
    res.send(geonameData);
})


