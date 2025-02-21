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
  handleCityActions
} from '../../controllers/v1/controller';

const router = express.Router();

/**
 * @swagger
 * /api/v1/city:
 *   get:
 *     summary: Get all cities
 *     description: Retrieve a list of all cities
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Successfully retrieved
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 *     tags:
 *       - Cities
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
 * /api/v1/filter-cities:
 *   post:
 *     tags: City API
 *     summary: abcd Retrieve cities with a selected operation
 *     description: >
 *       Choose one of the following operations from the dropdown:
 *       - **pagination**: Returns cities with pagination.
 *       - **projection**: Returns cities with only selected fields.
 *       - **sort**: Returns cities sorted by a specific field.
 *       - **filter**: Returns cities filtered by dynamic criteria.
 *       - **search**: Returns search details for a case-insensitive search.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/PaginationRequest'
 *               - $ref: '#/components/schemas/ProjectionRequest'
 *               - $ref: '#/components/schemas/SortRequest'
 *               - $ref: '#/components/schemas/FilterRequest'
 *               - $ref: '#/components/schemas/SearchRequest'
 *           examples:
 *             PaginationExample:
 *               summary: Pagination only
 *               value:
 *                 pagination:
 *                   page: "1"
 *                   limit: "10"
 *             ProjectionExample:
 *               summary: Projection only
 *               value:
 *                 projection: "name,area"
 *             SortExample:
 *               summary: Sort only
 *               value:
 *                 sort: "name:asc"
 *             FilterExample:
 *               summary: Filter only
 *               value:
 *                 filter:
 *                   name: ["New York", "Los Angeles"]
 *             SearchExample:
 *               summary: Search only
 *               value:
 *                 search: "New York"
 *                 searchFields: ["name", "area", "population"]
 *     responses:
 *       200:
 *         description: Successful response based on the selected operation.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/PaginationResponse'
 *                 - $ref: '#/components/schemas/ProjectionResponse'
 *                 - $ref: '#/components/schemas/SortResponse'
 *                 - $ref: '#/components/schemas/FilterResponse'
 *                 - $ref: '#/components/schemas/SearchResponse'
 *
 * components:
 *   schemas:
 *     PaginationRequest:
 *       type: object
 *       required:
 *         - pagination
 *       properties:
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: string
 *               example: "1"
 *             limit:
 *               type: string
 *               example: "10"
 *
 *     ProjectionRequest:
 *       type: object
 *       required:
 *         - projection
 *       properties:
 *         projection:
 *           type: string
 *           description: Comma-separated list of fields to include or exclude. Prefix with "-" to exclude.
 *           example: "name,area"
 *
 *     SortRequest:
 *       type: object
 *       required:
 *         - sort
 *       properties:
 *         sort:
 *           type: string
 *           description: Sort order in the format "field:asc" or "field:desc".
 *           example: "name:asc"
 *
 *     FilterRequest:
 *       type: object
 *       required:
 *           example: "name,area"
 *
 *
 *     FilterRequest:
 *       type: object
 *       required:
 *         - filter
 *       properties:
 *         filter:
 *           type: object
 *           description: >
 *             Dynamic filter criteria. Each key can be any field (e.g., name, area, population)
 *             and its value should be an array of values.
 *           example: { "name": ["New York"] }
 *
 *     SearchRequest:
 *       type: object
 *       required:
 *         - search
 *       properties:
 *         search:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               term:
 *                 type: string
 *                 description: Search string for matching cities.
 *                 example: "York"
 *               fields:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of fields to perform the search on.
 *                 example: ["name"]
 *               startsWith:
 *                 type: boolean
 *                 description: If true, searches for cities starting with the term.
 *                 example: false
 *               endsWith:
 *                 type: boolean
 *                 description: If true, searches for cities ending with the term.
 *                 example: true
 *
 *     PaginationResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Success"
 *         data:
 *           type: object
 *           properties:
 *             totalCount:
 *               type: number
 *               example: 100
 *             tableData:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *
 *     ProjectionResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Success"
 *         data:
 *           type: object
 *           properties:
 *             totalCount:
 *               type: number
 *               example: 100
 *             tableData:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *
 *     SortResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Success"
 *         data:
 *           type: object
 *           properties:
 *             totalCount:
 *               type: number
 *               example: 100
 *             tableData:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *
 *     FilterResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Success"
 *         data:
 *           type: object
 *           properties:
 *             totalCount:
 *               type: number
 *               example: 100
 *             tableData:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *
 *     SearchResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Success"
 *         data:
 *           type: object
 *           properties:
 *             totalCount:
 *               type: number
 *               example: 1
 *             tableData:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "New York"
 *                   area:
 *                     type: number
 *                     example: 468.9
 *                   population:
 *                     type: number
 *                     example: 8419600
 */

router.post("/filter-cities", handleCityActions);
export default router;