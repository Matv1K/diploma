import express, { Request, Response } from "express";
import { validationResult } from "express-validator";

import { instrumentValidator } from "../validators/instrumentValidator";

import Instrument from "../models/Instrument";

const router = express.Router();

// ROUTE FOR CREATING NEW INSTRUMENT
router.post("/", instrumentValidator, async (req: Request, res: Response) => {
  try {
    // const { errors } = validationResult;
    // console.log(errors);

    const {
      name,
      description,
      price,
      isNew,
      section,
      salePrice,
      onSale,
      brandName,
      image,
    } = req.body;

    const newInstrument = new Instrument({
      name,
      description,
      price,
      isNew,
      section,
      salePrice,
      onSale,
      brandName,
      image,
    });

    const savedInstrument = await newInstrument.save();

    res.status(201).send(savedInstrument);
  } catch (error) {
    console.error("Error saving the instrument: ", error);
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING ALL THE INSTRUMENTS

router.get("/", async (req: Request, res: Response) => {
  try {
    const instruments = await Instrument.find();

    res.status(200).send(instruments);
  } catch (error) {
    console.error("Error geting the instruments: ", error);
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

export default router;
