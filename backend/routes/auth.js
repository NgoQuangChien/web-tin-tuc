const authControllers = require('../controllers/authControllers');

const routes = require('express').Router();

// REGISTER USER
routes.post('/register', authControllers.registerUser); // Tạo đường dẫn đăng ký người dùng

// LOGIN USER
routes.post('/login', authControllers.loginUser); // Tạo đường dẫn đăng nhập người dùng



module.exports = routes;