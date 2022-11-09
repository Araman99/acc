const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a package name."],
        trim: true,
        unique: [true, "Name must be unique."],
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."],
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    reviews: {
        star: Number,
        comments: [String],

    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative."],
    },
    discount: {
        type: Number,
        min: [0, "Discount can't be negative."],
        max: [100, "Discount can't be greater than 100"],
    },
    view: {
        type: Number,
        default: 0
    }
}
    ,
    {
        timestamps: true
    })

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;
