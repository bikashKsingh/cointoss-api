const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "",
      unique: true,
      required: true,
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

module.exports = mongoose.model("newsletter", modelSchema);
