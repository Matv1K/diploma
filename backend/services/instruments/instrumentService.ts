import Instrument from '../../models/Instrument';

class InstrumentService {
  async createInstrument(instrumentData: any) {
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

  // Service: Get instruments by section
  async getInstrumentsBySection(section: string, page: number = 1, pageSize: number = 10) {
    try {
      const skip = (page - 1) * pageSize; // Calculate how many documents to skip
      const instruments = await Instrument.find({ section })
        .skip(skip) // Skip the calculated number of documents
        .limit(pageSize); // Limit the number of documents to fetch

      if (instruments.length === 0) {
        // If no instruments were found, return an empty array
        return [];
      }

      return instruments;
    } catch (error) {
      throw new Error(`Failed to fetch instruments for section ${section}: ${error.message}`);
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

  async searchInstruments(query: string) {
    const instruments = await Instrument.find({ name: { $regex: query, $options: 'i' } });
    return instruments;
  }
}

export default new InstrumentService();
