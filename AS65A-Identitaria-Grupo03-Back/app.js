var express = require('express');
var cors = require('cors')
var path = require('path');
require('dotenv').config();

var app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var userRoutes = require('./routes/userRoutes')
var professorRoutes = require('./routes/professorRoutes')
var empresasRoutes = require('./routes/empresaRoutes')
var install = require('./helpers/installApi')

app.use('/install', install)
app.use('/user', userRoutes)
app.use('/professor', professorRoutes)
app.use('/empresa', empresasRoutes)


module.exports = app;