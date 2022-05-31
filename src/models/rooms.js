import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema(
  {
    roomType: {
      type: String,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

roomsSchema.virtual("hotels", {
  ref: "Hotel",
  localField: "_id",
  foreignField: "rooms",
});

const Room = new mongoose.model("Room", roomsSchema);
export default Room;
