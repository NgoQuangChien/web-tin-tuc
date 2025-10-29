const authControllers = require('../controllers/authControllers');

const routes = require('express').Router();

// REGISTER USER
routes.post('/register', authControllers.registerUser);

// LOGIN USER
routes.post('/login', authControllers.loginUser);

// LOG OUT


module.exports = routes;