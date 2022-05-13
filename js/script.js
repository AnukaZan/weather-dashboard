

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

//when city name is searched in input field
var citySearch = function(cityName){
    var todayDate = moment().format("MM/DD/YYYY");
    $("#today-date").text("("+ todayDate + ")");

    var fiveDate = document.getElementById("5Title");
    fiveDate.textContent = "5-Day Forecast:";

    //inputEl.value = "";

    //fetch api using city name
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey
    fetch(apiUrl).then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.dir(data);
        cityNameEl.textContent = data.name;
        todayIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        todayTemp.textContent= "Temp: " + data.main.temp + "°F";
        todayWind.textContent = "Wind: " + data.wind.speed + "mph";
        todayHum.textContent = "Humidity: " + data.main.humidity + "%";
       
        //then using the city lat and lon, fetch uv index and future date weather
        var apiUrl3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat+ "&lon=" + data.coord.lon + "&units=imperial&appid=" + APIkey
        fetch(apiUrl3).then(function(response){
            return response.json();
        }).then(function(data){
            //console.dir(data);
            var UVI = data.current.uvi;
            var uvTitle = document.getElementById("uvTitle");
            uvTitle.textContent = "UV Index:  ";

            todayUV.textContent = UVI;
            
            //set classes based on how high UV index is
            if (UVI < 2){
                todayUV.setAttribute("class", "success");
                //console.log("alert");
            } else if (UVI < 5){      
                todayUV.setAttribute("class", "warning");
            } else{
                todayUV.setAttribute("class", "danger");
            }

            //make a card for 5 days from array with date, temp, wind, and humiditiy
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

var searchArray = JSON.parse(localStorage.getItem("search")) || []; //either retrieve history or create empty array

//show last search history automatically
if (searchArray.length > 0){
    citySearch(searchArray[searchArray.length-1]);
}


var loadSearch = function(){
    var historyEl = document.getElementById("historyList");

    historyEl.innerHTML="";

    for (var i = 0; i< searchArray.length; i++){
        var searchHistory = document.createElement("button");
        searchHistory.setAttribute("class", "button");
        searchHistory.setAttribute("type", "submit");
        searchHistory.textContent = searchArray[i];
      

        searchHistory.addEventListener("click", function(){
            fiveDaysEl.innerHTML="";
            inputEl.value = "";
            inputEl.value = $(this).text();
            console.log(inputEl.value);
            citySearch(inputEl.value);
        })

          historyEl.prepend(searchHistory);
    }

}

//take input value and save in history and clear previous value
var searchFX = function(){
    var city = inputEl.value.trim();
    citySearch(city);
    fiveDaysEl.innerHTML="";

    if (city != ""){
        searchArray.push(city); //push current city input value into array
        localStorage.setItem("search", JSON.stringify(searchArray)); //make array into json string and then set into local storage
    }
    

    loadSearch();

}

loadSearch();

//when search button is clicked, have searchFX proceed
searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    searchFX();
});

