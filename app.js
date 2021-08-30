const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
var path = require('path');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("public"));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    
    const quere = req.body.cityName;
    const appid = "d1748c352c39c3d703aa434bc3ac1060";
    const units = "metric";


    const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + quere + "&units=" + units + "&appid=" + appid + "";

    https.get(url, function (response) {

        response.on("data", function (data) {

            const WeatherData = JSON.parse(data)
            const tempture = WeatherData.main.temp;
            const main = WeatherData.weather[0].main
            const description = WeatherData.weather[0].description
            const icon = WeatherData.weather[0].icon
            const ImageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>City name " + quere + " </h1>")
            res.write("<h3>Tempture is " + tempture + " dgrees</h3>")
            res.write("<h4>" + main + "</h4>")
            res.write("<p>" + description + "</p>")
            res.write("<img src=" + ImageUrl + ">");

            

            res.sendFile(__dirname+"/weatherResults.html");
        });
    });

});





app.listen(3000 , function () {

    console.log("Server Has Started");
});