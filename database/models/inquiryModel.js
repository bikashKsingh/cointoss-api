const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      default: "",
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    webpage: {
      type: String,
      default: "CONTACT",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    inquiryStatus: {
      type: String,
      enum: ["OPEN", "INPROGRESS", "PENDING", "CLOSED"],
      default: "OPEN",
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("inquiry", modelSchema);
