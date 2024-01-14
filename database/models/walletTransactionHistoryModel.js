const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
      trim: true,
    },
    transactionType: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAWAL"],
      default: "DEPOSIT",
      trim: true,
    },
    desctiption: {
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

module.exports = mongoose.model("walletTransactionHistory", modelSchema);
