/* Global Variables */
// Create an instance of a new date 
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
// api url and key from openweathermap
const APIKEY = "e970177e9f1c23ca62f214ddb1efba59";
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
// sendDate function to localServer 
const sendData = async (path = "", data = {}) => {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    // display the error if there is 
    console.log("error", error);
  }
};
// addEventListener with click event 
document.getElementById("generate").addEventListener("click", generatefun);
function generatefun(e) {
  // get elements by id 
  cityZip = document.getElementById("zip").value;
  feelings = document.getElementById("feelings").value;
  // first get data from API then store it in server then display it 
  getData(url, cityZip, APIKEY)
    .then(function (data) {
      sendData("/sendData", {
        tempreture: data.main.temp,
        feelings: feelings,
        newDate: newDate
      });
      displayUI()
    })
}
const getData = async (APIurl, cityZip, APIkey) => {
  const response = await fetch(APIurl + cityZip + "&appid=" + APIkey);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
const displayUI = async () => {
  const request = await fetch("/data");
  try {
    const data = await request.json();
    // getElements by id and add the content in innerhtml 
    document.getElementById('content').innerHTML = "you feel like:" + data[data.length - 1].feelings;
    document.getElementById("temp").innerHTML = " the temp is: " + data[data.length - 1].tempreture;
    document.getElementById("date").innerHTML = "the date is: " + data[data.length - 1].newDate;
  } catch (error) {
    console.log("error", error);
  }
};