const cityText = document.getElementById('city');
const tempText = document.getElementById('temp');
const weatherIcon = document.getElementById('icon');
const citiesSelect = document.getElementById('cities');
const humidityText = document.getElementById('humidity');
const descriptionText = document.getElementById('description');
const feelsLikeText = document.getElementById('feels_like');
const windText = document.getElementById('wind');

let currentCity = citiesSelect.value;
citiesSelect.addEventListener('change', (event) => {
    currentCity = citiesSelect.value;
    loadWeather(currentCity);
});

function loadWeather(currentCity) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=9b193d61fd017ac80387ab43b2a5322f`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        const cels = Math.floor(data.main.temp - 273);
        const feelsLike = Math.floor(data.main.feels_like - 273);

        console.log(data);

        cityText.innerText = data.name;
        tempText.innerHTML = `${cels}&deg;`;

        feelsLikeText.innerHTML = `Feels like: ${feelsLike}&deg;`;
        humidityText.innerText = `Humidity: ${data.main.humidity}%`;
        windText.innerText = `Wind: ${data.wind.speed} km/h`;
        descriptionText.innerText = data.weather[0].description;

        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    })
    .catch(function() {
        //error
    })
}
loadWeather(currentCity)

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("city.list.json", function(text){
    let data = JSON.parse(text);
    let array = data.filter( function (item) { return item.country === "UA"})

    for (let i = 1; i <= array.length; i++) {
        let option = `<option value="${array[i-1].name}">${array[i-1].name}</option>`;
        citiesSelect.insertAdjacentHTML( 'beforeend', option );
    }
});
