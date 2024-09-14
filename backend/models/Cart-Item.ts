import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brandName: { type: String, required: true },
    amount: { type: Number, default: 1 },
    price: { type: String, required: true },
    color: { type: String, required: true },
    userId: { type: String, required: true },
    instrumentId: { type: String, required: true },
    section: { type: String, required: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.model("Cart_Item", cartItemSchema);