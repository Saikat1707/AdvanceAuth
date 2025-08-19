import mongoose  from "mongoose"

const DBconnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`DB connected successfuly with : ${process.env.MONGO_URI}`)
    } catch (error) {
        console.log(`Error in DB connection : ${error}`)
    }
}

export default DBconnection