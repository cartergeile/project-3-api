//// DEPENDENCIES ////
const mongoose = require('mongoose')
const reviewSchema = require('./review')
const User = require('./user')

//// SCHEMA ////

const boatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    captain: {
        type: String, 
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    petsAllowed: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

//// EXPORT ////

module.exports = boatSchema