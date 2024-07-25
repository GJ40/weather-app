// Weather App Program

const apiKey = "";
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchBtn");
const locationBtn = document.querySelector(".locationBtn");


searchBtn.addEventListener("click", () => {
    const city = searchInput.value;
    if(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        getWeather(apiUrl);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoords);
    }
    else{
        alert("Geolocation is not supported by this browser.")
    }
});

function getCoords(position) {
    const [lat, lon] = [position.coords.latitude, position.coords.longitude];
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    getWeather(apiUrl);
}

async function getWeather(apiUrl){
    try{
        const response = await fetch(apiUrl);

        //console.log(response);
    
        if(!response.ok){
            throw new Error("Could not fetch weather Data.");
        }
        else{
            const weatherData = await response.json();
            //console.log(weatherData);
            const {name: city,
                    main: {temp, humidity},
                    weather: [{ description, icon}],
                    wind: {speed},
                    } = weatherData;
            //console.log(city, humidity, temp, description, icon, id, speed);
            document.querySelector(".weather-condition").innerHTML = description;
            document.querySelector(".city").innerHTML = city;
            document.querySelector(".weather-icon").src = `images/weather conditions/${icon}.svg`;
            //document.getElementById("temp").innerHTML = `${(temp - 273.15).toFixed(2)}°C`;
            document.getElementById("temp").innerHTML = `${Math.round(temp - 273.15)}°C`;
            document.querySelector(".humidity").innerHTML = `${humidity}%`;
            document.querySelector(".wind").textContent = `${(speed * 3.6).toFixed(2)} km/h`;
        }
    }
    catch(error){
        console.error(error);
    }
}





























