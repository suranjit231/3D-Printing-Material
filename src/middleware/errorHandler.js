import multer from 'multer';
import mongoose from 'mongoose';

//====== Custom error class extending the built-in Error class =====//
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

//------ middleware for handle errror --------//
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  //-- handle multer upload error -----//
  if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = `Multer Error: ${err.message}`;

  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    //--- Custom handling for Mongoose validation errors ---//
    if (err.errors && err.errors['technology']) {
      message = `${err.errors['technology'].value} is not a valid technology.`;
    } else {
        
        for( let keys in err.errors){
            message = `${err.errors[keys].message}`;
        }
     
    }

  } else if (err.code === 11000) { //--- Mongoose duplicate key error
    statusCode = 400;
    message = 'Duplicate key error: A record with the provided key already exists.';
  } else if (err.code === 'AccessDenied') { //--- AWS permission error
    statusCode = 403;
    message = 'AWS Permission Error: Access denied.';

    //--- custom error made by us ----//
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
};

export { AppError, errorHandler };
