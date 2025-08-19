import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../service/ModifyPassword.js"
import {badResponse,goodResponse} from "../utils/response.js"
import { sendVerificationCode } from "../utils/sendMail.js"
import { generateToken} from "../utils/tokens.js"

export const signUpDao = async (res,userName , email , password)=>{
    try {
        const isExist = await userModel.findOne({email})
        if(isExist && isExist.isVerified == false){
            await userModel.findByIdAndDelete(isExist._id)
            return badResponse(res,400,"User is unverified . Please register again from start")
        }

        if(isExist) return badResponse(res,400,"User already exist with this EMAIL")
        
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationExpireTime = Date.now() + 10 * 60 * 1000;

        const hashedPassord = await hashPassword(password)

        const createdUser = await userModel.create({
            userName,email,password:hashedPassord,verifiedToken:verificationCode,verificationExpireTime
        })

        await sendVerificationCode(createdUser.email,createdUser.userName,verificationCode);

        const token = generateToken(createdUser._id)
        res.cookie("token",token)

        return goodResponse(res,200,"Verification Token Send Successfully",createdUser)
    } catch (error) {
        return badResponse(res,400,`Error occured in Data Access`)
    }
}

export const verifyMail = async (req,res,otp)=>{
    try {
        const user = req.user

        if (!user) return badResponse(res, 400, "Error in finding user");

        if (!user.verifiedToken) {
            return badResponse(res, 400, "User does not have any OTP");
        }
        if(user.isVerified == true) return badResponse(res,400,"User already verified")
            
        if (user.verificationExpireTime && user.verificationExpireTime < Date.now()) {
            await userModel.findByIdAndDelete(user._id)
            res.cookie("token","")
            return badResponse(res, 400, "OTP has expired. Please request a new one.");
        }

        if (user.verifiedToken !== otp) {
            return badResponse(res, 400, "Invalid OTP. Please try again.");
        }

        user.isVerified = true;
        user.verifiedToken = null;
        user.verificationExpireTime = null;
        await user.save();

        return goodResponse(res, 200, "User verified successfully", user);

    } catch (error) {
        return badResponse(res,400,"Error occur in Data Access")
    }
}

export const loginDao = async (res,email,password) => {
    try {
        const isUserExist = await userModel.findOne({email})
        if(!isUserExist) return badResponse(res,400,"User does not exist with this email")

        const isMatch = await comparePassword(password,isUserExist.password)

        if(!isMatch) return badResponse(res,400,"Wrong log in Credentials")

        const token = generateToken(isUserExist._id)
        res.cookie("token",token)
        return goodResponse(res,200,"User Successfully signed in",isUserExist)
        
    } catch (error) {
        return badResponse(res,400,"Error in login data access")
    }
}