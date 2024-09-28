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

  async getInstrumentsBySection(section: string) {
    const instruments = await Instrument.find({ section });
    return instruments;
  }

  async getInstrumentsBySubtype(subtype: string) {
    const instruments = await Instrument.find({ instrumentType: subtype });
    return instruments;
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
