/* Global Variables */
let preZip = 'http://api.geonames.org/postalCodeSearchJSON?postalcode=';
let postZip = '&maxRows=10&username=omarshokeir';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipCode = document.getElementById('zip').value;
    getData(preZip, zipCode, postZip)
        .then(function (data) {
            // Add data
            console.log(data);
            postData('/add', {
                latitude: data.postalCodes[0].lat,
                longitude: data.postalCodes[0].lng,
                country: data.postalCodes[0].countryCode
            });
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






