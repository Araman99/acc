const { getToursService, createTourService, updateTourService, getTourService, mostViewService, cheapestToursService } = require("../services/tour.services");

const Tour = require("../models/Tour");


exports.getTours = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields.forEach(field => delete filters[field]);

        //gt, lt, gte, lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(" ");
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(" ");
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const result = await getToursService(filters, queries);
        res.status(200).send({
            status: 'success',
            message: 'All the tour packages',
            data: result
        })
    } catch (error) {
        res.status(200).send({
            status: 'fail',
            message: `Data can't inserted`,
            error: error.message
        })
    }
}

exports.saveTours = async (req, res) => {
    try {
        const result = await createTourService(req.body);
        res.status(200).send({
            status: 'success',
            message: 'Data inserted successfully',
            data: result
        })
        console.log("save a new tour");
    } catch (error) {
        res.status(200).send({
            status: 'fail',
            message: `Data can't inserted`,
            error: error.message
        })
    }
}

exports.getTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getTourService(id);
        res.status(200).send({
            status: 'success',
            message: 'Package details',
            data: result
        })
    } catch (error) {
        res.status(200).send({
            status: 'fail',
            message: `Package can't show`,
            error: error.message
        })
    }
};

exports.mostViewTours = async (req, res, next) => {
    try {
        const result = await mostViewService();
        res.status(200).send({
            status: 'success',
            message: 'Package details',
            data: result
        })
    } catch (error) {
        res.status(200).send({
            status: 'fail',
            message: `No data found`,
            error: error.message
        })
    }
}

exports.cheapestTours = async (req, res, next) => {
    try {
        const result = await cheapestToursService();
        res.status(200).send({
            status: 'success',
            message: 'Cheapest tours',
            data: result
        })
    } catch (error) {
        res.status(200).send({
            status: 'fail',
            message: `No data found`,
            error: error.message
        })
    }
}

exports.updateTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateTourService(id, req.body);

        res.status(200).send({
            status: 'success',
            message: `Data updated successfully`,
        })
    } catch (error) {
        res.status(200).send({
            status: 'fail',
            message: `Couldn't update the package`,
            error: error.message
        })
    }
}