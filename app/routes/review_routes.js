const express = require('express')
const passport = require('passport')
const Trip = require('../models/trip')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE
// POST /reviews/:tripId/:boatId
router.post('/reviews/:tripId/:boatId', requireToken, removeBlanks, (req, res, next) => {
    req.body.review.author = req.user.id

	const review = req.body.review
    const tripId = req.params.tripId
    const boatId = req.params.boatId
    Trip.findById(tripId)
        .then(handle404)
        .then(trip => {
            const theBoat = trip.boats.id(boatId)
            console.log('the trip:', trip)
            console.log('the boat: ', theBoat)
            console.log('the review: ', review)
            theBoat.reviews.push(review)
            theBoat.save()
            return trip.save()
        })
        .then(trip => {
            res.status(201).json({ trip: trip })
        })
        .catch(next)
})

// UPDATE
// PATCH /reviews/:tripId/:boatId/:reviewId
router.patch('/reviews/:tripId/:boatId/:reviewId', requireToken, removeBlanks, (req, res, next) => {
    delete req.body.review.author 
    
    const tripId = req.params.tripId
	const boatId = req.params.boatId
    const reviewId = req.params.reviewId
    Trip.findById(tripId)
        .then(handle404)
        .then(trip => {
            const theBoat = trip.boats.id(boatId)
            const theReview = theBoat.reviews.id(reviewId)
            requireOwnership(req, theReview)
            theReview.set(req.body.review)
            theBoat.save()
            return trip.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DESTROY
// DELETE /reviews/:tripId/:boatId/:reviewId
router.delete('/reviews/:tripId/:boatId/:reviewId', requireToken, (req, res, next) => {
    const tripId = req.params.tripId
	const boatId = req.params.boatId
    const reviewId = req.params.reviewId
    Trip.findById(tripId)
        .then(handle404)
        .then(trip => {
            const theBoat = trip.boats.id(boatId)
            const theReview = theBoat.reviews.id(reviewId)
            requireOwnership(req, theReview)
            theReview.remove()
            theBoat.save()
            return trip.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
