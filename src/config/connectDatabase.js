import mongoose from "mongoose";


//============ connection of mongodb using mongoose =================//
const connectMongodb  = async()=>{
    try{
        const url = process.env.DB_URL+"/threeDPrinting"
        await mongoose.connect(url, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log("mongodb connect sucessfully!")


    }catch(error){
        console.log("error connecting mongodb!", error);
    }
}

export default connectMongodb;