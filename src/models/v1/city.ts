// src/models/v1/city.ts

import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the City model
export interface ICity extends Document {
  id: string;
  name: string;
  population: number;
  area: number;
}

// Define the schema for the City model
const citySchema = new Schema<ICity>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  population: { type: Number, required: true },
  area: { type: Number, required: true },
});

// Create the City model using the schema
const City = mongoose.model<ICity>('City', citySchema);

// Export the model and interface together
export { City };
