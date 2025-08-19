import { loginDao, signUpDao, verifyMail } from "../DAO/User.js"
import userModel from "../models/userModel.js"
import {badResponse,goodResponse} from "../utils/response.js"
import { sendVerificationCode } from "../utils/sendMail.js"

export const userSignUp = async (req,res)=>{
    try {
        const {userName,email,password} = req.body
        if(!userName || !email || !password) return badResponse(res,400,"All fields are required")
        return signUpDao(res,userName,email,password)
    } catch (error) {
        return badResponse(res,400,"Error in User Sign Up ")
    }

}


export const mailVerification = async (req, res) => {
    try {

        const {otp } = req.body;
        return verifyMail(req,res,otp)

    } catch (error) {
        console.error(error);
        return badResponse(res, 500, "Server error during verification");
    }
};

export const resendOtp = async (req,res)=>{
    try {
        const user = req.user
        if(user.isVerified == true){
            return badResponse(res,400,"User already Verified")
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifiedToken = verificationCode
        user.verificationExpireTime = Date.now() + 10 * 60 * 1000;
        await user.save()
        await sendVerificationCode(user.email,user.userName,verificationCode)
        return goodResponse(res,200,"OTP sent successfully",user)

    } catch (error) {
        return badResponse(res,400,"Error in resent OTP")
    }
}

export const userLogIn = async (req,res)=>{
    try {
        const {email , password} = req.body
        if(!email || !password) return badResponse(res,400,"All fields are required")
        return loginDao(res,email,password)
    } catch (error) {
        return badResponse(res,400,"Error while logging in")
    }
    
}


export const getProfileDetails = async (req,res) =>{
    try {
        const user = req.user
        return goodResponse(res,200,"User Fetched Successfully",user)
    } catch (error) {
        return badResponse(res,400,"Error in fetching user details")
    }
}