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
  deleteCities,
  filterCities,
  filterCityByKey,
  getCitiesWithPagination
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
 *         tags:
 *          - Cities  
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   population:
 *                     type: integer
 *                   country:
 *                     type: string
 *             examples:
 *               successResponse:
 *                 summary: List of Cities
 *                 value:
 *                   - id: "1"
 *                     name: "New York"
 *                     population: 8419600
 *                     country: "USA"
 *                   - id: "2"
 *                     name: "Los Angeles"
 *                     population: 3980400
 *                     country: "USA"
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
 *         description: Successfully retrieved total population
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPopulation:
 *                   type: integer
 *             examples:
 *               successResponse:
 *                 summary: Example Response
 *                 value:
 *                   totalPopulation: 120000000
 *     
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
 *         description: Successfully retrieved city with minimum population
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     population:
 *                       type: integer
 *             examples:
 *               successResponse:
 *                 summary: Example Response
 *                 value:
 *                   city:
 *                     id: "5"
 *                     name: "Smalltown"
 *                     population: 5000
 *  
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
 *         description: Successfully retrieved sorted cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   population:
 *                     type: integer
 *             examples:
 *               successResponse:
 *                 summary: Example Response
 *                 value:
 *                   - id: "5"
 *                     name: "Smalltown"
 *                     population: 5000
 *                   - id: "3"
 *                     name: "Middletown"
 *                     population: 250000
 *                   - id: "1"
 *                     name: "Big City"
 *                     population: 10000000
 *      
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
 *         description: Successfully retrieved average population
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averagePopulation:
 *                   type: number
 *             examples:
 *               successResponse:
 *                 summary: Example Response
 *                 value:
 *                   averagePopulation: 6000000
 *     
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 population:
 *                   type: integer
 *                 country:
 *                   type: string
 *             examples:
 *               successResponse:
 *                 summary: City Found
 *                 value:
 *                   id: "1"
 *                   name: "New York"
 *                   population: 8419600
 *                   country: "USA"
 *  
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
 *     description: Add multiple cities to the database in a single request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     population:
 *                       type: integer
 *                     country:
 *                       type: string
 *           examples:
 *             validRequest:
 *               summary: Example Request
 *               value:
 *                 cities:
 *                   - name: "New York"
 *                     population: 8419600
 *                     country: "USA"
 *                   - name: "Mumbai"
 *                     population: 20411000
 *                     country: "India"
 *     responses:
 *       201:
 *         description: Cities created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 createdCities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       population:
 *                         type: integer
 *                       country:
 *                         type: string
 *             examples:
 *               successResponse:
 *                 summary: Cities Created
 *                 value:
 *                   message: "Cities added successfully"
 *                   createdCities:
 *                     - id: "1"
 *                       name: "New York"
 *                       population: 8419600
 *                       country: "USA"
 *                     - id: "2"
 *                       name: "Mumbai"
 *                       population: 20411000
 *                       country: "India"
 *     
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
 *      
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedCity:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     population:
 *                       type: integer
 *                     country:
 *                       type: string
 *             examples:
 *               successResponse:
 *                 summary: City Deleted
 *                 value:
 *                   message: "City with ID 3 deleted successfully"
 *                   deletedCity:
 *                     id: "3"
 *                     name: "Chicago"
 *                     population: 2716000
 *                     country: "USA"
 *     
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cities deleted successfully"
 *                 deletedCities:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["101", "102", "103"]
 *    
 */

