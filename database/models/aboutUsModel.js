const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    missionTitle: {
      type: String,
      default: "",
      trim: true,
    },
    missionDescription: {
      type: String,
      default: "",
      trim: true,
    },
    visionTitle: {
      type: String,
      default: "",
      trim: true,
    },
    visionDescription: {
      type: String,
      default: "",
      trim: true,
    },
    seoTitle: {
      type: String,
      default: "",
      trim: true,
    },
    seoDescription: {
      type: String,
      default: "",
      trim: true,
    },
    seoKeywords: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model("aboutUs", modelSchema);
