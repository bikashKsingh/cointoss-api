const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
    reviewStatus: {
      type: String,
      default: "PENDING",
      trim: true,
      enum: ["PENDING", "APPROVED"],
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        delete ret.__v;
        ret.id = ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("review", reviewSchema);
