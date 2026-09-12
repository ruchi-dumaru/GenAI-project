const express=require("express");
const authRouter=express.Router();
const authCtrl=require("../controllers/auth/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */


authRouter.post('/register',authCtrl.registerUser)


/**
 * @route POST /api/auth/login
 * @description Login a new user with email and password
 * @access Public
 */

authRouter.post('/login',authCtrl.loginUser)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add to blackList
 * @access Public
 */

authRouter.get('/logout',authCtrl.logoutUser)


/**
 * @route GET /api/auth/get-me
 * @description get current loggedIn user details
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authUser,authCtrl.getMe)

module.exports=authRouter;
