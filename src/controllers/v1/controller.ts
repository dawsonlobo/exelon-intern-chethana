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
    res.status (500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
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
    const {cities } = req.body;

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
  const { pagination = {}, filter = {}, sort = {}, projection = {}, id } = req.body;
  const search: string = req.query.search as string || "";
  const searchFields: string[] = Array.isArray(req.query.searchFields) ? req.query.searchFields as string[] : [];

  const isStartsWith = req.query.startsWith === "true";
  const isEndsWith = req.query.endsWith === "true";

  // Ensure pagination values are numbers
  const page = Number(pagination.page) || 1;
  const limit = Number(pagination.limit) || 10;

  const query: Record<string, any> = {};
  const options: Record<string, any> = { skip: (page - 1) * limit, limit };

  try {
    if (id) query._id = id;

    // ===== Filtering =====
    if (filter && typeof filter === 'object') {
      const filterQuery: any = { $and: [] };
      Object.entries(filter).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          const conditions = values.map(value => ({
            [key]: isNaN(Number(value)) ? { $regex: new RegExp(value, "i") } : Number(value),
          }));
          filterQuery.$and.push({ $or: conditions });
        }
      });
      if (filterQuery.$and.length > 0) Object.assign(query, filterQuery);
    }


// ===== Search =====
if (search && searchFields.length > 0) {
  const searchQuery: Record<string, any> = { $or: [] };

  searchFields.forEach((field: string) => {
    const schemaType = City.schema.paths[field]?.instance;

    // Construct regex pattern based on startsWith and endsWith
    let regexPattern = search;

    if (isStartsWith && isEndsWith) {
      regexPattern = `^${search}$`; // Exact match
    } else if (isStartsWith) {
      regexPattern = `^${search}`; // Starts with search term
    } else if (isEndsWith) {
      regexPattern = `${search}$`; // Ends with search term
    }

    if (schemaType === "Number" && !isNaN(Number(search))) {
      // Convert the numeric field to a string and apply the regex pattern
      searchQuery.$or.push({ [field]: { $regex: regexPattern, $options: "i" } });
    } else {
      // Apply the regex pattern directly for string fields
      searchQuery.$or.push({ [field]: { $regex: regexPattern, $options: "i" } });
    }
  });

  // Merge search query with existing filters
  query.$and = query.$and ? [...query.$and, searchQuery] : [searchQuery];
}
    // ===== Sorting =====
    const sortOptions: Record<string, 1 | -1> = {};

    if (Array.isArray(sort.sortBy) && Array.isArray(sort.sortDesc)) {
      sort.sortBy.forEach((field: string, index: number) => {
        sortOptions[field] = sort.sortDesc[index] ? -1 : 1;
      });
    }


    // ===== Projection =====
    const projectionFields: Record<string, number> | null =
    typeof projection === "object" && projection !== null
      ? Object.fromEntries(
          Object.entries(projection).map(([key, value]) => [
            key,
            value === 1 ? 1 : 0, // Ensure strict 1 or 0 values
          ])
        )
      : null;
  
  if (projectionFields) {
    const hasInclusion = Object.values(projectionFields).includes(1);
    const hasExclusion = Object.values(projectionFields).includes(0);
  
    if (hasInclusion && hasExclusion) {
      // MongoDB doesn't allow mixed projection, so keep only inclusions
      for (const key in projectionFields) {
        if (projectionFields[key] === 0) delete projectionFields[key];
      }
    }
  }
  
  console.log("Processed Projection Fields:", projectionFields);
  

    // ===== Execute Query =====
    const foundCities = await City.find(query, projectionFields ?? {})
  .sort(sortOptions) // MongoDB expects an object like { name: -1 }
  .skip((page - 1) * limit) // Pagination: Skip previous pages
  .limit(limit); // Limit per page

    const totalCount = await City.countDocuments(query);

    if (foundCities.length === 0) {
        res.status(404).json({
        status: 404,
        message: "No matching cities found",
        data: { totalCount: 0, tableData: [] },
      });
    }

    res.status(200).json({
      status: 200,
      message: "Success",
      data: { totalCount, tableData: foundCities },
    });


  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
}
