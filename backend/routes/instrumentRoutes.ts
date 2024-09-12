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
      section,
      salePrice,
      onSale,
      brandName,
      image,
      isNew: true,
      bought: 0,
    });

    const savedInstrument = await newInstrument.save();

    res.status(201).send(savedInstrument);
  } catch (error) {
    console.error("Error saving instrument: ", error);
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING ALL THE INSTRUMENTS

router.get("/", async (req: Request, res: Response) => {
  try {
    const instruments = await Instrument.find();

    res.status(200).send(instruments);
  } catch (error) {
    console.error("Error fetching instruments: ", error);
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING 10 MOST BOUGHT ITEMS

router.get("/popular", async (req: Request, res: Response) => {
  try {
    const instruments = await Instrument.aggregate([
      { $sort: { bought: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).send(instruments);
  } catch (error) {
    console.error("Error fetching instruments: ", error);
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING 20 NEW MOST BOUGHT ITEMS

router.get("/new", async (req: Request, res: Response) => {
  try {
    const instruments = await Instrument.aggregate([
      { $match: { isNew: true } },
      { $sort: { bought: -1 } },
      { $limit: 20 },
    ]);

    res.status(200).send(instruments);
  } catch (error) {
    console.error("Error fetching instruments: ", error);
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING AMOUNT OF INSTRUMENTS IN DB

router.get("/amount", async (req: Request, res: Response) => {
  try {
    const amount = await Instrument.countDocuments();

    res.status(200).json({ amount });
  } catch (error) {
    console.error("Error fetching amount of instruments: ", error);
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING ALL THE INSTRUMENTS THAT ARE ON SALE

router.get("/sale", async (req: Request, res: Response) => {
  try {
    const instruments = await Instrument.find({ onSale: true });

    res.status(200).send(instruments);
  } catch (error) {
    console.error("Error fetching instruments on sale");
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING INSTRUMENTS BY SECTION

router.get("/section/:section", async (req: Request, res: Response) => {
  try {
    const { section } = req.params;

    const instruments = await Instrument.find({ section });

    res.status(200).send(instruments);
  } catch (error) {
    console.error("Error fetching instruments");
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING ONE INSTRUMENTS BY BRANDH

router.get("/brands/:brand", async (req, res) => {
  try {
    const { brand } = req.params;

    const instruments = await Instrument.find({ brandName: brand });

    res.status(200).send(instruments);
  } catch (error) {
    console.error("Error fetching instruments");
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

// ROUTE FOR GETTING ONE SPECIFIC INSTRUMENT BY ID

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const instrument = await Instrument.findById(id);

    res.status(200).send(instrument);
  } catch (error) {
    console.error("Error fetching instruments");
    res.status(500).send(`Something went wrong: ${error}`);
  }
});

export default router;
