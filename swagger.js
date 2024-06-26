// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "description": "API's 3D Printing Material application",
    "title": "3D-PRINTING-MATERIAL"
  },
  "host": `localhost:${process.env.PORT}`,
  "paths": {
    "/api/material/addmaterial": {
      "post": {
        "tags": ["Material"],
        "summary": "Add material",
        "description": "Add a new material",
        "consumes": ["multipart/form-data"],
        "parameters": [
          {
            "in": "formData",
            "name": "name",
            "type": "string",
            "description": "Name of the material",
            "required": true
          },
          {
            "in": "formData",
            "name": "technology",
            "type": "string",
            "description": "Technology (FDM/SLA/SLS)",
            "required": true,
            "enum": ["FDM", "SLA", "SLS"]
          },
          {
            "in": "formData",
            "name": "colors",
            "type": "string",
            "description": "Colors (comma separated values)",
            "required": true
          },
          {
            "in": "formData",
            "name": "pricePerGram",
            "type": "number",
            "description": "Price per gram",
            "required": true
          },
          {
            "in": "formData",
            "name": "applicationTypes",
            "type": "array",
            "description": "Application types",
            "required": true,
            "items": {
              "type": "string"
            }
          },
          {
            "in": "formData",
            "name": "file",
            "type": "file",
            "description": "Image file",
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "Material added successfully",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "message": {
                  "type": "string"
                },
                "material": {
                  "type": "object"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input data"
          }
        }
      }
    },
    "/api/material": {
      "get": {
        "tags": ["Material"],
        "summary": "Get all materials",
        "description": "Retrieve all materials",
        "responses": {
          "200": {
            "description": "Materials found",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "message": {
                  "type": "string"
                },
                "materials": {
                  "type": "array",
                  "items": {
                    "type": "object"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/material/{materialId}": {
      "get": {
        "tags": ["Material"],
        "summary": "Get one material",
        "description": "Retrieve one material by ID",
        "parameters": [
          {
            "in": "path",
            "name": "materialId",
            "type": "string",
            "required": true,
            "description": "ID of the material"
          }
        ],
        "responses": {
          "200": {
            "description": "Material found",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "message": {
                  "type": "string"
                },
                "material": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    },
    "/api/material/deleteMaterial/{materialId}": {
      "delete": {
        "tags": ["Material"],
        "summary": "Delete material",
        "description": "Delete material by ID",
        "parameters": [
          {
            "in": "path",
            "name": "materialId",
            "type": "string",
            "required": true,
            "description": "ID of the material to delete"
          }
        ],
        "responses": {
          "200": {
            "description": "Material deleted successfully",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/material/updateMaterial/{materialId}": {
      "put": {
        "tags": ["Material"],
        "summary": "Update material",
        "description": "Update material by ID. All fields are optional.",
        "parameters": [
          {
            "in": "path",
            "name": "materialId",
            "type": "string",
            "required": true,
            "description": "ID of the material to update"
          },
          {
            "in": "formData",
            "name": "name",
            "type": "string",
            "description": "Name of the material",
            "required": false
          },
          {
            "in": "formData",
            "name": "technology",
            "type": "string",
            "description": "Technology (FDM/SLA/SLS)",
            "required": false,
            "enum": ["FDM", "SLA", "SLS"]
          },
          {
            "in": "formData",
            "name": "colors",
            "type": "string",
            "description": "Colors (comma separated values)",
            "required": false
          },
          {
            "in": "formData",
            "name": "pricePerGram",
            "type": "number",
            "description": "Price per gram",
            "required": false
          },
          {
            "in": "formData",
            "name": "applicationTypes",
            "type": "array",
            "description": "Application types",
            "required": false,
            "items": {
              "type": "string"
            }
          },
          {
            "in": "formData",
            "name": "file",
            "type": "file",
            "description": "Image file",
            "required": false
          }
        ],
        "responses": {
          "200": {
            "description": "Material updated successfully",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "message": {
                  "type": "string"
                },
                "material": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerDocument;
