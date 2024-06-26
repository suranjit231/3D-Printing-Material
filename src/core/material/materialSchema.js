import mongoose from "mongoose";

//====== validator function for checking is there is empty in required array
const arrayNotEmpty = (arr) => {
    return arr && arr.length > 0 && arr.every(element => !!element.trim())
  };
//=============== database schema for material ============//
const materialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    technology:{
        type:String,
        enum:["FDM","SLA", "SLS"],
        required:true,
    },

    colors:{
        type:[String],
        validate: [arrayNotEmpty, 'At least one color is required.'],
        required:true
    },

    pricePerGram:{
        type:Number,
        required:true
    },

    applicationTypes:{ 
        type: [String],
        validate: [arrayNotEmpty, 'At least one application type is required.'], 
        required: true 
    },

    imageUrl:{
        type:String,
        required:true,
    }

}, {timestamps:true})

const materialModel = mongoose.model("Material", materialSchema);
export default materialModel;