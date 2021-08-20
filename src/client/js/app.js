/* Global Variables */
let preZip = 'http://api.geonames.org/searchJSON?q=';
let postZip = '&maxRows=10&username=omarshokeir';

let preWeather = "https://api.weatherbit.io/v2.0/current?lat="
let postLat = "&lon="
let weatherKey = "&key=41556fc3f18b4782b005eb7e28385b62"

let predictedWeatherBase = "https://api.weatherbit.io/v2.0/forecast/daily?lat="
let predictedPostLat = "&lon="


// Create a new date instance dynamically with JS

const oneDay = 24 * 60 * 60 * 1000;
const today = new Date();




document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const tripDate = document.getElementById('date').value;
    const diffDays = Math.round(Math.abs((today - tripDate) / oneDay));
    getData(preZip, zipCode, postZip)
        .then(function (data) {
            if (diffDays <= 7) {
                getCurrentWeather(preWeather, data.geonames[0].lat, postLat, data.geonames[0].lng, weatherKey)
                    .then(function (data) {
                        console.log(data);
                        postData('/add', {
                            temp: data.data[0].app_temp
                        });
                    })
            }
            else {
                getPredictedWeather(predictedWeatherBase, data.geonames[0].lat, predictedPostLat, data.geonames[0].lng, weatherKey)
                .then(function (data) {
                    console.log(data);
                    postData('/add', {
                        temp: data.data[0].app_max_temp
                    });
                })
            }
        })
};
// Async function to get the data from the API
const getData = async (preZip, zip, postZip) => {
    const res = await fetch(preZip + zip + postZip)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}
const getCurrentWeather = async (predictedWeatherBase, lat, predictedPostLat, lon, weatherKey) => {
    const res = await fetch(predictedWeatherBase + lat + predictedPostLat + lon + weatherKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}
const getPredictedWeather = async (preWeather, lat, postLat, lon, weatherKey) => {
    const res = await fetch(preWeather + lat + postLat + lon + weatherKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

// POST data
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Error:", error);
    }
}

export { performAction }




