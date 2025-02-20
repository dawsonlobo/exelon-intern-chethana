import { Request, Response } from 'express';
import City, { ICity } from "../../models/v1/city";

// Get all cities
export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await City.find(); // Fetch all cities from the database

    if (cities.length === 0) {
      return res.status(404).json({ message: 'No cities found' });
    }

    res.status(200).json(cities); // Return all the cities in the response
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Get the total population of all cities
export const getTotalPopulationByCity = async (req: Request, res: Response) => {
  try {
    const result = await City.aggregate([
      { $group: { _id: '$name', totalPopulation: { $sum: '$population' } } }
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Get the city with the minimum population
export const getCityWithMinPopulation = async (req: Request, res: Response) => {
  try {
    const result = await City.aggregate([
      { $sort: { population: 1 } }, // Sort cities by population in ascending order
      { $limit: 1 } // Get only the city with the smallest population
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No cities found' });
    }

    res.status(200).json(result[0]); // Return the city with the minimum population
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Get cities sorted by population
export const getCitiesSortedByPopulation = async (req: Request, res: Response) => {
  try {
    const result = await City.aggregate([{ $sort: { population: -1 } }]); // Sort cities by population in descending order
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Get the average population of all cities
export const getAveragePopulation = async (req: Request, res: Response) => {
  try {
    const result = await City.aggregate([
      { $group: { _id: null, avgPopulation: { $avg: '$population' } } }
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'No cities found' });
    }
    res.status(200).json({ avgPopulation: result[0].avgPopulation });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Get a city by ID
export const getCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = await City.findOne({ id: id });

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(city);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Create a single city
const getNextCityId = async (): Promise<number> => {
  const lastCity = await City.findOne().sort({ id: -1 }).exec();
  return lastCity ? Number(lastCity.id) + 1 : 1;
};

// Create a single city
export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, population, area } = req.body;
    
    const id = await getNextCityId(); // Ensure cityId is assigned
    
    const newCity = new City({ id, name, population, area }); 
    await newCity.save();
    res.status(201).json(newCity);
  } catch (err) {
    
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Create multiple cities
export const createCities = async (req: Request, res: Response) => {
  try {
    const cities: { name: string; population: number; area: number }[] = req.body;

    if (!Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ message: "Request body must be a non-empty array of cities" });
    }

    // Fetch the last ID once and increment manually
    let lastCity = await City.findOne().sort({ id: -1 }).exec();
    let nextId = lastCity ? Number(lastCity.id) + 1 : 1;

    const newCities = cities.map((city) => {
      return { id: nextId++, ...city }; // Assign an incremented ID
    });

    const insertedCities = await City.insertMany(newCities);

    res.status(201).json(insertedCities);
  } catch (err) {
    console.error("Error inserting cities:", err);
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
};


// Update a city by ID
export const updateCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, population, area } = req.body;

    const updatedCity = await City.findOneAndUpdate({ id: id }, { name, population, area }, { new: true });

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(updatedCity);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Update a city by name
export const updateCityByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { population, area } = req.body;

    const updatedCity = await City.findOneAndUpdate({ name }, { population, area }, { new: true });

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(updatedCity);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// Delete a city by ID
export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findOneAndDelete({ id: id });

    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'City deleted successfully', deletedCity });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};
export const deleteCities = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!Array.isArray(id) || id.length === 0) {
      return res.status(400).json({ message: "id must be a non-empty array" });
    }

    const result = await City.deleteMany({ id: { $in: id } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No cities found with the provided IDs" });
    }

    res.status(200).json({ message: `${result.deletedCount} cities deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
  }
};

export const filterCities = async (req: Request, res: Response) => {
  try {
    const filterFields = req.body; // Extract user-provided filters

    if (Object.keys(filterFields).length === 0) {
      return res.status(400).json({ message: "At least one field is required." });
    }

    let projection: any = {};
    let hasInclude = false;
    let hasExclude = false;

    // Determine whether we are including or excluding fields
    Object.entries(filterFields).forEach(([key, value]) => {
      if (value === 1) {
        hasInclude = true;
      } else if (value === 0) {
        hasExclude = true;
      }
    });

    if (hasInclude && hasExclude) {
      // If both 1 and 0 exist, strictly include only the `1` fields
      Object.entries(filterFields).forEach(([key, value]) => {
        if (value === 1) {
          projection[key] = 1;
        }
      });
    } else {
      // Otherwise, apply inclusion or exclusion as needed
      Object.entries(filterFields).forEach(([key, value]) => {
        projection[key] = value === 1 ? 1 : 0;
      });
    }

    // Always hide `_id` field
    projection._id = 0;

    // Fetch cities using aggregation
    const cities = await City.aggregate([{ $project: projection }]);

    res.status(200).json(cities);
  } catch (error) {
    console.error("Error filtering cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const filterCityByKey = async (req: Request, res: Response) => {
  try {
    const filterCriteria = req.body; // Accepts dynamic fields

    if (!filterCriteria || typeof filterCriteria !== "object") {
      return res.status(400).json({ message: "Invalid request format. Provide an object with fields to filter." });
    }

    // Construct the dynamic match filter
    const matchQuery: any = { $and: [] };

    Object.entries(filterCriteria).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        const regexConditions = values.map(value => ({
          [key]: isNaN(Number(value)) // Check if it's a number
            ? { $regex: new RegExp(value, "i") } // Case-insensitive regex for strings
            : Number(value), // Convert to number if applicable
        }));

        matchQuery.$and.push({ $or: regexConditions });
      }
    });

    // Handle case where no filters are provided
    if (matchQuery.$and.length === 0) {
      return res.status(400).json({ message: "No valid filter criteria provided." });
    }

    // MongoDB Aggregation to filter dynamically
    const cities = await City.aggregate([
      { $match: matchQuery },
      { $project: { _id: 0 } } // Exclude MongoDB _id field
    ]);

    res.status(200).json(cities);
  } catch (error) {
    console.error("Error filtering cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCitiesWithPagination = async (req: Request, res: Response) => {
  try {
    const { page = 1, itemsPerPage = 10 } = req.body;

    // Convert to integers
    const pageNumber = Math.max(1, parseInt(page as any, 10));
    const limit = Math.max(1, parseInt(itemsPerPage as any, 10));
    const skip = (pageNumber - 1) * limit;

    // Get total count of cities (without pagination)
    const totalItems = await City.countDocuments();

    // Fetch paginated data
    const cities = await City.find().skip(skip).limit(limit).select("-_id"); // Exclude _id

    // Construct response
    res.status(200).json({
      status: 200,
      message: "Success",
      data: {
        tableCount: totalItems, // Total documents in the collection
        tableData: cities
  
      }
    });
  } catch (error) {
    console.error("Error fetching paginated cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



