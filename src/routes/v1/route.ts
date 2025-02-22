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
 *               area:
 *                 type: integer
 *                 example: 468.9
 *              
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
 *                     area:
 *                       type: integer
 *           examples:
 *             validRequest:
 *               summary: Example Request
 *               value:
 *                 cities:
 *                   - name: "New York"
 *                     population: 8419600
 *                     area: 468.9
 *                   - name: "Mumbai"
 *                     population: 20411000
 *                     area: 603.4
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
 *                       area:
 *                         type: integer
 *             examples:
 *               successResponse:
 *                 summary: Cities Created
 *                 value:
 *                   message: "Cities added successfully"
 *                   createdCities:
 *                     - id: "1"
 *                       name: "New York"
 *                       population: 8419600
 *                       area: 468.9
 *                     - id: "2"
 *                       name: "Mumbai"
 *                       population: 20411000
 *                       area: 603.4
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
 *     summary: Retrieve cities with a selected operation
 *     tags: ['City API']
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
 *                 projection:
 *                   id: 1
 *                   name: 0
 *                   area: 1
 *                   population: 0
 *             SortExample:
 *               summary: Sort by name (desc) and area (asc)
 *               value:
 *                 options:
 *                   page: 1
 *                   itemsPerPage: 10
 *                   sortBy: ["name", "area"]
 *                   sortDesc: [true, false]
 *             FilterExample:
 *               summary: Filter only
 *               value:
 *                 filter:
 *                   name: ["New York", "Los Angeles"]
 *             SearchExample:
 *               summary: Search only
 *               value:
 *                 search: "York"
 *                 searchFields: ["name", "area", "population"]
 *                 startsWith: false
 *                 endsWith: true
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
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "New York"
 *         population:
 *           type: integer
 *           example: 8419600
 *         area:
 *           type: number
 *           example: 468.9
 *
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
 *           type: object
 *           description: Fields to include (1) or exclude (0).
 *           properties:
 *             id:
 *               type: integer
 *               enum: [0, 1]
 *               description: Include (1) or exclude (0) the 'id' field.
 *             name:
 *               type: integer
 *               enum: [0, 1]
 *               description: Include (1) or exclude (0) the 'name' field.
 *             area:
 *               type: integer
 *               enum: [0, 1]
 *               description: Include (1) or exclude (0) the 'area' field.
 *             population:
 *               type: integer
 *               enum: [0, 1]
 *               description: Include (1) or exclude (0) the 'population' field.
 *
 *     SortRequest:
 *       type: object
 *       required:
 *         - options
 *       properties:
 *         options:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             itemsPerPage:
 *               type: integer
 *               example: 10
 *             sortBy:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["name", "area"]
 *             sortDesc:
 *               type: array
 *               items:
 *                 type: boolean
 *               example: [true, false]
 *
 *     FilterRequest:
 *       type: object
 *       required:
 *         - filter
 *       properties:
 *         filter:
 *           type: object
 *           example: { "name": ["New York"] }
 *
 *     SearchRequest:
 *       type: object
 *       required:
 *         - search
 *       properties:
 *         search:
 *           type: string
 *           example: "York"
 *         searchFields:
 *           type: array
 *           items:
 *             type: string
 *           example: ["name"]
 *         startsWith:
 *           type: boolean
 *           example: false
 *         endsWith:
 *           type: boolean
 *           example: true
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
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/City'
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
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/City"
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
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/City"
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
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/City"
 *
 */

router.post("/filter-cities", handleCityActions);
export default router;