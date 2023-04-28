const express = require('express');
const verifyToken = require('../middlewares/auth');
const router = express.Router();
const getUser = require('../controllers/getUser');
const getUserById = require('../controllers/getUserById');
const HandlingFriendlyrequests = require('../controllers/HandlingFriendlyrequests');
const contactMe =  require('../controllers/contactMe');

router.get('/getUser', verifyToken, getUser);
router.get('/getU/:id', verifyToken, getUserById);
router.get('/HandlingFriendlyrequests/:id', verifyToken, HandlingFriendlyrequests);
router.post('/contactMe', verifyToken, contactMe);






module.exports = router;