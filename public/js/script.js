
let form = document.getElementById('form1')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(document.getElementById('address').value)
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const latitudeF = document.getElementById('latitude')
const longitudeF = document.getElementById('longitude')
// async --> function return promise

let weatherFunction = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorF.innerText = 'ERROR!!!   ' + data.error
            locationF.innerText = ""
            forecastF.innerText = ""
            latitudeF.innerText = ""
            longitudeF.innerText = ""
        }
        else {
            locationF.innerText = 'Weather for : ' + data.location
            forecastF.innerText = 'Current Weather: ' + data.forecast
            latitudeF.innerText = 'Latitude: ' + data.latitude
            longitudeF.innerText = 'Longitude: ' + data.longitude
            errorF.innerText = ""
        }
    }
    catch (e) {
        console.log(e)
    }
}

// 3 