const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    minimumwithdrawalAmount: {
      type: Number,
      default: 0,
    },
    referralAmount: {
      type: Number,
      default: 0,
    },
    referredAmount: {
      type: Number,
      default: 0,
    },
    gameResult: {
      type: String,
      enum: ["RANDOM", "ALWAYS_HEAD", "ALWAYS_TAIL"],
      default: "RANDOM",
    },

    supportEmail: {
      type: String,
      default: "",
      trim: true,
    },
    supportMobile: {
      type: String,
      default: "",
      trim: true,
    },
    supportWhatsapp: {
      type: String,
      default: "",
      trim: true,
    },
    officeAddress: {
      type: String,
      default: "",
      trim: true,
    },
    facebook: {
      type: String,
      default: "",
      trim: true,
    },
    twitter: {
      type: String,
      default: "",
      trim: true,
    },
    instagram: {
      type: String,
      default: "",
      trim: true,
    },
    youtube: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("setting", modelSchema);
