import express from "express";
import mongoose from "mongoose";
import v1Routes from "./routes/v1/route"; // Import the versioned routes
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
dotenv.config();

// Ensure MONGO_URL is defined
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}

// Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as any)
.then(() => console.log('MongoDB Connected to exelon-city'))
.catch(err => console.log('MongoDB Connection Error:', err));


// Register versioned routes
app.use("/api/v1", v1Routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
