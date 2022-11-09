const express = require('express');
const toursController = require('../../controllers/tours.controller')

const Router = express.Router();

Router.route('/trending')
    .get(toursController.mostViewTours)

Router.route('/cheapest')
    .get(toursController.cheapestTours)

Router.route('/')
    .get(toursController.getTours)
    .post(toursController.saveTours)
Router.route('/:id')
    .get(toursController.getTour)

Router.route('/:id')
    .patch(toursController.updateTour)

module.exports = Router;