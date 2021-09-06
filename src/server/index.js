// Setup empty JS object to act as endpoint for GeoName API data
let geonameData = {};
let imageData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const { allowedNodeEnvironmentFlags } = require('process');
const mockAPIResponse = require('./mockAPI.js')
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
const port = 8080;
const server = app.listen(port, listening);
function listening(){
    console.log("Server running");
    console.log(`Running on port: ${port}`);
}

// MockAPI to make sure the server is working well
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Adding the  GET route for the tempData from GeoNames API
app.get('/all',function(req,res){
    res.send(geonameData);
})
// Adding the GET route for the image from Pixabay API
app.get('/image', function(req,res){
    res.send(imageData);
})
// Adding the POST route
app.post('/add',function(req,res){
    dataEntry ={
        temp: req.body.temp
    }
    geonameData = dataEntry;
    res.send(geonameData);
})
app.post('/addImage', function(req,res){
    dataEntry = {
        image: req.body.image
    }
    imageData = dataEntry;
    res.send(imageData)
})

exports.listening = listening;


