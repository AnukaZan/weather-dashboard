var todayDate = moment().format("MM/DD/YYYY");
$("#today-date").text("("+ todayDate + ")");

var APIkey = "4a6116bdf398adee24c08448bde73ba7";
var searchBtn = document.getElementById("search-button");
var inputEl = document.getElementById("city");
var cityNameEl = document.getElementById("city-name");
var fiveDaysEl = document.getElementById("five-days");

var todayTemp = document.getElementById("temp");
var todayWind = document.getElementById("wind");
var todayHum = document.getElementById("humidity");
var todayUV = document.getElementById("uv-index");
var todayIcon = document.getElementById("icon");


var searchFX = function(){
    var city = inputEl.value.trim();
    citySearch(city);
    fiveDaysEl.innerHTML="";

}

var citySearch = function(city){
    inputEl.value = "";

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
    fetch(apiUrl).then(function(response){
        return response.json();
    })
    .then(function(data){
        console.dir(data);
        cityNameEl.textContent = data.name;
        todayIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        todayTemp.textContent= "Temp: " + data.main.temp + "°F";
        todayWind.textContent = "Wind: " + data.wind.speed + "mph";
        todayHum.textContent = "Humidity: " + data.main.humidity + "%";
       

        var apiUrl3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat+ "&lon=" + data.coord.lon + "&units=imperial&appid=" + APIkey
        fetch(apiUrl3).then(function(response){
            return response.json();
        }).then(function(data){
            console.dir(data);
            var UVI = data.current.uvi;
            var uvTitle = document.getElementById("uvTitle");
            uvTitle.textContent = "UV Index:  ";

            todayUV.textContent = UVI;

            if (UVI < 2){
                todayUV.setAttribute("class", "success");
                console.log("alert");
            } else if (UVI < 5){      
                todayUV.setAttribute("class", "warning");
            } else{
                todayUV.setAttribute("class", "danger");
            }

            for (var i=1; i<6; i++){
                var dateTitle = document.createElement("h3");
                var actualDate = data.daily[i].dt;
                dateTitle.textContent= moment.unix(actualDate).format("MM/DD/YYYY");
                dateTitle.setAttribute("class", "has-text-white");
                var divEl = document.createElement("div");
                divEl.setAttribute("class", "column card-content");

                var iconsEl = document.createElement("img");
                iconsEl.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");

                var tempTitle = document.createElement("p");
                tempTitle.textContent = "Temp: " + data.daily[i].temp.day + "°F";

                var windEl = document.createElement("p");
                windEl.textContent = "Wind: " + data.daily[i].wind_speed + "mph";

                var humidEl = document.createElement("p");
                humidEl.textContent = "Humidity: " + data.daily[i].humidity + "%";

                divEl.appendChild(dateTitle);
                divEl.appendChild(iconsEl);
                divEl.appendChild(tempTitle);
                divEl.appendChild(windEl);
                divEl.appendChild(humidEl);

                fiveDaysEl.append(divEl);
            }
        })
       
    })
}




searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    searchFX();
});