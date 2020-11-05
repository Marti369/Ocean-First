//added date and time
document.querySelector("#date").append(moment().format("LL"));
document.querySelector("#time").append(moment().format("LT"));

var Coastal = function (countyName) {
  var coastalAPI = "https://api.coastal.ca.gov/ccd/v1/locations";

  //api weather  for current weather of the specific countyName
  var WeatherAPi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    countyName +
    "&appid=829ab038feb797ebd959e94c190da467&units=imperial";

  //api weather for five day weather of specific countyName
  var fiveAPI =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    countyName +
    "&appid=829ab038feb797ebd959e94c190da467&units=imperial";

  //making the first request to URL
  //this provides the list of beaches specific to the city
  fetch(coastalAPI)
    .then(function (response) {
      //request was succesful
      if (response.ok)
        response.json().then(function (data) {
          for (i = 0; i < data.length; i++) {
            if (!data[i].county_region) continue;
            if (
              countyName.toUpperCase() === data[i].county_region.toUpperCase().trim()
            ) {
              var site = data[i].site_name;
              var ul = document.querySelector("#cityname");
              var li = document.createElement("li");
              li.className = "panel-blocks";

              // attaching the value of "i" as an id to the "li" at each met condition (this "i" is matching the id of coastal API)
              li.id = i;

              li.innerHTML = site;
              ul.appendChild(li);
            }
          }
          document
            .getElementById("cityname")
            .addEventListener("click", function (event) {
              if (event.target && event.target.nodeName == "LI") {
                // ideally would use .innerHTML but special case, where the .ID retrieves the information needed.
                var beachNameId = event.target.id;

                var site = data[beachNameId].site_name;
                var address = data[beachNameId].address;
                var website = data[beachNameId].website;
                var register = data[beachNameId].how_to_register;
                var start = data[beachNameId].start_time;
                var end = data[beachNameId].end_time;
                var bring = data[beachNameId].What_to_bring;
                var organization = data[beachNameId].organization;

                document.querySelector("#site").textContent =
                  "Site Name:" + site;
                document.querySelector("#address").textContent =
                  "Address: " + address;
                document.querySelector("#website").textContent = website;
                document.querySelector("#website").href = website;

                document.querySelector("#register").textContent =
                  "Register: " + register;
                document.querySelector("#start").textContent =
                  "Start: " + start;
                document.querySelector("#end").textContent = "End: " + end;
                document.querySelector("#bring").textContent =
                  "Bring: " + bring;
                document.querySelector("#organization").textContent =
                  "Organizaiton: " + organization;
              }
            });
        });
    })
    .catch(function (error) {
      alert("unable to connect");
    });



  fetch(WeatherAPi)
    .then(function (response) {
      //request was sucessful
      if (response.ok)
        response.json().then(function (data) {
          var icon = data.weather[0].icon;
          var iconAPI = "https://openweathermap.org/img/w/" + icon + ".png";
          var wind = data.wind.speed;
          var humidity = data.main.humidity;
          var temp = data.main.temp;
          document.querySelector("img").src = "";
          document.querySelector("#city").innerHTML = "";
          document.querySelector("#wind").innerHTML = "";
          document.querySelector("#humidity").innerHTML = "";
          document.querySelector("#temp").innerHTML = "";
          document.querySelector("#date").innerHTML = "";
          document.querySelector("#time").innerHTML = "";

          document.querySelector("img").src = iconAPI;
          document.querySelector("#city").append(countyName);
          document.querySelector("#wind").innerHTML = "Wind: " + wind;
          document.querySelector("#humidity").innerHTML =
            "Humidity: " + humidity;
          document.querySelector("#temp").innerHTML = "Temperature " + temp;
          document.querySelector("#date").append(moment().format("LL"));
          document.querySelector("#time").append(moment().format("LT"));
        });

    });


    //five day forecast
  fetch(fiveAPI)
    .then(function (response) {
      //request was successful 
      if (response.ok)
        response.json().then(function (data) {
         console.log(data)
          for (i = 0 ; i <data.list.length; i = i + 8) {
            console.log(data.list[i])
          
          var icon = data.list[i].weather[0].icon;
          var iconAPI = "https://openweathermap.org/img/w/" + icon + ".png";
          var temp = data.list[i].main.temp;
          var humidity = data.list[i].main.humidity;
          var wind = data.list[i].wind.speed

          document.querySelector("#icon-" + i ).src = "";
          document.querySelector("#wind-" + i).innerHTML = "";
          document.querySelector("#humidity-" + i).innerHTML = "";
          document.querySelector("#temp-" + i ).innerHTML = "";

          document.querySelector("#icon-" + i).src = iconAPI;
          document.querySelector("#wind-" + i).innerHTML = " Wind: " + wind;
          document.querySelector("#humidity-" + i).innerHTML = "humidity: " + humidity;
          document.querySelector("#temp-" + i).innerHTML = "Temperature: " + Math.round(temp);
          }
        })
    })
}

//local storage secton- once clicked city names will be saved/ and 
//weather as well as five day forecast will appear( this is not saved in storage)
var submit = document.querySelector("#submit");
var cityList = [];

submit.addEventListener("click", function (event) {
  event.preventDefault();
  var location = document.querySelector("#Primary-input").value.trim();
  document.querySelector("#cityname").innerHTML = "";
  
  //fixing the problem of upper and lowercase words, this turns all entry into lowercase and saves it to localstorage
  locationLowerCase = location.toLowerCase()
  console.log(locationLowerCase)
  
  //trying to fix the duplicate problem 
  //first create a var to store localstorage values
  var totalStorage = JSON.parse(localStorage.getItem("cityname"));
  
  // if location is not included in the localstorage, then add the city to localstorage
  if(!totalStorage.includes(locationLowerCase)){
    cityList.push(locationLowerCase);
    localStorage.setItem("cityname", JSON.stringify(cityList));
  }


  Coastal(location);
});

//from local storage , the city names will be displayed
function loadStorage() {
  cityStorage = JSON.parse(localStorage.getItem("cityname"));
  if (!cityStorage) {
    localStorage.setItem("cityname", JSON.stringify(cityList));
  } else {
    for (i = 0; i < cityStorage.length; i++) {
      cityList.push(cityStorage[i]);

      var pastCityEl = document.getElementById("pastCity");
      var pastCitylist = document.createElement("li");
      pastCitylist.innerHTML = cityStorage[i];

      pastCityEl.appendChild(pastCitylist);
    }
  }
}
loadStorage();

//event listener for History
document.getElementById("pastCity").addEventListener("click", function (event) {
  if (event.target && event.target.nodeName == "LI") {
    document.querySelector("#cityname").innerHTML = "";

    var cityHistoryName = event.target.innerHTML;
    Coastal(cityHistoryName);
  }
})


