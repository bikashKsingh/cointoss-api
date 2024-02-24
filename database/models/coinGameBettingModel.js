const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
      trim: true,
    },
    coinGame: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coinGame",
      required: true,
      trim: true,
    },
    bettingCoin: {
      type: String,
      enum: ["HEAD", "TAIL"],
      trim: true,
      required: true,
    },
    bettingStatus: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "FAILED"],
      default: "PENDING",
      trim: true,
    },
    gameResult: {
      type: String,
      enum: ["PENDING", "HEAD", "TAIL"],
      default: "PENDING",
      trim: true,
    },
    bettingAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
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

module.exports = mongoose.model("coinGameBetting", modelSchema);
