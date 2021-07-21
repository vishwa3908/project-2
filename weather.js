$('document').ready(function() {

    $(".toggle").click(function() {
        $(".navbar").toggleClass("collapse");
    })
});
let weather = {
    "apiKey":"828f4f585041711eb1f41bd8ee5fa465",
    fetchWeather:function(city){
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" 
        + city
         + "&units=metric&appid="
          + this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.diplayWeather(data));
    },
    diplayWeather:function(data){
        const {name} = data;
        const {icon,description} = data.weather[0];
        const{temp,humidity} = data.main
        const{speed} = data.wind
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "Weather In " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = "Temperature : " +parseInt(temp) + "° C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity+" %";
        document.querySelector(".wind").innerText = "Wind Speed : "+speed + "Km/hr" 
        document.querySelector(".weather").classList.remove("loading");
    },
    search:function(){
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};
    let geocode = {
        reverseGeocode:function(latitude,longitude){
            var api_key = 'bc6910f3193a424681e76e1156f25264';
          
            var api_url = 'https://api.opencagedata.com/geocode/v1/json'
          
            var request_url = api_url
              + '?'
              + 'key=' + api_key
              + '&q=' + encodeURIComponent(latitude + ',' + longitude)
              + '&pretty=1'
              + '&no_annotations=1';
          
            // see full list of required and optional parameters:
            // https://opencagedata.com/api#forward
          
            var request = new XMLHttpRequest();
            request.open('GET', request_url, true);
          
            request.onload = function() {
              // see full list of possible response codes:
              // https://opencagedata.com/api#codes
          
              if (request.status === 200){ 
                // Success!
                var data = JSON.parse(request.responseText);
                weather.fetchWeather(data.results[0].components.city);
              } else if (request.status <= 500){ 
                // We reached our target server, but it returned an error
                                     
                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log('error msg: ' + data.status.message);
              } else {
                console.log("server error");
              }
            };
          
            request.onerror = function() {
              // There was a connection error of some sort
              console.log("unable to connect to server");        
            };
          
            request.send();  // make the request
        },
        getLocation:function(){
            function success(data){
                geocode.reverseGeocode(data.coords.latitude,data.coords.longitude);
            }
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success,console.error);
        }
        else {
            weather.fetchWeather("Jaipur");
        }
    }
    };
document.querySelector(".search-icon").addEventListener("click",function(){
    weather.search()
});
document.querySelector(".searchbar").addEventListener("keyup",function(event){
    if (event.key == "Enter"){
        weather.search();
    }
} )
$(document).on('click','ul li',function(){
    $('this').addClass('active');
});
geocode.getLocation();