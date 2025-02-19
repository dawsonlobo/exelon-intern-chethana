import { Request, Response, NextFunction } from 'express';

export const validateCity = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Incoming request body:", req.body); // Debugging log

  const cities = Array.isArray(req.body) ? req.body : [req.body]; // Handle single or multiple cities

  for (const city of cities) {
    console.log("Processing city:", city); // Debugging log

    const { name, population, area } = city;
    
    if (!name || population === undefined || area === undefined) {
      res.status(400).json({ message: `Missing required fields in: ${JSON.stringify(city)}` });
      return; // Ensure function stops after sending response
    }

    if (typeof population !== 'number' || typeof area !== 'number') {
      res.status(400).json({ message: "Population and area must be numbers" });
      return; // Stop execution after sending response
    }
  }

  next(); // Proceed only if all cities are valid
};
