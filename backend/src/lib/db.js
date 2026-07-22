import mongoose from "mongoose"

export async function connectDB(){
    try{
        const mongo_uri = process.env.MONGO_URL
        if(!mongo_uri){
            throw new Error("mongo uri is required")
        }
        const conn = await mongoose.connect(mongo_uri)
        console.log("MongoDB is connected",conn.connection.host);
    }catch(err){
        console.log("error in connecting to mongo: ",err.message)
        process.exit(1)
    }
}