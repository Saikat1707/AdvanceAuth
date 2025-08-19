import express from "express"
import {mailVerification, resendOtp, userSignUp} from "../controller/user.controller.js"
import { validateToken } from "../utils/tokens.js"
const userRoutes = express.Router()

userRoutes.post('/signup',userSignUp)
userRoutes.post('/otp',validateToken,mailVerification)
userRoutes.get('/otp/resend',validateToken,resendOtp)

export default userRoutes