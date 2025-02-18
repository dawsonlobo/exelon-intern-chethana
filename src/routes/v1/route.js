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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/v1/route.ts
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controllers/v1/controller");
const router = express_1.default.Router();
// Define routes for City Management API
router.get('/cities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, controller_1.getAllCities)(req, res);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ message: errorMessage });
    }
}));
router.get('/city/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, controller_1.getCity)(req, res);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ message: errorMessage });
    }
}));
router.post('/city', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, controller_1.createCity)(req, res);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ message: errorMessage });
    }
}));
// Post multiple cities
router.post('/cities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, controller_1.createCities)(req, res);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ message: errorMessage });
    }
}));
// PUT request for updating a city
router.put('/city/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, controller_1.updateCity)(req, res); // Pass the request and response to the controller
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ message: errorMessage });
    }
}));
// DELETE request for deleting a city
router.delete('/city/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, controller_1.deleteCity)(req, res); // Pass the request and response to the controller
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ message: errorMessage });
    }
}));
exports.default = router;
