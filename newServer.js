require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middlewares/logEvents');
const errorHanlder = require('./middlewares/errorHandler');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConnect');
const PORT = process.env.PORT || 3300;


// connect to mongoDB
connectDb();

// custom midlleware logger
app.use(logger);

// handles options credentilas check before cors
app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOptions));

// built-in middlewares to handle urlencoded data ie form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));


// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logOut', require('./routes/logOut'));



app.use('/subdir', require('./routes/subdir'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));


//if a requested file does not exist load 404 page
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '_404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: "404 Not found" });
    } else {
        res.type('text').send('404 Not found');
    }

});

app.use(errorHanlder);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

});

// creating routers 
// app.use() for middlewares
// app.all() for routes
















// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello page');
    next();
}, (req, res) => {
    res.send('Hello world');
})
// chaining handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three')
    res.send('Finished ');
}
app.get('/chain(.html)?', [one, two, three]);