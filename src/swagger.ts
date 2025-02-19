import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express"; // Remove unused express import

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "City Management API",
    version: "1.0.0",
    description: "API documentation for the City Management system",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/v1/*.ts"], // Ensure your routes have JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at http://localhost:5000/api-docs");
};
