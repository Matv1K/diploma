import mongoose from "mongoose";

// ADD ENUM TO SECTION FIELD LATER

const instrumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    section: { type: String, required: true },
    brandName: { type: String, required: true },
    salePrice: { type: String, default: "" },
    onSale: { type: Boolean, default: false },
    bought: { type: Number, default: 0 },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.model("Instrument", instrumentSchema);
