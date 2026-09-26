import mongoose, { Schema, models } from "mongoose";

const providerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

   email: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  unique: true,
},

    category: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    priceMin: {
      type: Number,
      required: true,
      min: 0,
    },

    priceMax: {
      type: Number,
      required: true,
      min: 0,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Provider =
  models.Provider ||
  mongoose.model("Provider", providerSchema);

export default Provider;