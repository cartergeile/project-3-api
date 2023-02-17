// seed database - run with 'npm run tripseed'

const mongoose = require('mongoose')
const Trip = require('./trip')
const db = require('../../config/db')

const startTrips = [
  {location: 'Mediterranean', city: 'Monte Carlo', startDate: new Date('2023-01-20'), endDate: new Date('2023-01-27') },
  {location: 'Caribbean', city:'Havana', startDate: new Date('2023-02-20'), endDate: new Date('2023-02-27') },
  {location: 'Indian Ocean', city: 'Aden', startDate: new Date('2023-03-20'), endDate: new Date('2023-03-27') },
  {location: 'Antarctica', city: 'Port Lockroy', startDate: new Date('2023-04-20'), endDate: new Date('2023-04-27') },
  {location: 'Far East', city: 'Vladivostok', startDate: new Date('2023-05-20'), endDate: new Date('2023-05-27') },
  {location: 'Mississippi River', city:'St. Louis', startDate: new Date('2023-06-20'), endDate: new Date('2023-06-27') }
]

mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => {
    Trip.deleteMany()
      .then(deletedTrips => {
        console.log(deletedTrips)
        Trip.create(startTrips)
          .then(newTrips => {
            console.log(newTrips)
            mongoose.connection.close()
          })
          .catch(error => {
            console.log(error)
            mongoose.connection.close()
          })
      })
      .catch(error => {
        console.log(error)
        mongoose.connection.close()
      })
  })
  .catch(error => {
    console.log(error)
    mongoose.connection.close()
  })