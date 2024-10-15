
import mongoose from "mongoose";
const uri = process.env.NEXT_PUBLIC_MONGODB_URI ? process.env.NEXT_PUBLIC_MONGODB_URI:""

export async function connectMongoDB() {

    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri);
        return await mongoose.connection.db?.admin().command({ ping: 1 });

    }catch(e){

        console.log("connection error", e)
    }
}