import bcrypt from "bcrypt"

export const hashPassword = async (password) =>{
    try {
        const hashedPassord = await bcrypt.hash(password,10);
        return hashedPassord
    } catch (error) {
        console.log("Error while Hashing password")
        throw error
    }
}
export const comparePassword = async (password,orgPassword)=>{
    try {
        const isMatch = await bcrypt.compare(password,orgPassword)
        return isMatch 
    } catch (error) {
        console.log("Error in comparing password")
        throw error
    }
}
