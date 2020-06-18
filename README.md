
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
-Used OpenweatherMaps API to make ajax calls to retrieve current and future weather information

THEN I am presented with current and future conditions for that city and that city is added to the search history
-used local storage to remember the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
- navigated through the JSON response to retrieve and display the information

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city

THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
- made a second ajax call to retrieve the 5-day forecast at 12pm for the next 5 days

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
- added an event listener to the line items to call display the weather information

WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
-local storage retrieves the past search history from the array and display the past searches
```

