# 3D Printing Material

## Introduction

This project provides a set of APIs for managing 3D printing materials, including material addition, retrieval, update, and deletion. The application is built using Node.js and Express.js, with MongoDB as the database. It also incorporates AWS S3 for image storage.

## Important Notice
For detailed setup instructions and API testing, please refer to the "Setup" and "Swagger UI" sections below.

## Features

- **Material Addition**: Add new 3D printing materials with various attributes.
- **Material Retrieval**: Fetch details of all materials or a specific material.
- **Material Update**: Update attributes of existing materials.
- **Material Deletion**: Remove materials from the database.
- **Image Handling**: Upload and manage material images on AWS S3.

## Tech Stack

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing material data.
- **AWS S3**: Storage service for managing material images.

## Setup
1. Clone the repository: `git clone https://github.com/suranjit231/3D-Printing-Material.git`
2. Install dependencies using `npm install`.
3. Set up environment variables in `.env` file (PORT, DB_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME).
4. Start the server using `node server.js`.
5. Open the port at `localhost:PORT/api-docs` to test the application.
``
## Important env varialble need for setup
- PORT=3200
- DB_URL= (mongodb url)
- AWS_ACCESS_KEY_ID = ( The access key ID for your AWS account to allow programmatic access. )
- AWS_SECRET_ACCESS_KEY = ( The secret access key for your AWS account to allow programmatic access. )
- AWS_REGION = ( The AWS region where your S3 bucket is located. )
- S3_BUCKET_NAME = ( The name of your AWS S3 bucket where images will be stored. )
``
## AWS S3 Bucket Policy configuration sample
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:GetObjectAttributes"
            ],
            "Resource": "arn:aws:s3:::your_bucket_name/*"
        }
    ]
}
```

## API Endpoints

### Material Routes
- **POST /api/material/addmaterial**: Add new material (all filds are required )
  - Request body: `{ "name": "string", "technology": "FDM/SLA/SLS", "colors": "red, blue, black", "pricePerGram":"number", "pplicationTypes":[], file:"it is an image url"}`
  - Response: `{ "success": true, "message":"material added sucessfully", "material":"material" }`

- **GET /api/material**: Get all material
  - Request body: ( no parameter )
  - Response: `{ "success": true, "message": "material found", "materials":"materials" }`

- **GET /api/material/:materialId**: Get one material
  - Request params: `materialId`
  - Response: `{ "success": true, "message": "material found",  "material":"material" }`

- **DELETE /api/deleteMaterial/:materialId**: Delete material
  - Request params: `materialId`
  - Response: `{ "success": true, "message": "material deleted successfully"}`

- **POST /api/material/updateMaterial/:materialId**: Update material (all filds are optional )
  - Request body: `{ "name": "string", "technology": "FDM/SLA/SLS", "colors": "red, blue, black", "pricePerGram":"number", "pplicationTypes":[], file:"it is an image url"}`
  - Response: `{ "success": true, "message":"material updated sucessfully", "material":"material" }`


## 3D PRINING MATERIAL
```
##Root
|           |               
|           |               |-->awsConfig.js            
|           |---->config--->|-->connectDatabase.js
|           |                            
|           |
|--->src--->|                          
|           |                            |-->material.controller.js 
|           |               |            |-->material.repository.js
|           |---->core----> |->material->|-->material.routes.js              
|           |               |            |-->materialSchema.js  
|           |                           
|           |                                                                                                       
|           |              
|           |-->middleware->|-->errorHandler.js
|           |               |-->fileUpload.middleware.js
|           |               
|           |
|           |               
|           |---->utils---->|-->handleFileUpload.js
|           |               
|           |
|
|
|-->.env
|-->package.lock.json
|-->package.json
|-->node_module
|-->README.md
|-->server.js
|-->swagger.js
```
