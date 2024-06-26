import MaterialRepository from "./material.repository.js";
import { AppError } from "../../middleware/errorHandler.js";

//================ a controller class containes all the methods related handle request and give response ======//
export default class MaterialController {
  constructor() {
    this.materialRepository = new MaterialRepository();
  }

  //====== controller methods for add a new material =======//
  async addNewMaterial(req, res, next) {
    try {
      const { name, technology, colors, pricePerGram, applicationTypes, imageUrl } = req.body;

      if (!name || !technology || !colors || !pricePerGram || !applicationTypes || !imageUrl) {
        throw new AppError('All fields are required: name, technology, colors, pricePerGram, applicationTypes, imageUrl', 400);
      }

      const colorsArray = colors.split(",").map(color => color.trim());
      const applicationTypeArray = applicationTypes.split(",").map(color => color.trim());
      //----------- call the repositrory methods for save the material in database ----------//
      const result = await this.materialRepository.addMaterial({
        name,
        technology,
        colors:colorsArray,
        pricePerGram: Number(pricePerGram),
        applicationTypes:applicationTypeArray,
        imageUrl,
      });

      //---- if sucess then return sucess response ---//
      if (result.success) {
        return res.status(201).json(result);
      } else {
        //---- throw error for faild to save in database ---//
        throw new AppError('Failed to add material', 404);
      }
    } catch (error) {
      //---- call next middleware to handle error ----//
      next(error);
    }
  }

  //=========== get all material controller =============//
  async getAllMaterial(req,res,next){
    try{
      const result = await this.materialRepository.getAllMaterial();
      if(result.success){
        res.status(200).json(result);
      }

    }catch(error){
      next(error);
    }
  }


  //========= get One material controller ===============//
  async getOneMaterial(req,res,next){
      try{

        //------ get id from req params and call repository to get the material ---//
        const materialId = req.params.materialId;
        const result = await this.materialRepository.getOneMaterial(materialId);
        if(result.success){
          return res.status(200).json(result);
        }

      }catch(error){
        next(error);
      }
  }



  //============= controller from delete a material from database -----//
  async deleteMaterial(req,res,next){
    try{

      //----- get matrial id from req params ---------//
      const materialId = req.params.materialId;
      //----- call repository for delete the material --//
      const result = await this.materialRepository.deleteMaterial(materialId);
      if(result.success){
        return res.status(200).json(result);
      }else{
        throw new AppError("faild to delete the material", 404);
      }

    }catch(error){
       //---- call next middleware to handle error ----//
      next(error)
    }
  }


  //========= update material =============//
  async updateMaterial(req,res,next){
    try{
      const materialId = req.params.materialId;
      const result =await this.materialRepository.updateMaterial(req, materialId);
      console.log("result in update controller: ", result);
      if(result.success){
        return res.status(200).json(result);
      }

    }catch(error){
       //---- call next middleware to handle error ----//
      next(error);
    }
  }
}