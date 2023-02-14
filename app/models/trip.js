//// DEPENDENCIES ////
const mongoose = require('mongoose')
const boatSchema = require('./boat')

//// SCHEMA ////

const tripSchema = new mongoose.Schema(
	{
		location: {
            type: String,
            enum: ['Mediterranean', 'Caribbean', 'Indian Ocean', 'Antarctica', 'Far East', 'Mississippi River'],
            required: true
        },
        city: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        boats: [boatSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
	}
)

//// VIRTUALS ////

tripSchema.virtual('minTemperature').get(async function() {
    // constructing the weather API URL using the trip's city and our OpenWeatherMap API key
    const weatherApiKey = 'dc2845f9bd781af2272c91ca53a8aabf'
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${weatherApiKey}`

    // makes an API request using fetch to get the weather data for the city
    const response = await fetch(weatherApiUrl)
    const data = await response.json()

    // filtering the data to only return info for the dates between the start and end date
    const filteredData = data.list.filter(weatherData => {
        const date = new Date(weatherData.dt_txt)
        return date >= this.startDate && date <= this.endDate
    })

    // returning the minimum temperature from the filtered weather data
    const temperatures = filteredData.map(weatherData => weatherData.main.temp)
    return Math.min(...temperatures)
})
  
tripSchema.virtual('maxTemperature').get(async function() {
    // constructing the weather API URL using the trip's city and our OpenWeatherMap API key
    const weatherApiKey = 'dc2845f9bd781af2272c91ca53a8aabf'
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${weatherApiKey}`

    // makes an API request using fetch to get the weather data for the city
    const response = await fetch(weatherApiUrl)
    const data = await response.json()

    // filtering the data to only return info for the dates between the start and end date
    const filteredData = data.list.filter(weatherData => {
        const date = new Date(weatherData.dt_txt)
        return date >= this.startDate && date <= this.endDate
    })

    // returning the maximum temperature from the filtered weather data
    const temperatures = filteredData.map(weatherData => weatherData.main.temp)
    return Math.max(...temperatures)
})


//// EXPORT ////

module.exports = mongoose.model('Trip', tripSchema)
