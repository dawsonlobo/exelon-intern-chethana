import mongoose, { Document, Schema } from "mongoose";

// Define the ICity interface
export interface ICity extends Document {
  id: number;
  name: string;
  population: number;
  area: number;
}

// Define the City schema
const CitySchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true }, // Required because it's manually assigned
  name: { type: String, required: true },
  population: { type: Number, required: true },
  area: { type: Number, required: true }
});

// Create and export the City model
export default mongoose.model<ICity>("City", CitySchema);
