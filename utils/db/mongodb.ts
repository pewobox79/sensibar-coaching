
import mongoose from "mongoose";
const uri = "mongodb+srv://admin:f2tJSTJtLvLVKE8p@sensibardb.5z5st.mongodb.net/sensibarDatabase?retryWrites=true&w=majority&appName=SensibarDB";

export async function connectMongoDB() {

    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri);
        return await mongoose.connection.db?.admin().command({ ping: 1 });

    }catch(e){

        console.log("connection error", e)
    }
}