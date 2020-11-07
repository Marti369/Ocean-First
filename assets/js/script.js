
//Date: retriving date information from moment() and formating it to disaplay as month, day and year and appending to HTML id date.
document.querySelector("#date").append(moment().format("LL"));

//Time: retriving time information from moment() and formating it to display as hour: mm appending to HTML id time.
document.querySelector("#time").append(moment().format("LT"));


//Declaring a function with one parameter "countyName"
var Coastal = function (countyName) {

  //API coastal- storing coastal API URL into a variable
  var coastalAPI = "https://api.coastal.ca.gov/ccd/v1/locations";

  //API weather  for current weather of the specific countyName: storing weather API URL into a variable 
  var WeatherAPi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    countyName +
    "&appid=829ab038feb797ebd959e94c190da467&units=imperial";

  //API weather for five day weather of specific countyName. sotring five day weather API URL into a variable
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

          // API data will retun an array containing beach info
          //for looping over this array
          for (i = 0; i < data.length; i++) {

            //because the coastal API returns some null data for county region, a condition is created to bypass the nulls 
            if (!data[i].county_region) continue;

            //creating a condition to compare user input with county region data
            if (
              countyName.toUpperCase() === data[i].county_region.toUpperCase().trim()
            ) {

              //if condition matches, the following code block executes 
              //retriving site name (beach name)
              var site = data[i].site_name;
              var ul = document.querySelector("#cityname");
              var li = document.createElement("li");
              li.className = "panel-blocks";

              // attaching the value of "i" as an id to the "li" at each met condition (this "i" is matching the index of coastal API)
              li.id = i;

              li.innerHTML = site;
              ul.appendChild(li);
            }
          }

          //creating eventlistener for the beach info list, once the list is clicked the list element is retrieved
          document
            .getElementById("cityname")
            .addEventListener("click", function (event) {
              if (event.target && event.target.nodeName == "LI") {

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


  //fetching weather API to retrieve weather info
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


  //fetching five day API to retrieve five day forecast info
  fetch(fiveAPI)
    .then(function (response) {
      //request was successful 
      if (response.ok)
        response.json().then(function (data) {
          console.log(data)
          for (i = 0; i < data.list.length; i = i + 8) {
            console.log(data.list[i])

            var icon = data.list[i].weather[0].icon;
            var iconAPI = "https://openweathermap.org/img/w/" + icon + ".png";
            var temp = data.list[i].main.temp;
            var humidity = data.list[i].main.humidity;
            var wind = data.list[i].wind.speed

            document.querySelector("#icon-" + i).src = "";
            document.querySelector("#wind-" + i).innerHTML = "";
            document.querySelector("#humidity-" + i).innerHTML = "";
            document.querySelector("#temp-" + i).innerHTML = "";

            document.querySelector("#icon-" + i).src = iconAPI;
            document.querySelector("#wind-" + i).innerHTML = " Wind: " + wind;
            document.querySelector("#humidity-" + i).innerHTML = "humidity: " + humidity;
            document.querySelector("#temp-" + i).innerHTML = "Temperature: " + Math.round(temp);
          }
        })
    });

}


//event listener for the search bar
var submit = document.querySelector("#submit");

//created an empty array to save the city name in the local storage 
var cityList = [];

submit.addEventListener("click", function (event) {
  event.preventDefault();
  var location = document.querySelector("#Primary-input").value.trim();
  document.querySelector("#cityname").innerHTML = "";

  //fixing the problem of upper and lowercase words, this turns all entry into lowercase and saves it to localstorage
  locationLowerCase = location.toLowerCase()

  //catching duplicate in local storage 
  var totalStorage = JSON.parse(localStorage.getItem("cityname"));

  // if the city doesnt exist in Localstorage, then add the city to localstorage
  if (!totalStorage.includes(locationLowerCase)) {

    // pushing the city (location) to the array
    cityList.push(locationLowerCase);

    // saving the array to the local storage with the key: cityname
    localStorage.setItem("cityname", JSON.stringify(cityList));
  }

  // call the Coastal function and pass the user input (location) as paramater
  Coastal(location);
});

//from local storage , the city names will be displayed
function loadStorage() {

  // checking the localstorage 
  cityStorage = JSON.parse(localStorage.getItem("cityname"));

  // if empty, 
  if (!cityStorage) {

    // create an empty array in the local storage ( this will prevent the code to throw an error in the console, if the user is 
    // opening this page for the first time)
    localStorage.setItem("cityname", JSON.stringify(cityList));

    // if not empty, retrieve the local storage and place it back to the array (cityList)
  } else {
    for (i = 0; i < cityStorage.length; i++) {
      cityList.push(cityStorage[i]);

      // once the citynames are retrieved from local storage, they will be shown in the html history search section 
      var pastCityEl = document.getElementById("pastCity");
      var pastCitylist = document.createElement("li");
      pastCitylist.innerHTML = cityStorage[i];

      pastCityEl.appendChild(pastCitylist);
    }
  }
}

//calling the function localStorage()in global, (this will be executed when the page is opened or refreshed)
loadStorage();

//event listener for search history section
document.getElementById("pastCity").addEventListener("click", function (event) {
  if (event.target && event.target.nodeName == "LI") {
    document.querySelector("#cityname").innerHTML = "";

    // once clicked on the desired city, the cityname will be retrieved 
    var cityHistoryName = event.target.innerHTML;

    // calling the Coastal function and passing the cityname to it as paramater
    Coastal(cityHistoryName);
  }
})

