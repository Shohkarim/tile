const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true},
    desc: String,
    code: Number,
    kind: String,
    surface: String,
    size: String,
    form: String,
    color: String,
    country: String,
    maker: String,
    property: String,
    pic_face: String,
    inbox: String,
    weight: String,
    use: String,
    discount: Number,
    material: String,
    in_hand: Boolean,

    url: String,
}, {
    timestamps: true,
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;