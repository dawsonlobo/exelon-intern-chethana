"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.createCities = exports.createCity = exports.getCity = exports.getAllCities = void 0;
const city_1 = require("../../models/v1/city"); // Import the City model
// Get all cities
const getAllCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield city_1.City.find();
        res.status(200).json(cities);
    }
    catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
    }
});
exports.getAllCities = getAllCities;
// Get a city by ID
const getCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const city = yield city_1.City.findOne({ id });
        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json(city);
    }
    catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
    }
});
exports.getCity = getCity;
// Create a single city
const createCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, population, area } = req.body;
        if (!id || !name || !population || !area) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingCity = yield city_1.City.findOne({ id });
        if (existingCity) {
            return res.status(400).json({ message: `City with id ${id} already exists` });
        }
        const newCity = new city_1.City({ id, name, population, area });
        yield newCity.save();
        res.status(201).json(newCity);
    }
    catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
    }
});
exports.createCity = createCity;
// Create multiple cities
const createCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCities = req.body;
        if (!Array.isArray(newCities)) {
            return res.status(400).json({ message: "Request body should be an array of cities" });
        }
        const errors = [];
        const validCities = [];
        for (const city of newCities) {
            const { id, name, population, area } = city;
            if (!id || !name || !population || !area) {
                errors.push(`City with id ${id} is missing required fields`);
            }
            else {
                const existingCity = yield city_1.City.findOne({ id });
                if (existingCity) {
                    errors.push(`City with id ${id} already exists`);
                }
                else {
                    validCities.push(new city_1.City({ id, name, population, area }));
                }
            }
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        yield city_1.City.insertMany(validCities);
        res.status(201).json({ addedCities: validCities });
    }
    catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
    }
});
exports.createCities = createCities;
// Update a city by ID
const updateCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, population, area } = req.body;
        const updatedCity = yield city_1.City.findOneAndUpdate({ id }, { name, population, area }, { new: true });
        if (!updatedCity) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json(updatedCity);
    }
    catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
    }
});
exports.updateCity = updateCity;
// Delete a city by ID
const deleteCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCity = yield city_1.City.findOneAndDelete({ id });
        if (!deletedCity) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json({ message: "City deleted successfully", deletedCity });
    }
    catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
    }
});
exports.deleteCity = deleteCity;
