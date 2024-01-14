const mongoose = require("mongoose");
const { address } = require("../../helpers/dbHelper");
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
    googleMapUrl: {
      type: String,
      default: "",
      trim: true,
    },
    mobileNumber: {
      type: String,
      default: "",
      trim: true,
    },
    inquiryNumber: {
      type: String,
      default: "",
    },
    supportNumber: {
      type: String,
      default: "",
    },
    whatsApp: {
      type: String,
      default: "",
    },
    supportEmail: {
      type: String,
      default: "",
    },
    inquiryEmail: {
      type: String,
      default: "",
    },

    // Register Office
    regOfficeAddress: address,
    // Branch Office
    branchOfficeAddress: address,
    // Branch Office
    factoryAddress: address,

    // Social Media
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
    pintrest: {
      type: String,
      default: "",
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

module.exports = mongoose.model("contactUs", modelSchema);
