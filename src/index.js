"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = __importDefault(require("./routes/v1/route")); // Import the versioned routes
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/city-management")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));
// Register versioned routes
app.use("/api/v1", route_1.default);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
