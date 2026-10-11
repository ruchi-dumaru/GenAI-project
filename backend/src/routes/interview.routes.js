const express=require("express");
const authMiddleware= require("../middlewares/auth.middleware")
const interviewRouter=express.Router()
const interviewCtrl=require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")
/****
 * @route post/api/interview
 * @description generate new interview report on the basis of user self description,resume pdf and job description
 * @access private 
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewCtrl.generateInterviewReportController)

module.exports= interviewRouter