router.delete('/cities', async (req, res) => {
  try {
    await deleteCities(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
/**
 * @swagger
 * /api/v1/city/filter:
 *   post:
 *     summary: Get cities with dynamically filtered fields
 *     description: |
 *       Pass field names (`id`, `name`, `area`, `population`) with 1 (show) or 0 (hide).
 *       - Only fields marked as `1` will appear in the response.
 *       - If all fields are `0`, the API will return the remaining fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 enum: [0, 1]
 *                 description: Include (1) or exclude (0) the 'id' field.
 *               name:
 *                 type: integer
 *                 enum: [0, 1]
 *                 description: Include (1) or exclude (0) the 'name' field.
 *               area:
 *                 type: integer
 *                 enum: [0, 1]
 *                 description: Include (1) or exclude (0) the 'area' field.
 *               population:
 *                 type: integer
 *                 enum: [0, 1]
 *                 description: Include (1) or exclude (0) the 'population' field.
 *           examples:
 *             ShowOnlyID:
 *               summary: Show only ID
 *               value:
 *                 id: 1
 *                 name: 0
 *                 area: 0
 *                 population: 0
 *             ShowOnlyName:
 *               summary: Show only Name
 *               value:
 *                 id: 0
 *                 name: 1
 *                 area: 0
 *                 population: 0
 *             ShowIDAndArea:
 *               summary: Show ID and Area
 *               value:
 *                 id: 1
 *                 name: 0
 *                 area: 1
 *                 population: 0
 *             HideIDAndName:
 *               summary: Hide ID and Name, Show Area and Population
 *               value:
 *                 id: 0
 *                 name: 0
 *                 area: 1
 *                 population: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered cities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The city ID (only if id = 1)
 *                   name:
 *                     type: string
 *                     description: The city name (only if name = 1)
 *                   area:
 *                     type: string
 *                     description: The city area (only if area = 1)
 *                   population:
 *                     type: string
 *                     description: The city population (only if population = 1)
 *             examples:
 *               ShowOnlyID:
 *                 summary: Show only ID
 *                 value:
 *                   - id: "65d7894b20abf"
 *               ShowOnlyName:
 *                 summary: Show only Name
 *                 value:
 *                   - name: "New York"
 *               ShowIDAndArea:
 *                 summary: Show ID and Area
 *                 value:
 *                   - id: "65d7894b20abf"
 *                     area: "783.8 km²"
 *               HideIDAndName:
 *                 summary: Hide ID and Name, Show Area and Population
 *                 value:
 *                   - area: "783.8 km²"
 *                     population: "8,336,817"
 */

router.post('/city/filter', async (req, res) => {
  try {
    await filterCities(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
);
/**
 * @swagger
 * /api/v1/cities/filter:
 *   post:
 *     summary: Filter cities dynamically by any field (case insensitive)
 *     description: Retrieve cities based on provided key-value pairs (e.g., name, area, population). The keys can be any field in the database.
 *     tags:
 *       - Cities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties:
 *               type: array
 *               items:
 *                 type: string
 *           example:
 *             name: ["USA", "UK"]
 *             population: ["300000"]
 *     responses:
 *       200:
 *         description: Successfully retrieved cities
 *         content:
 *           application/json:
 *             example:
 *               - name: "USA"
 *                 area: "9,834,000 km²"
 *                 population: "331,002,651"
 *               - name: "UK"
 *                 area: "243,610 km²"
 *                 population: "67,886,011"
 *      
 */
router.post("/cities/filter", async (req, res) => {
  try {
    await filterCityByKey(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/v1/cities/paginate:
 *   post:
 *     summary: Get paginated list of cities
 *     description: Fetch cities with pagination. The response includes the total count of cities in the database, and paginated results based on user input.
 *     tags:
 *       - Cities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 description: Page number (default is 1)
 *                 example: 1
 *               itemsPerPage:
 *                 type: integer
 *                 description: Number of items per page (default is 10)
 *                 example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated cities
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 tableCount: 50
 *                 tableData:
 *                   - page: 1
 *                     itemsPerPage: 2
 *                     cities:
 *                       - name: "New York"
 *                         population: "8,336,817"
 *                         area: "783.8"
 *                       - name: "Los Angeles"
 *                         population: "3,979,576"
 *                         area: "1,302 "
 *   
 */
router.post("/cities/paginate", async (req, res) => {
  try {
    await getCitiesWithPagination(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
