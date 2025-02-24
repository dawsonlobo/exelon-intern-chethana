import { Request, Response } from "express";
import mongoose from "mongoose";
import { City } from "../../models/v1/acidmodel";

//  API to add and delete cities in a transaction
export const performCityTransaction = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, population, area } = req.body;

    //  Step 1: Insert a new city
    const newCity = await City.create([{ name, population, area }], { session });

    //  Step 2: Delete cities with the name "City One"
    await City.deleteMany({ name: "City One" }, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      status: "success",
      message: "Transaction completed successfully",
      newCity
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ status: "error", message: "Transaction failed", error });
  }
};
