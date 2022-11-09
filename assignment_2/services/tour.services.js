const Tour = require("../models/Tour");

exports.getToursService = async (filters, queries) => {
    const Tours = await Tour
        .find({ filters })
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    return Tours;
}

exports.createTourService = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}

exports.getTourService = async (id) => {
    const tour = await Tour.findById(id);
    tour.view += 1;
    const result = await tour.set(tour).save();
    return result;
}

exports.mostViewService = async () => {
    const Tours = await Tour
        .find({})
        .limit(3)
        .sort("-view")
    return Tours;
}

exports.cheapestToursService = async () => {
    const Tours = await Tour
        .find({})
        .limit(3)
        .sort("price")
    return Tours;
};

exports.updateTourService = async (id, data) => {
    // const tour = await Tour.updateOne({ _id: id }, { $set: data }, {
    //     runValidators: true
    // });
    const tour = await Tour.findById(id);
    const result = await tour.set(data).save();
    return result;
}