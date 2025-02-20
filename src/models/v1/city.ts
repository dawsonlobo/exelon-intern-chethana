import mongoose, { Document, Schema, SchemaOptions } from "mongoose";

// Define the ICity interface
export interface ICity extends Document {
  id: number;
  name: string;
  population: number;
  area: number;
}

// Define schema options
const schemaOptions: SchemaOptions = {
  timestamps: true,     // Automatically adds createdAt and updatedAt
  versionKey: false,    // Removes __v field from documents
  bufferCommands: true, // Enables buffering of commands while the database connection is pending
};

const CitySchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true }, // Required because it's manually assigned
    name: { type: String, required: true },
    population: { type: Number, required: true },
    area: { type: Number, required: true },
  },
  schemaOptions
);

// Create and export the City model
export default mongoose.model<ICity>("City", CitySchema);
