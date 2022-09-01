const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

require('dotenv').config();

const userRoutes = require('./routes/user.router');
const userIdRouter = require('./routes/userId.router');
const categoryRouter = require('./routes/category.router');
const productRouter = require('./routes/product.router');

//app
const app = express();


//db
mongoose.connect(process.env.DATABASE, {}).then(() => console.log('DB connected'));


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use('/api', userRoutes);
app.use('/api', userIdRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);

port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});