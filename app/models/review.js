//// IMPORT DEPENDENCIES ////
const mongoose = require('mongoose')
const User = require('./user')

//// SCHEMA ////

const reviewSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

//// EXPORT ////

module.exports = reviewSchema