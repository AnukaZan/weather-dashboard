$("#today-date").text(moment().format("MM/DD/YYYY"));

$("#date-1").text(moment().add(1, "days").format("MM/DD/YYYY"));
$("#date-2").text(moment().add(2, "days").format("MM/DD/YYYY"));
$("#date-3").text(moment().add(3, "days").format("MM/DD/YYYY"));
$("#date-4").text(moment().add(4, "days").format("MM/DD/YYYY"));
$("#date-5").text(moment().add(5, "days").format("MM/DD/YYYY"));

var APIkey = "4a6116bdf398adee24c08448bde73ba7";
var searchBtn = document.getElementById("search-button");
var inputEl = document.getElementById("city");
var cityNameEl = document.getElementById("city-name");
var todayTemp = document.getElementById("temp");
var todayWind = document.getElementById("wind");
var todayHum = document.getElementById("humidity");
var todayUV = document.getElementById("uv-index");
var todayIcon = document.getElementById("icon");

//day 1
var icon1 = document.getElementById("icon1");
var temp1 = document.getElementById("temp1");
var wind1 = document.getElementById("wind1");
var hum1 = document.getElementById("humid1");

//day 2
var icon2 = document.getElementById("icon2");
var temp2 = document.getElementById("temp2");
var wind2 = document.getElementById("wind2");
var hum2 = document.getElementById("humid2");

//day 3
var icon3 = document.getElementById("icon3");
var temp3 = document.getElementById("temp3");
var wind3 = document.getElementById("wind3");
var hum3 = document.getElementById("humid3");

//day 4
var icon4 = document.getElementById("icon4");
var temp4 = document.getElementById("temp4");
var wind4 = document.getElementById("wind4");
var hum4 = document.getElementById("humid4");

//day 5
var icon5 = document.getElementById("icon5");
var temp5 = document.getElementById("temp5");
var wind5 = document.getElementById("wind5");
var hum5 = document.getElementById("humid5");


var searchFX = function(){
    var city = inputEl.value.trim();
        citySearch(city);
        console.log("clicked");


}

var citySearch = function(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
    fetch(apiUrl).then(function(response){
        return response.json();
    })
    .then(function(data){
        console.dir(data);
        cityNameEl.textContent = data.name;
        todayIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        todayTemp.textContent= "Temp: " + data.main.temp;
        todayWind.textContent = "Wind: " + data.wind.speed + "MPH";
        todayHum.textContent = "Humidity: " + data.main.humidity + "%";
        todayUV.textContent = "UV Index:"

        var cityID = data.id;
        fiveDays(cityID);
    })
}

var fiveDays = function(cityID){
    var apiUrlTwo = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIkey;
    fetch(apiUrlTwo)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.dir(data);
    })
}


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    searchFX();
});