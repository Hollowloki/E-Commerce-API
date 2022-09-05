const User = require('../models/user.model');
const {errorHandler} = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check



function signUp(req,res) {
    console.log("req..body", req.body);
    const user = new User(req.body);
    
    //save doing all
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        //salt bolon hash pass butsaah shaardlagagui
        user.salt=undefined
        user.hashed_password= undefined;
        res.status(200).json({
            user
        })
    })
}




function signIn(req, res) {
    //find the user based on email
    const {email, password} = req.body;
    
    User.findOne({email}, (err, user)=>{
        if(err || !user) {
            return res.status(400).json({
                err: 'Хэрэглэгч байхгүй байна. Бүртгүүлнэ үү'
            })
        }
        //if user is found make sure the email and password match
        //create authenticate method in user model
        
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Эмайл нууц үг тохирохгүй байна'
            })
        }
        
        // generate a signed token with use id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        
        //persist the token as cookie with expiry date
        
        res.cookie('t', token, {expire: new Date() + 9999})
        //return res with user and token to frontend client
        
        const {_id, name, email, role}= user;
        return res.json({token,user:{_id, email, name, role}})
    })
}

function signOut(req, res) {
    res.clearCookie('t')
    res.json({message: 'Амжилттай гарлаа'})
}


requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
})


isAuth = (req, res,next) => {
    console.log(req);
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if(!user) {
        return res.status(403).json({
            error: 'Хандалт амжилтгүй'
        })
    }
    next();
}
isAdmin = (req, res, next ) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: 'Админ нэвтрэх эрх хэрэгтэй'
        })
    }
    next();
}


module.exports = {
    signUp,
    signIn,
    signOut,
    requireSignin,
    isAuth,
    isAdmin,
}