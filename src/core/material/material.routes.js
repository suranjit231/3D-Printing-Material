// fileUpload.routes.js
import express from 'express';
import fileUploadMiddleware from '../../middleware/fileUpload.middleware.js';
import MaterialController from './material.controller.js';

const materialRoutes = express.Router();
const materialController = new MaterialController();


//======== routes for get all material ===================//
materialRoutes.get("/", (req,res,next)=>{
  materialController.getAllMaterial(req,res,next);
})

//======== routes for get one material by id ================//
materialRoutes.get("/:materialId", (req,res,next)=>{
  materialController.getOneMaterial(req,res,next);
})


 //======== routes for add a mew material ================//
materialRoutes.post('/addmaterial', fileUploadMiddleware, (req, res, next) => {

  materialController.addNewMaterial(req, res, next);
});

//========= routes delete a material ====================//
materialRoutes.delete("/deleteMaterial/:materialId", (req,res,next)=>{
  materialController.deleteMaterial(req,res,next);
})


//========= routes for update a material ===============//
materialRoutes.put("/updateMaterial/:materialId", (req,res,next)=>{
  materialController.updateMaterial(req,res,next);
})

export default materialRoutes;
