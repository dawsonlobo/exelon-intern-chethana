import { Request, Response } from "express";
import { City, ICity } from "../../models/v1/city"; // Import the City model
import { SortOrder } from 'mongoose';

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, filter, sort, search, projection } = req.query;

    const query: any = {};

    // Filter: Apply filter if provided
    if (filter) {
      try {
        const filterObj = JSON.parse(filter as string);
        Object.assign(query, filterObj);
      } catch (err) {
        return res.status(400).json({ message: "Invalid filter format" });
      }
    }

    // Search: Apply search if provided
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search by name
    }

    // Projection: Specify which fields to include or exclude
    let projectionFields = {};
    if (projection) {
      try {
        projectionFields = JSON.parse(projection as string);
      } catch (err) {
        return res.status(400).json({ message: "Invalid projection format" });
      }
    }

    // Sort: Apply sorting if provided
    let sortCriteria: { [key: string]: SortOrder } = { name: 1 }; // Default sort by name in ascending order
    if (sort) {
      try {
        sortCriteria = JSON.parse(sort as string);
        // Ensure it's a valid object for sorting
        if (!Object.values(sortCriteria).every((value) => value === 1 || value === -1)) {
          throw new Error("Invalid sort order. Use 1 for ascending or -1 for descending.");
        }
      } catch (err) {
        return res.status(400).json({ message: "Invalid sort format" });
      }
    }

    // Pagination: Apply pagination (skip and limit)
    const skip = (Number(page) - 1) * Number(limit);
    const limitVal = Number(limit);

    // Fetch cities with applied filters, sort, and pagination
    const cities = await City.find(query)
      .skip(skip)
      .limit(limitVal)
      .sort(sortCriteria)
      .select(projectionFields);

    // Get total count for pagination
    const totalCities = await City.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalCities / limitVal);

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalCities,
      totalPages,
      cities
    });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
  
};

// Get a city by ID
export const getCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = await City.findById(id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json(city);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
};

// Create a single city
export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, population, area } = req.body;

    if (!name || !population || !area) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCity = new City({ name, population, area });
    await newCity.save();

    res.status(201).json(newCity);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
};

// Create multiple cities
export const createCities = async (req: Request, res: Response) => {
  try {
    const newCities: ICity[] = req.body;

    if (!Array.isArray(newCities)) {
      return res.status(400).json({ message: "Request body should be an array of cities" });
    }

    const errors: string[] = [];
    const validCities: ICity[] = [];

    for (const city of newCities) {
      const { name, population, area } = city;

      if (!name || !population || !area) {
        errors.push(`City with name ${name} is missing required fields`);
      } else {
        validCities.push(new City({ name, population, area }));
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await City.insertMany(validCities);

    res.status(201).json({ addedCities: validCities });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
};

// Update a city by ID
export const updateCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, population, area } = req.body;

    const updatedCity = await City.findByIdAndUpdate(id, { name, population, area }, { new: true });

    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json(updatedCity);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
};

// Delete a city by ID
export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findByIdAndDelete(id);

    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully", deletedCity });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
};