const User = require('../models/user.model');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'Хэрэглэгч олдсонгүй'
            })
        }
        req.profile = user
        next();
    })
}