import { Request, Response, NextFunction } from 'express';

export const validateCity = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Incoming request body:", req.body); // Debugging log

  let cities = req.body.cities; // Try extracting `cities` array
 

  // If the request is a single object instead of an array, convert it to an array
  if (!Array.isArray(cities)) {
    if (typeof req.body === "object" && req.body !== null) {
      cities = [req.body]; // Wrap single city object into an array
    } else {
      res.status(400).json({ message: "Invalid request format. Expected a city object or an array of cities." });
      return;
    }
  }


  if (cities.length === 0) {
    res.status(400).json({ message: "Request body must be a non-empty array of cities" });
    return;
  }

  


  for (const city of cities) {
    console.log("Processing city:", city); // Debugging log

    const { name, population, area } = city;

    if (!name || population === undefined || area === undefined) {
      res.status(400).json({ message: `Missing required fields in: ${JSON.stringify(city)}` });
      return;
    }

    if (typeof population !== 'number' || typeof area !== 'number') {
      res.status(400).json({ message: "Population and area must be numbers" });
      return;
    }
  }

  next(); // Proceed if all cities are valid
};
