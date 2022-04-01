const express = require('express');
const router = express.Router();

// import User controller
const userController = require('../users/user.controller');

// get All User list 
router.get("/",userController.getUserList);

router.post("/login",userController.checkLogin);

router.post("/mytickets",userController.myTickets);


router.post("/",userController.postUser);

module.exports=router;