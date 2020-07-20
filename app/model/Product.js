const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Niños', 'Hogar', 'Entretenimiento']
    },
    stock: {
        type: Number,
        default: 10
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;