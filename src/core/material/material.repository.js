import mongoose from "mongoose";
import materialModel from "./materialSchema.js";
import { AppError } from "../../middleware/errorHandler.js";
import s3 from "../../config/awsConfig.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { handleFileUpload, deleteFileFromS3 } from "../../utils/handleFileUpdate.js";


//======== a repository class which contains all the methods related to material database operaltion =======//
export default class MaterialRepository{

    //========= add new material to database ===========//
    async addMaterial(materialData){
        try{
            const newMaterial = new materialModel(materialData);
            const saveMaterial =await newMaterial.save();
            return {success:true, message:"Material added successfully", materal:saveMaterial};

        }catch(error){
           // console.log("error addMaterial in repositry: ", error);
            throw error;
        }
    }

    
    //======= get all material data except their image url ======//
    async getAllMaterial() {
        try {
            const materials = await materialModel.find().select('-imageUrl');
            return { success: true, message: `Total material: ${materials.length}`, materials };
        } catch (error) {
            throw error;
        }
    }

    //======== get one material from the database =======//
    async getOneMaterial(materialId){
        try{

            //--- call database to find material ----//
            const materal = await materialModel.findById(materialId);

            //--- if not found throw error ----//
            if(!materal){
                throw new AppError("Material not found!", 400);
            }
            //---- return success response ----//
            return {success:true, message:"Material found sucessfull!", materal};

        }catch(error){
            throw error;
        }
    }

    //======== delete a material from database ==========//
    async deleteMaterial(materialId){
        try{

            //--- find the material from database ---//
            const materal = await materialModel.findById(materialId);
            console.log("material: ", materal);
            if(!materal){
                throw new AppError("Material not found!", 400);
            }

            //--- extract aws matching key from database imageUrl---//
            const urlParts = materal.imageUrl.split('/');
            const key = urlParts[urlParts.length - 1]; //--- Get the last part of the URL
            console.log("Key extracted from URL:", key);

            //===== delete the image url from aws ========//
            const response = await s3.send(new DeleteObjectCommand({ Bucket:process.env.S3_BUCKET_NAME, Key:key }));
            
            await materialModel.deleteOne({_id:materal._id}); //-- last delete the material --//
            return {success:true, message:"Material delete sucessfully"};


        }catch(error){
            throw error;
        }
    }


    //=========== update material repository =============//
    async updateMaterial(req, materialId){
        try{

            //---- find material from database ---//
            const material = await materialModel.findById(materialId);
            if(!material){
                throw new AppError("material not found!", 400);
            }

            //---- if finds call handle upload for upload img in aws ---//
            const newImageUrl = await handleFileUpload(req);
            
            //--- check is there any img return by handleUpload 
            if (newImageUrl) {
                //--- if yes then delete old url from aws and new url save to database---//
                await deleteFileFromS3(material.imageUrl);
                req.body.imageUrl = newImageUrl;
            }

            //--- if colors for update in req.body then make it in array ---//
            if (req.body.colors) {
                req.body.colors = req.body.colors.split(",").map(color => color.trim());
            }

            //--- if applicationType for update in req.body then make it in array ---//
            if(req.body.applicationTypes){
                req.body.applicationTypes = req.body.applicationTypes.split(",").map(color => color.trim());
            }

            //---- update the material data by looping ---//
            for(let keys in req.body){
                    material[keys] = req.body[keys];
            }

            //---- save to db and return response ---//
           const savedMaterial= await material.save();
           return {success:true, message:"material update successfully!", material:savedMaterial}

        }catch(error){
            throw error;
        }
    }
}