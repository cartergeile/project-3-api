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
tripSchema.virtual('cityid').get(function (){
    switch(this.city) {
        case 'Monte Carlo':
            return '2992741';
        case 'Havana':
            return '3553478';
        case 'Aden':
            return '415189';
        case 'Port Lockroy':
            return 'n/a';
        case 'Vladivostok':
            return '2013348';
        case 'St. Louis':
            return '4407066';
        default:
            return 'n/a'
    }
})

//// EXPORT ////

module.exports = mongoose.model('Trip', tripSchema)
