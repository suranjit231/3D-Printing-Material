
import multer from 'multer';
import s3 from '../config/awsConfig.js';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { AppError } from './errorHandler.js';

//----- Setting up multer to store files in memory --- //
const upload = multer({
  storage: multer.memoryStorage(),
});

//----- middleware to upload the file in aws ----------//
const fileUploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    const mimeType = req.file.mimetype;

    //------ parameter for aws s3 upload ---------//
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now().toString() + '-' + req.file.originalname,
      Body: req.file.buffer,
      ContentType: mimeType,
    };

    try {
      //---- create putObject commend for s3 upload ----//
      const command = new PutObjectCommand(params);
     const data= await s3.send(command);

     //---- create url manually helps in speed up upload instead of using getObjectCommond again ----//
      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      
      req.body.imageUrl = imageUrl; //-- add url in req body and call next middleware ---//

      next();
    } catch (s3Err) {
      next(new AppError('Failed to upload file to S3', 500));
    }
  });
};

export default fileUploadMiddleware;


