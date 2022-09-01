const Product = require('../models/product.model');
const formidable = require('formidable');
const lodash = require('lodash')
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');

function productById(req, res ,next,id) {
    Product.findById(id).exec((err, product) =>{
        if(err || !product) {
            return res.status(400).json({
                error: 'Бүтээгдэхүүн олдсонгүй',
            })
        } 
        req.product = product;
        next();
    })
}

function read(req, res) {
    req.product.photo = undefined;
    return res.json(req.product);
}

function saveProduct(req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'зураг оруулж чадсангүй',
            })
        }

        const {name, description, price, category, quantity,shipping} = fields;

        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'Бүгдийн бөглөнө үү',
            })
        }

        let product = new Product(fields);



        if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: '1mb аас доош зураг оруулна уу',
                })
            }
            console.log("FILES PHOTO: ", files.photo);
            console.log("PATHHHHHHH", files.photo.filepath);

            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}
function remove(req, res){
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
        deletedProduct,
        "message": 'Бүтээгдэхүүн амжилттай устлаа'
        })
    })
   
}
function update(req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'зураг оруулж чадсангүй',
            })
        }

        const {name, description, price, category, quantity,shipping} = fields;

        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'бүгдийг бөглөнө үү',
            })
        }

        let product = req.product;
        product = lodash.extend(product, fields);



        if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: '1mb аас доош зураг оруулна уу!',
                })
            }
            console.log("FILES PHOTO: ", files.photo);
            console.log("PATHHHHHHH", files.photo.filepath);

            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}

module.exports = {
    saveProduct,read,productById,remove,update
}