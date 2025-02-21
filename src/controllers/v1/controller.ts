import { NextFunction, Request, Response } from 'express';
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
// Handle city actions


export async function handleCityActions(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Destructure nested parameters from the request body
  const { 
    pagination = {}, 
    filter = {}, 
    sort = '', 
    search = '', 
    searchFields = [], // optional: fields to search in (e.g., ["name", "area", "population"])
    projection = '', 
    id 
  } = req.body;
  
  // Extract page and limit from the nested pagination object with defaults
  const { page = '1', limit = '10' } = pagination;
  
  const query: Record<string, any> = {};
  const options: Record<string, any> = {};

  try {
    // If a specific city ID is provided, query by _id
    if (id) query._id = id;

    // ===== Dynamic Filtering =====
    // Expecting 'filter' to be an object where each key maps to an array of values.
    if (filter && typeof filter === 'object') {
      const filterQuery: any = { $and: [] };
      Object.entries(filter).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          // Build an array of conditions for this key
          const conditions = values.map(value => ({
            [key]: isNaN(Number(value))
              ? { $regex: new RegExp(value, "i") }  // For string values, use case-insensitive regex
              : Number(value)                        // For numeric values, match exactly
          }));
          filterQuery.$and.push({ $or: conditions });
        }
      });
      if (filterQuery.$and.length > 0) {
        Object.assign(query, filterQuery);
      }
    }
// ===== Search =====
// If a search string is provided and we're in search-only mode,
// perform three separate queries for exact, starts with, and ends with matches,
// then return the result in the desired format.
if (search) {
  // Use provided searchFields or default to ["name"]
  const fieldsToSearch = (Array.isArray(searchFields) && searchFields.length > 0) ? searchFields : ["name"];
  
  // Build the exact match query for all specified fields
  const exactQuery = {
    $or: fieldsToSearch.map(field => {
      if (City.schema.paths[field] && City.schema.paths[field].instance === "Number") {
        return {
          $expr: {
            $regexMatch: {
              input: { $toString: `$${field}` },
              regex: `^${search}$`,
              options: 'i'
            }
          }
        };
      } else {
        return { [field]: { $regex: `^${search}$`, $options: 'i' } };
      }
    })
  };

  // Build the "starts with" query for all specified fields
  const startsWithQuery = {
    $or: fieldsToSearch.map(field => {
      if (City.schema.paths[field] && City.schema.paths[field].instance === "Number") {
        return {
          $expr: {
            $regexMatch: {
              input: { $toString: `$${field}` },
              regex: `^${search}`,
              options: 'i'
            }
          }
        };
      } else {
        return { [field]: { $regex: `^${search}`, $options: 'i' } };
      }
    })
  };

  // Build the "ends with" query for all specified fields
  const endsWithQuery = {
    $or: fieldsToSearch.map(field => {
      if (City.schema.paths[field] && City.schema.paths[field].instance === "Number") {
        return {
          $expr: {
            $regexMatch: {
              input: { $toString: `$${field}` },
              regex: `${search}$`,
              options: 'i'
            }
          }
        };
      } else {
        return { [field]: { $regex: `${search}$`, $options: 'i' } };
      }
    })
  };

  // Run the queries
  
  const startsWithCount = await City.countDocuments(startsWithQuery);
  const endsWithCount = await City.countDocuments(endsWithQuery);

  // Return the search result in the standard format
  res.json({
    search: [
      {
        term: search,
        fields: fieldsToSearch,
       
        startsWith: startsWithCount > 0,
        endsWith: endsWithCount > 0
      }
    ]
  });
  return;
}


    // ===== Projection =====
    // Build projection options from a comma-separated list.
    // Use "-field" (e.g., "-population") to exclude a field; otherwise, include the field.
    if (projection) {
      options.projection = projection.split(',').reduce((acc: Record<string, number>, field: string) => {
        const trimmedField = field.trim();
        acc[trimmedField.startsWith('-') ? trimmedField.slice(1) : trimmedField] =
          trimmedField.startsWith('-') ? 0 : 1;
        return acc;
      }, {});
    }

    // ===== Sorting =====
    // Expects a format like "name:asc" or "name:desc"
    if (sort) {
      const [key, order] = sort.split(':');
      options.sort = { [key]: order === 'desc' ? -1 : 1 };
    }

    // ===== Pagination =====
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute the query with pagination, sort, and projection options
    const cities = await City.find(query, options.projection)
                              .skip(skip)
                              .limit(parseInt(limit))
                              .sort(options.sort);
    const totalCities = await City.countDocuments(query);

    // Return response in standard format:
    // {
    //   "status": 200,
    //   "message": "Success",
    //   "data": {
    //      "totalCount": <totalCities>,
    //      "tableData": [ ...cities ]
    //   }
    // }
    res.json({
      status: 200,
      message: "Success",
      data: {
        totalCount: totalCities,
        tableData: cities
      }
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Error fetching cities. Please try again later.', message: errorMessage });
  }
}
