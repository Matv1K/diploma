import Instrument from '../../models/Instrument';

import { ApiError, InstrumentI } from '../../../types';

class InstrumentService {
  async createInstrument(instrumentData: InstrumentI) {
    const newInstrument = new Instrument(instrumentData);
    return await newInstrument.save();
  }

  async getAllInstruments() {
    const instruments = await Instrument.find();
    return instruments;
  }

  async getAllInstrumentsPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const instruments = await Instrument.find().skip(skip).limit(limit);

    return instruments;
  }

  async getPopularInstruments() {
    const instruments = await Instrument.aggregate([{ $sort: { bought: -1 } }, { $limit: 10 }]);
    return instruments;
  }

  async getNewInstruments() {
    const instruments = await Instrument.aggregate([{ $match: { isNew: true } }, { $sort: { bought: -1 } }, { $limit: 20 }]);
    return instruments;
  }

  async getInstrumentCount() {
    const count = await Instrument.countDocuments();
    return count;
  }

  async getInstrumentsOnSale() {
    const instruments = await Instrument.find({ onSale: true });
    return instruments;
  }

  async getInstrumentsBySection(section: string, page: number = 1, pageSize: number = 10) {
    try {
      const skip = (page - 1) * pageSize;

      const instruments = await Instrument.find({ section })
        .skip(skip)
        .limit(pageSize);

      if (instruments.length === 0) {
        return [];
      }

      return instruments;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(`Failed to fetch instruments for section ${section}: ${apiError.message}`);
    }
  }

  async getInstrumentsBySubtype(subtype: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const instruments = await Instrument.find({ instrumentType: subtype })
      .skip(skip)
      .limit(limit);

    const totalInstruments = await Instrument.countDocuments({ instrumentType: subtype });
    const hasMore = skip + instruments.length < totalInstruments;

    return { instruments, hasMore };
  }

  async getInstrumentsByBrand(brand: string) {
    const instruments = await Instrument.find({ brandName: brand });
    return instruments;
  }

  async getInstrumentById(id: string) {
    const instrument = await Instrument.findById(id);
    return instrument;
  }

  async getInstrumentsByFilter(filter: string) {
    let sortCondition;

    switch (filter) {
      case 'cheapest':
        sortCondition = { price: 1 };
        break;
      case 'most_expensive':
        sortCondition = { price: -1 };
        break;
      case 'most_popular':
        sortCondition = { bought: -1 };
        break;
      case 'by_rating':
        sortCondition = { rating: -1 }; // Assuming you have a 'rating' field
        break;
      default:
        sortCondition = {};
    }

    const instruments = await Instrument.find().sort(sortCondition);
    return instruments;
  }

  async searchInstruments(query: string) {
    const instruments = await Instrument.find({ name: { $regex: query, $options: 'i' } });
    return instruments;
  }
}

export default new InstrumentService();
