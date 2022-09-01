const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32, 
    },
    description:{
        type:String,
         required: true,
         maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: ObjectId,
        required: true,
        ref: 'Category'
    },
    shipping: {
        required: false,
        type: Boolean,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },

    
},
{
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema);