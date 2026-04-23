const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },

    author: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        min: 0
    },

    category: {
        type: String,
        enum: ["Fiction", "Non-Fiction"]
    },

    inStock: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);