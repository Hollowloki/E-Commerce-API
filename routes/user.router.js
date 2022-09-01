const express = require('express');
const router = express.Router();
const {signIn, signUp, signOut, requireSignin} = require('../controller/user.controller');

const { usersignupvalidator } = require('../validator/index.validator');

router.post('/signup', usersignupvalidator,signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);


module.exports = router;