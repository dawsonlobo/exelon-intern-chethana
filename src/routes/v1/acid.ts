import express, { Request, Response } from "express";
import { performCityTransaction } from "../../controllers/v1/acid";

const router = express.Router();

//  Route to handle transactions
router.post("/city-transaction", async (req: Request, res: Response) => {
  await performCityTransaction(req, res);
});

export default router;
