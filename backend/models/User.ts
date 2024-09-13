import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.model("User", userSchema);
