projectData = {};

// setup express to use 
const express = require('express');
// instance of app from express
const app = express();
const cors = require('cors');
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
const { log } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));
var data = [];

// get data from clinte and save it in server
app.post('/sendData', function (request, response) {
  projectData = { tempreture: request.body.tempreture, feelings: request.body.feelings, newDate: request.body.newDate };
  data.push(projectData);
});
// get request and send data to client 
app.get('/data', function (req, res) {
  res.send(data);
})

app.get('/', function (request, response) { response.sendFile(__dirname + "website/index.html") });
// listen at 8000 localhost
app.listen(8000, function () { console.log("Hallloooooo"); });