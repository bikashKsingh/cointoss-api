const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema(
  {
    gameStatus: {
      type: String,
      enum: ["PENDING", "STARTED", "ENDED"],
      default: "PENDING",
      trim: true,
    },
    gameResult: {
      type: String,
      enum: ["PENDING", "HEAD", "TAIL"],
      default: "PENDING",
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: { type: Date },
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

module.exports = mongoose.model("coinGame", modelSchema);
