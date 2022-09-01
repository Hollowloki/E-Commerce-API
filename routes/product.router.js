const express = require('express');

const router = express.Router();
const {userById} = require('../controller/userId.controller')
const {signIn, signUp, signOut, requireSignin} = require('../controller/user.controller')
const {productById,saveProduct, read,remove,update} = require('../controller/product.controller');

//router.get('/product', getAllProduct);
router.get('/product/:productId', read);
router.post('/product/create/:userId',requireSignin,
isAdmin,
isAuth,saveProduct,);
router.delete('/product/:productId/:userId',requireSignin,
isAdmin,isAuth, remove);

router.put('/product/:productId/:userId',requireSignin,
isAdmin,isAuth, update);

router.param('userId', userById);
router.param('productId', productById);


module.exports = router;