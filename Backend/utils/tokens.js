import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { badResponse } from "./response.js"
export const generateToken = (payload)=>{
    try {
        return jwt.sign({id: payload},process.env.JWT_SECRET,{expiresIn:"1d"})
    } catch (error) {
        console.log("error generating token : "+error)
        return null;
    }
}

export const validateToken = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token) return badResponse("No Token Found")

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return badResponse(res,400,"Misleading token")

        const currUser = await userModel.findById(decoded.id)
        if(!currUser) return badResponse(res,400,"User not found")

        req.user = currUser
        next()

    } catch (error) {
        console.log(error)
        return badResponse(res,400,"User is unauthorized")
    }
}