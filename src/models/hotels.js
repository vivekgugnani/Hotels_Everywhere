import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    hotel_name: {
      type: String,
      required: true,
    },
    street_address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      lowercase: true,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    stars: {
      type: String,
      required: true,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
