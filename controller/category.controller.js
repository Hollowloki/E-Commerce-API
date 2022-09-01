const Category = require('../models/category.model');
const {errorHandler} = require('../helpers/dbErrorHandler');

function categoryById(req,res,next,id) {
    Category.findById(id).exec((err, category) => {
        if(err|| !category){
            return res.status(400).json({
                error: 'Ангилал байхгүй байна'
            })
        }
        req.category = category;
        next();
    })
}
function read(req, res) {
    return res.json(req.category);
}
function createCategory (req, res) {
    const category = new Category(req.body);
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })

        }
        res.json({data});
    })
}




function updateCategory(req, res) {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}
function removeCategory(req, res) {
    const category = req.category;
    category.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(
           { message: "Ангилал устсан",}
        );
    })
}
function listCategory(req, res) {
    Category.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}

module.exports = {
    createCategory,
    categoryById,
    read,
    updateCategory,
    removeCategory,
    listCategory
}