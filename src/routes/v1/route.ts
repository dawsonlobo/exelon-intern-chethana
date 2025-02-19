import express from 'express';
import { validateCity } from '../../middleware/validateCity';
import { 
  getAllCities, 
  getCity, 
  createCity, 
  getTotalPopulationByCity,
  getCityWithMinPopulation,
  getCitiesSortedByPopulation,
  getAveragePopulation,
  updateCity, 
  deleteCity,
  createCities,
  updateCityByName,
  deleteCities // Import the deleteCities function
} from '../../controllers/v1/controller';

const router = express.Router();

// Define the routes for city management

router.get('/city', async (req, res) => {
  try {
    await getAllCities(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.get('/city/total-population', async (req, res) => {
  try {
    await getTotalPopulationByCity(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.get('/city/min-population', async (req, res) => {
  try {
    await getCityWithMinPopulation(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.get('/city/sorted-population', async (req, res) => {
  try {
    await getCitiesSortedByPopulation(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.get('/city/average-population', async (req, res) => {
  try {
    await getAveragePopulation(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.get('/city/:id', async (req, res) => {
  try {
    await getCity(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.post('/city', validateCity, async (req, res) => {
  try {
    await createCity(req, res);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.post('/cities', validateCity, async (req, res) => {
  try {
    await createCities(req, res);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});



// Update a city by ID
router.put('/city/:id', async (req, res) => {
  try {
    await updateCity(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

// Update a city by name
router.put('/city/name/:name', async (req, res) => {
  try {
    await updateCityByName(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

// Delete a city by ID
router.delete('/city/:id', async (req, res) => {
  try {
    await deleteCity(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

// Delete multiple cities
router.delete('/cities', async (req, res) => {
  try {
    await deleteCities(req, res); // Call the async controller function
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

export default router;