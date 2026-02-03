const express = require('express');
const router = express.Router();
const {registerUser, loginUser , getProfile, logout} = require('../Controllers/authController');
const isLoggedIn = require('../middleware/isLoggedIn');


//Registering a user
router.post('/register', registerUser);

//Logging in a user
router.post('/login', loginUser);

//profile of a user
router.get('/me', isLoggedIn, getProfile);

//logout route
router.delete('/logout', logout);


module.exports = router;