import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        price: { type: String, required: true },
        color: { type: String, required: true },
        instrumentId: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["rejected", "in progress", "delivered"],
      default: "in progress",
    },
    totalPrice: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
