import express from "express"
import {getProfileDetails, mailVerification, resendOtp, userLogIn, userSignUp} from "../controller/user.controller.js"
import { validateToken } from "../utils/tokens.js"
const userRoutes = express.Router()

userRoutes.post('/signup',userSignUp)
userRoutes.post('/signin',userLogIn)
userRoutes.post('/otp',validateToken,mailVerification)
userRoutes.get('/otp/resend',validateToken,resendOtp)

userRoutes.get('/profile',validateToken,getProfileDetails)

export default userRoutes