const mongoose = require("mongoose");
const dbHelper = require("../../helpers/dbHelper");
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
      enum: Object.keys(dbHelper.transactionType),
      default: dbHelper.defaultTransactionType,
      trim: true,
    },
    utrNumber: {
      type: String,
      default: "",
      trim: true,
    },
    screenshot: {
      type: String,
      default: "",
      trim: true,
    },
    amount: {
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

module.exports = mongoose.model("walletTransactionHistory", modelSchema);
