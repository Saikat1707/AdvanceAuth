import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedToken: {
        type: String,
        default:""
    },
    verifiedTime: {
        type: Date,
        default: Date.now
    },
    verificationExpireTime:{
        type:Date,
        default: () => Date.now() + 10 * 60 * 1000
    }
});

const User = mongoose.model("User", userSchema);
export default User;
