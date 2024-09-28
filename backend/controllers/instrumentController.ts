import { Request, Response } from 'express';

import cloudinary from '../services/cloudinary/cloudinaryService';

import Comment from '../models/Comment';
import Instrument from '../models/Instrument';

import InstrumentService from '../services/instruments/instrumentService';

class InstrumentController {
  async createInstrument(req: Request, res: Response) {
    try {
      const instrumentData = req.body;

      const savedInstrument = await InstrumentService.createInstrument(instrumentData);
      res.status(201).json(savedInstrument);
    } catch (error) {
      console.error('Error saving instrument: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  };

  // Backend - Ensure that instruments have unique _ids
  async getAllInstruments(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const currentPage = Number(page);
      const instruments = await InstrumentService.getAllInstrumentsPaginated(currentPage, Number(limit));

      // Fetch cloudinary resources (images)
      const { resources } = await cloudinary.api.resources({
        type: 'upload',
      });

      // Map cloudinary images to instruments
      const cloudinaryImages = resources.map((resource: any) => ({
        url: resource.secure_url,
        public_id: resource.public_id,
      }));

      // Map instruments with cloudinary images (ensure that it is a 1-to-1 match)
      const instrumentsWithImages = instruments.map(instrument => {
        const matchingImage = cloudinaryImages.find(image => image.url === instrument.image);
        return {
          ...instrument.toObject(),
          image: matchingImage ? matchingImage.url : instrument.image, // Retain original image if no match
        };
      });

      // Check for duplicates by _id and remove them
      const uniqueInstruments = instrumentsWithImages.filter((instrument, index, self) =>
        index === self.findIndex(i => i._id.toString() === instrument._id.toString()));

      // Get the total count of instruments to calculate hasMore
      const totalInstruments = await Instrument.countDocuments();

      return res.status(200).json({
        instruments: uniqueInstruments,
        hasMore: currentPage * limit < totalInstruments, // Pagination check for "hasMore"
      });
    } catch (error) {
      console.error('Error fetching instruments: ', error);
      return res.status(500).json({ message: `Something went wrong: ${error}` });
    }
  }

  async getPopularInstruments(req: Request, res: Response) {
    try {
      const instruments = await InstrumentService.getPopularInstruments();
      res.status(200).json(instruments);
    } catch (error) {
      console.error('Error fetching popular instruments: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  }

  async getNewInstruments(req: Request, res: Response) {
    try {
      const instruments = await InstrumentService.getNewInstruments();
      res.status(200).json(instruments);
    } catch (error) {
      console.error('Error fetching new instruments: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  }

  async getInstrumentCount(req: Request, res: Response) {
    try {
      const count = await InstrumentService.getInstrumentCount();
      res.status(200).json({ amount: count });
    } catch (error) {
      console.error('Error fetching amount of instruments: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  }

  async getInstrumentsOnSale(req: Request, res: Response) {
    try {
      const instruments = await InstrumentService.getInstrumentsOnSale();
      res.status(200).json(instruments);
    } catch (error) {
      console.error('Error fetching instruments on sale: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  }

  async getInstrumentsBySection(req: Request, res: Response) {
    const { section } = req.params;

    try {
      const instruments = await InstrumentService.getInstrumentsBySection(section);
      res.status(200).json(instruments);
    } catch (error) {
      console.error('Error fetching instruments by section: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  }

  async getInstrumentsByBrand(req: Request, res: Response) {
    const { brand } = req.params;

    try {
      const instruments = await InstrumentService.getInstrumentsByBrand(brand);
      res.status(200).json(instruments);
    } catch (error) {
      console.error('Error fetching instruments by brand: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  };

  async getInstrumentsBySubtype(req: Request, res: Response) {
    const { subtype } = req.params;

    try {
      const instruments = await InstrumentService.getInstrumentsBySubtype(subtype);
      res.status(200).json(instruments);
    } catch (error) {
      console.error('Error fetching instruments by subtype: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  }

  async searchInstruments(req: Request, res: Response) {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
      const instruments = await InstrumentService.searchInstruments(q as string);
      res.status(200).json(instruments);
    } catch (error) {
      console.error('Search failed', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async getInstrumentById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const instrument = await InstrumentService.getInstrumentById(id);
      res.status(200).json(instrument);
    } catch (error) {
      console.error('Error fetching instrument by ID: ', error);
      res.status(500).json(`Something went wrong: ${error}`);
    }
  };

  async getInstrumentRating(req: Request, res: Response) {
    try {
      const { instrumentId } = req.params;

      const instrumentComments = await Comment.find({ instrumentId });

      if (instrumentComments.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }

      const totalRating = instrumentComments.reduce((acc, comment) => acc + comment.rating, 0);
      const avgRating = Math.round(totalRating / instrumentComments.length);

      res.status(200).json({ averageRating: avgRating });
    } catch (error) {
      console.error('Error fetching instrument rating:', error);
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }

}

export default new InstrumentController();
