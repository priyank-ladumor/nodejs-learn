const mongoose = require('mongoose');
const { Schema } = mongoose;

//schema
// for configuration
const productSchema = new Schema({
    // title: String,  // String is shorthand for {type: String}
    title: { type: String, index: { unique: true, dropDups: true }, required: true },
    description: { type: String },
    price: { type: Number, min: [0, "too low"], required: true },
    discountPercentage: { type: Number, min: [0, "wrong low discount"], max: [50, "wrong high discount"] },
    rating: { type: Number, min: [0, "too low"], max: [5, "too high"] },
    stock: { type: Number, min: [0, "too low"], max: [500, "too high"] },
    brand: { type: String, required: true },
    category: String,
    thumbnail: { type: String, required: true },
    images: [String]
});

exports.crud = mongoose.model("crud", productSchema);