import mongoose from "mongoose";


const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Database Connection Successful")

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;