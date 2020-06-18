$(function () {

    //array of  city names for local storage
    var cities = [];

    //getItems in the local storage
    init();


    function init() {


        //convert string to array when fetching from local storage
        var citiesList = JSON.parse(localStorage.getItem("cities"));

      
        //if the array is not null, then the new array will be set to 
        //the array that is created.
        if (citiesList !== null) {
          cities = citiesList;
          renderList();
        }
        //alert(cities);
        

    }


    //when I click on the search button, then I must listen to the input value of the city
    $("#search").click(function (event) {
        event.preventDefault();


        
        //if the clicked area is a button
        if (event.target.matches("button")) {


            //assign the input element into cityName variable
            var cityName = $("#search-value").val().trim();
            //alert("at click: "+ cityName);

            //if input is empty return
            if (cityName === "") {
                return;
              }

            //if input is a valid entry            
              else {
            
                //add the cityName to the array
                if (!cities.includes(cityName)) cities.push(cityName);
                //alert("Array: " + cities);

                //after the element is added to the array, 
                //display the cityname in a list by called renderLastItem
                renderLastItem(cityName);
                storeTodo();
           
              }


            currentWeather(cityName);
            weatherForecast(cityName);

        }
    });

    $("ul.history").on ("click", "li", function() {
        currentWeather($(this).text());
        weatherForecast($(this).text());
    });

    function renderList() {
      
        // Render a new li for each cityName
        for (var i = 0; i < cities.length; i++) {
          var city = cities[i];
          //alert("renderList: " + city);
          
         //create a line item add the cityName and append to the ul parent
         //if (!cities.includes(city)){
         $("<li>").text(city).css('text-transform', 'capitalize').addClass("list-group-item").appendTo(".history");

         $("#search-value").val('');

         //}

        }
      }

      function renderLastItem(city) {
      
         
         //create a line item add the cityName and append to the ul parent
         $("<li>").text(city).css('text-transform', 'capitalize').addClass("list-group-item").appendTo(".history");
         //.attr("data-index", i)

         $("#search-value").val('');

      }



    function storeTodo() {
        localStorage.setItem("cities", JSON.stringify(cities));
      }

    function currentWeather(city) {

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=18722e52d22f44fcb7ed72b0b4635c56",
            method: "GET"

        }).then(function (response) {
            console.log(response);

            $("#today").empty();

            //$("<h2>").text(city + " " + (moment.unix(response.dt)).format("MM/DD/YYYY")).css('text-transform', 'capitalize').appendTo("#today");

            $("<div>").html("<h2>"+city + ' ' + (moment.unix(response.dt)).format('MM/DD/YYYY') + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>"+"<h2>").css('text-transform', 'capitalize').appendTo('#today');
        
            $("<p>").text("Temperature: " + response.main.temp + String.fromCharCode(176) + "F").appendTo("#today");

            $("<p>").text("Humidity: " + response.main.humidity + "%").appendTo("#today");

            $("<p>").text("Wind Speed: " + response.wind.speed + " mph").appendTo("#today");

            $("#today").addClass("border");

            var lon = response.coord.lon;
            var lat = response.coord.lat;
 
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=18722e52d22f44fcb7ed72b0b4635c56&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("<p>").text("UV Index: " + response.value).appendTo("#today");
            });


        });

    }


    function weatherForecast(city){

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=18722e52d22f44fcb7ed72b0b4635c56&units=imperial",
            method: "GET"
        }).then(function (response) {

            $("#forecast").empty();

            $("#forecast").addClass("row");

            $("<div>").html("<h2>5-day Forecast: <h2>").appendTo("#forecast").addClass("col-xs-12 col-sm-12 col-md-12");

            for (var i = 0; i < response.list.length; i++) {

                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {


                    var card = $("<div>").addClass("col-xs-2 col-sm-2 col-md-2 col-lg-2 card text-white bg-primary m-2 p-2").text((moment.unix(response.list[i].dt)).format("MM/DD/YYYY")).appendTo("#forecast");
                    $("<img>").attr("src","http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png").appendTo(card);
                    $("<p>").text("Temp: " + response.list[i].main.temp + String.fromCharCode(176) + "F").appendTo(card);
                    $("<p>").text("Humidity: " + response.list[i].main.humidity + "%").appendTo(card);

                }

            }

            
        });




    }


})
