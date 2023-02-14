// seed database - run with 'npm run seed'


//const mongoose =

const mongoose = require('mongoose')
const Boat = require('./boat')
const db = require('../../config/db')

const startBoats = [

    {
		name: 'Lurssen',
		captain: 'Carter',
        passengers: 12,
        length: 312,
        petsAllowed: true,
        image: 'https://i.imgur.com/4XBiAmh.jpg'
    },

    {
        name: 'Faith',
		captain: 'America',
        passengers: 12,
        length: 317,
        petsAllowed: true,
        image: 'https://i.imgur.com/DLK9Wvi.png'
    }, 

    {
        name: 'Legend',
		captain: 'Aaron',
        passengers: 26,
        length: 232,
        petsAllowed: false,
        image: 'https://i.imgur.com/BWyR3Cy.jpg'
    }
]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Boat.deleteMany()
            .then(deletedBoats => {
            console.log('deleted boats', deletedBoats)

            Boat.create(startBoats)
            .then(newBoats => {
                console.log('added boats', newBoats)
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


//

