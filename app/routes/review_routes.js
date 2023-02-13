const express = require('express')
const passport = require('passport')
const Boat = require('../models/boat')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE
// POST /reviews/:boatId
router.post('/reviews/:boatId', removeBlanks, (req, res, next) => {
	const review = req.body.review
    const boatId = req.params.boatId
    Boat.findById(boatId)
        .then(handle404)
        .then(boat => {
            console.log('the boat: ', boat)
            console.log('the review: ', review)
            boat.reviews.push(review)
            return boat.save()
        })
        .then(boat => res.status(201).json({ boat: boat }))
        .catch(next)
})

// UPDATE
// PATCH /reviews/:boatId/:reviewId
router.patch('/reviews/:boatId/:reviewId', requireToken, removeBlanks, (req, res, next) => {
	const boatId = req.params.boatId
    const reviewId = req.params.reviewId
    Boat.findById(boatId)
        .then(handle404)
        .then(boat => {
            const theReview = boat.reviews.id(reviewId)
            requireOwnership(req, boat)
            theReview.set(req.body.review)
            return boat.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DESTROY
// DELETE /reviews/:boatId/:reviewId
router.delete('/reviews/:boatId/:reviewId', requireToken, (req, res, next) => {
	const boatId = req.params.boatId
    const reviewId = req.params.reviewId
    Boat.findById(boatId)
        .then(handle404)
        .then(boat => {
            const theReview = boat.reviews.id(reviewId)
            requireOwnership(req, boat)
            theReview.remove()
            return boat.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
