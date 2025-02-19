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
  deleteCities
} from '../../controllers/v1/controller';

const router = express.Router();

/**
 * @swagger
 * /api/v1/city:
 *   get:
 *     summary: Get all cities
 *     description: Retrieve a list of all cities
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/city', async (req, res) => {
  try {
    await getAllCities(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/city/total-population:
 *   get:
 *     summary: Get total population by city
 *     description: Retrieve the total population for all cities combined
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/city/total-population', async (req, res) => {
  try {
    await getTotalPopulationByCity(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/city/min-population:
 *   get:
 *     summary: Get city with minimum population
 *     description: Retrieve the city with the lowest population
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/city/min-population', async (req, res) => {
  try {
    await getCityWithMinPopulation(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/city/sorted-population:
 *   get:
 *     summary: Get cities sorted by population
 *     description: Retrieve all cities sorted by their population in ascending order
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/city/sorted-population', async (req, res) => {
  try {
    await getCitiesSortedByPopulation(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/city/average-population:
 *   get:
 *     summary: Get average population
 *     description: Retrieve the average population of all cities
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/city/average-population', async (req, res) => {
  try {
    await getAveragePopulation(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/city/{id}:
 *   get:
 *     summary: Get city by ID
 *     description: Retrieve details of a specific city using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the city to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/city/:id', async (req, res) => {
  try {
    await getCity(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/city:
 *   post:
 *     summary: Create a new city
 *     description: Add a new city to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New York"
 *               population:
 *                 type: integer
 *                 example: 8419600
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       201:
 *         description: City successfully created
 */
router.post('/city', validateCity, async (req, res) => {
  try {
    await createCity(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
/**
 * @swagger
 * /api/v1/cities:
 *   post:
 *     summary: Create multiple cities
 *     description: Add multiple cities to the database at once
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Los Angeles"
 *                 population:
 *                   type: integer
 *                   example: 3980400
 *                 country:
 *                   type: string
 *                   example: "USA"
 *     responses:
 *       201:
 *         description: Cities successfully created
 */

router.post('/cities', validateCity, async (req, res) => {
  try {
    await createCities(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
/**
 * @swagger
 * /api/v1/city/{id}:
 *   put:
 *     summary: Update a city by ID
 *     description: Update details of a specific city using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the city to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New York"
 *               population:
 *                 type: integer
 *                 example: 8419600
 *               area:
 *                 type: number
 *                 example: 789.43
 *     responses:
 *       200:
 *         description: City successfully updated
 */
router.put('/city/:id', async (req, res) => {
  try {
    await updateCity(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
/**
 * @swagger
 * /api/v1/city/name/{name}:
 *   put:
 *     summary: Update a city by name
 *     description: Update details of a specific city using its name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the city to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               population:
 *                 type: integer
 *                 example: 500000
 *               area:
 *                 type: number
 *                 example: 350.75
 *     responses:
 *       200:
 *         description: City successfully updated
 *       404:
 *         description: City not found
 */
router.put('/city/name/:name', async (req, res) => {
  try {
    await updateCityByName(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/city/{id}:
 *   delete:
 *     summary: Delete a city by ID
 *     description: Remove a specific city from the database using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the city to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City successfully deleted
 */
router.delete('/city/:id', async (req, res) => {
  try {
    await deleteCity(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/cities:
 *   delete:
 *     summary: Delete multiple cities
 *     description: Remove multiple cities from the database by their IDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["101", "102", "103"]
 *     responses:
 *       200:
 *         description: Cities successfully deleted
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Some or all cities not found
 */
router.delete('/cities', async (req, res) => {
  try {
    await deleteCities(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
