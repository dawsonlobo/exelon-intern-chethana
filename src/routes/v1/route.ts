// src/routes/v1/route.ts
import express from 'express';
import { City, ICity } from '../../models/v1/city'; // Correct path to city model
import { getCity, createCity, getAllCities, updateCity, deleteCity, createCities } from '../../controllers/v1/controller';

const router = express.Router();

// Define routes for City Management API
router.get('/cities', async (req, res) => {
  try {
    await getAllCities(req, res);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.get('/city/:id', async (req, res) => {
  try {
    await getCity(req, res);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

router.post('/city', async (req, res) => {
  try {
    await createCity(req, res);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

// Post multiple cities
router.post('/cities', async (req, res) => {
  try {
    await createCities(req, res);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

// PUT request for updating a city
router.put('/city/:id', async (req, res) => {
  try {
    await updateCity(req, res); // Pass the request and response to the controller
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

// DELETE request for deleting a city
router.delete('/city/:id', async (req, res) => {
  try {
    await deleteCity(req, res); // Pass the request and response to the controller
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
});

export default router;
