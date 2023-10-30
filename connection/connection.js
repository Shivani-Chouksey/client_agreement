
import mongoose from "mongoose";


export const connection = async () => {
  
    try {
        mongoose.set('strictQuery', false);
        // await mongoose.connect("mongodb://127.0.0.1:27017/vxd_agreement");
        await mongoose.connect("mongodb+srv://shivanichouksey1702:yfP3b7SyQVdkVpcd@cluster0.fqr3bsa.mongodb.net/?retryWrites=true&w=majority");
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }

    

}

connection();