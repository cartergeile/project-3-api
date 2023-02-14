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


//// EXPORT ////

module.exports = mongoose.model('Trip', tripSchema)
