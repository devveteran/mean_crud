
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Connecting with mongo db
mongoose
    .connect('mongodb://127.0.0.1:27017/mydatabase')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: ${x.connections[0].name}` );
    })
    .catch((error) => {
        console.error(`Error connecting to mongo`, error.reason);
    });

// Setting up port with express js
const employeeRoute = require('../backend/routes/employee.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,},));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/mean-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-crud-app')));
app.use('/api', employeeRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
})

// Error handler
app.use(function (err, req, res, next) {
    console.log(err.message);
    if( !err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
