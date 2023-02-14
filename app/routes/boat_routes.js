const express = require('express')
const passport = require('passport')
const Trip = require('../models/trip')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// SHOW
// GET /boats/:tripId/:boatId
router.get('/boats/:tripId/:boatId', requireToken, (req, res, next) => {
	const tripId = req.params.tripId
    const boatId = req.params.boatId
    Trip.findById(tripId)
        .then(handle404)
        .then(trip => {
            const theBoat = trip.boats.id(boatId)
            res.status(200).json({ boat: theBoat.toObject() })
        })
        .catch(next)
})

// CREATE
// POST /boats/:tripId
router.post('/boats/:tripId', removeBlanks, (req, res, next) => {
	const boat = req.body.boat
    const tripId = req.params.tripId
    Trip.findById(tripId)
        .then(handle404)
        .then(trip => {
            console.log('the trip: ', trip)
            console.log('the boat: ', boat)
            trip.boats.push(boat)
            return trip.save()
        })
        .then(trip => res.status(201).json({ trip: trip }))
        .catch(next)
})

// UPDATE
// PATCH /boats/:tripId/:boatId
router.patch('/boats/:tripId/:boatId', requireToken, removeBlanks, (req, res, next) => {
	const tripId = req.params.tripId
    const boatId = req.params.boatId
    Trip.findById(tripId)
        .then(handle404)
        .then(trip => {
            const theBoat = trip.boats.id(boatId)
            requireOwnership(req, theBoat)
            theBoat.set(req.body.boat)
            return trip.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DESTROY
// DELETE /boats/:tripId/:boatId
router.delete('/boats/:tripId/:boatId', requireToken, (req, res, next) => {
	const tripId = req.params.tripId
    const boatId = req.params.boatId
    Trip.findById(tripId)
        .then(handle404)
        .then(trip => {
            const theBoat = trip.boats.id(boatId)
            requireOwnership(req, theBoat)
            theBoat.remove()
            return trip.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
