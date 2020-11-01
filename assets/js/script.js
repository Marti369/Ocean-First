// the first search result will have the list of beachs near you
//then the list will display the beach names only based on your search
//then click on the beach near you
//and display the beach you clicked on the right.
//this will display all the informaiton

//creating a function for caostal API

var Coastal = function (countyName) {
  var coastalAPI = "https://api.coastal.ca.gov/ccd/v1/locations";
    var WeatherAPi = "https://api.openweathermap.org/data/2.5/weather?q=" +
    countyName + "&appid=829ab038feb797ebd959e94c190da467&units=imperial";
    

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
              countyName.toUpperCase() === data[i].county_region.toUpperCase()
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

                var ul = document.querySelector("#beachinfo");

                var liSite = document.createElement("li");
                liSite.className = "panel-blocks";
                liSite.innerHTML = site;

                var liAddress = document.createElement("li");
                liAddress.className = "panel-blocks";
                liAddress.innerHTML = address;

                var liWebsite = document.createElement("li");
                liWebsite.className = "panel-blocks";
                liWebsite.innerHTML = website;

                var liRegister = document.createElement("li");
                liRegister.className = "panel-blocks";
                liRegister.innerHTML = register;

                var liStart = document.createElement("li");
                liStart.className = "panel-blocks";
                liStart.innerHTML = start;

                var LiEnd = document.createElement("li");
                LiEnd.className = "panel-blocks";
                LiEnd.innerHTML = end;

                var liBring = document.createElement("li");
                liBring.className = "panel-blocks";
                liBring.innerHTML = bring;

                var liOrganizaiton = document.createElement("li");
                liOrganizaiton.className = "panel-blocks";
                liOrganizaiton.innerHTML = organization;

                document.querySelector("#beachinfo").innerHTML = "";

                ul.appendChild(liSite);
                ul.appendChild(liAddress);
                ul.appendChild(liWebsite);
                ul.appendChild(liRegister);
                ul.appendChild(liStart);
                ul.appendChild(LiEnd);
                ul.appendChild(liBring);
                ul.appendChild(liOrganizaiton);
              }
            });
        });
    })
    .catch(function (error) {
      alert("unable to connect");
    });

    fetch(WeatherAPi)
    .then(function(response){
        //request was sucessful
        var iconAPI = "https://openweathermap.org/img/w/" + icon + ".png"
        if(response.ok)
        response.json().then(function(data){
            var city = data.name;
            var icon = data.weather[0].icon;
            var wind = data.wind.speed;
            var humidity= data.main.humidity;
            var temp= data.main.temp;
         
            document.querySelector("img").src = iconAPI
            document.querySelector("#city").append(countyName)
            document.querySelector("#wind").innerHTML = "Wind: " + wind
            document.querySelector("#humidity").innerHTML = "Humidity: " + humidity
            document.querySelector("#temp").innerHTML= "Temperature "+ temp

        })
    })
};

var submit = document.querySelector("#submit");
var cityList = [];

submit.addEventListener("click", function (event) {
  event.preventDefault();
  var location = document.querySelector("#Primary-input").value.trim();
  document.querySelector("#cityname").innerHTML = "";

  cityList.push(location);
  localStorage.setItem("cityname", JSON.stringify(cityList));
  Coastal(location);
});

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

document.getElementById("pastCity").addEventListener("click", function (event) {
  if (event.target && event.target.nodeName == "LI") {
    var cityHistoryName = event.target.innerHTML;
    Coastal(cityHistoryName);
  }
});

