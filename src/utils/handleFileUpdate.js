import s3 from "../config/awsConfig.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';
import { AppError } from "../middleware/errorHandler.js";

//====== Setting up multer to store files in memory ====//
const upload = multer({
    storage: multer.memoryStorage(),
}).single('file');


//==== Function to handle file uploads to S3 ===========//
export const handleFileUpload = (req) => {
    return new Promise((resolve, reject) => {
        upload(req, null, async (err) => {   //--- Using multer to handle the file upload
            if (err) {
                console.log("error console: ", err);
                return reject(new AppError("File upload failed", 500));
            }

            if (!req.file) {
                return resolve(null);
            }

            try {
                 //----- Parameters for the S3 upload ----//
                const params = {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: Date.now().toString() + '-' + req.file.originalname,
                    Body: req.file.buffer,
                    ContentType: req.file.mimetype,
                };

                 //--- Creating a command to put the object in S3 ---//
                const command = new PutObjectCommand(params);
                await s3.send(command);

                //---- Constructing the new image URL creating url manually helps in speed up of upload instead for using getObject--------------//
                const newImageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
                resolve(newImageUrl);
            } catch (s3Err) {
                reject(new AppError('Failed to upload file to S3', 500));
            }
        });
    });
};


//======= delete file from aws ========//
export const deleteFileFromS3 = async (url) => {
    try {
        const key = url.split('/').pop(); //--- extract key from url ---//
        await s3.send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET_NAME, Key: key })); //--- delete file --//
    } catch (s3Err) {
        throw new AppError('Failed to delete file from S3', 500);
    }
};
