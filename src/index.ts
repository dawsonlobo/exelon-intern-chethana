import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import v1Routes from "./routes/v1/route"; // Import the versioned routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Load environment variables
dotenv.config();

// Ensure MONGO_URL is defined
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB Connected to exelon-city'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "City Management API",
      version: "1.0.0",
      description: "API documentation for City Management System",
    },
    servers: [
      {
        url: "http://localhost:" + PORT,
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/v1/*.ts"], // Path to route files for Swagger docs
};

// Initialize Swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register versioned routes
app.use("/api/v1", v1Routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
