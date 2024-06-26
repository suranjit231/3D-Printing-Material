import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectMongodb from "./src/config/connectDatabase.js";
import cors from "cors";
import materialRoutes from "./src/core/material/material.routes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import swagger from "swagger-ui-express";
import apiDocs from './swagger.js';


//===== creating server and used middleware to parse request body ====//
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//============ swagger documentation api===============//
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//===== setup routes for material if req url start with (/api/material) redirect to materialRoutes ===//
app.use("/api/material", materialRoutes);


//---- root routes redirect to swagger docs ---//
app.get("/", (req, res) => {
  return res.redirect("/api-docs");
});

//---- handle undefined routes ----//
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Path not found. Please refer to our API documentation at /api-docs.`
  });
});

//===== Global error handler ====//
app.use(errorHandler); 

//====== setup and listen for port ===//
const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectMongodb(); //-- call connect mongodb for database connection ---//
});
