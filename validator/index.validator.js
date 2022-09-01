function usersignupvalidator(req, res,next) {
    req.check('name', 'Нэрийг заавал оруулна уу').notEmpty()
    req.check('email', 'Имайл хаяг нь 4-32 үсэгтэй байх ёстой')
    .matches(/.+\@.+\..+/)
    .withMessage('Е-майл @-ийг агуулсан байх ёстой')
    .isLength({
        min: 4,
        max: 42
    })
    req.check('password', 'Нууц үгийг заавал оруулна уу').notEmpty()
    req.check('password')
    .isLength({min: 6})
    .withMessage('Нууц үг дор хаяж 6 үсэгтэй байх ёстой')
    .matches(/\d/)
    .withMessage('Нууц үг тоо агуулсан байх ёстой');
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}
module.exports = {
    usersignupvalidator,
}