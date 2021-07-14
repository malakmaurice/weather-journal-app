// Setup empty JS object to act as endpoint for all routes
projectData = {};

// setup express to use 
const express =require('express');
// instance of app from express
const app = express();
const cors = require('cors');
app.use(cors());
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
const { log } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
app.get('/',function(request,response){response.sendFile(__dirname+"website/index.html")});
app.listen(8000,function(){console.log("Hallloooooo");});
// Setup Server