const express = require('express');
const router = express.Router();

const {createUser, loginUser, verifyUser} = require('../controllers/userController');

// register
router.post('/register', createUser);

// login
router.post('/login', loginUser);

router.get('/verify-user', verifyUser);

module.exports = router; 