import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { instrumentValidator } from "../validators/instrumentValidator";

// import Instrument from "../models/Instrument";

const router = express.Router();

// ROUTE FOR CREATING NEW INSTRUMENT
router.post("/", (req: Request, res: Response) => {
  try {
    // const { errors } = validationResult;
    // console.log(errors);

    console.log("LALA");

    res.send("Hey");
  } catch (error) {
    res.send("FUCK");
  }
});

// ROUTE FOR GETTING ALL THE INSTRUMENTS

router.get("/", (req, res) => {
  try {
  } catch (error) {}
});

export default router;
