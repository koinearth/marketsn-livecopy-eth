/* eslint-disable new-cap */
const Router = require('express').Router();

// Below Controller Imports should be an express{Router} instance
const adminRoutes = require('./controllers/Admin');
const certRoutes = require('./controllers/Cert');



Router.use('/livecopyadmin', adminRoutes);
Router.use('/livecopycert', certRoutes);


module.exports = Router;
