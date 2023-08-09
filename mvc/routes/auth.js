const express = require('express');

const authcontrollers = require('../controllers/auth-control');

const router = express.Router();

router.get('/signup', authcontrollers.getSignup);

router.get('/login', authcontrollers.getLogin);

router.post('/signup', authcontrollers.signup);

router.post('/login', authcontrollers.login);

router.post('/logout', authcontrollers.logout);

router.get('/401', authcontrollers.get401);

module.exports = router;
