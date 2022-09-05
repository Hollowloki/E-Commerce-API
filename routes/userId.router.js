const express = require('express');
const router = express.Router();

const {requireSignin, isAdmin, isAuth} = require('../controller/user.controller');
const {userById} = require('../controller/userId.controller')

router.get('/secret/:userId',requireSignin,isAuth, (req, res) => {
    res.json({
        user: req.profile
    })
} )

router.param('userId', userById);

module.exports = router;