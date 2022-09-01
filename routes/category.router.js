const express = require('express');
const router = express.Router();

const {createCategory,categoryById,read,listCategory,updateCategory,removeCategory} = require('../controller/category.controller')
const { isAuth, isAdmin, requireSignin} = require('../controller/user.controller');
const {userById} = require('../controller/userId.controller')

router.post('/category/create/:userId', 
requireSignin,
isAdmin,
isAuth,
createCategory
);
router.put('/category/:categoryId/:userId', 
requireSignin,
isAdmin,
isAuth,
updateCategory
);
router.delete('/category/:categoryId/:userId', 
requireSignin,
isAdmin,
isAuth,
removeCategory
);
router.get('/category/:categoryId', read);
router.get('/category/', listCategory);
router.param('categoryId', categoryById);


router.param('userId', userById);

module.exports = router;