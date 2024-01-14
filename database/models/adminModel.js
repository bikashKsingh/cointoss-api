const mongoose = require("mongoose");
const date = require("date-and-time");
const modelSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    mobile: { type: String },
    password: { type: String, trim: true, required: true },
    otp: { type: String, trim: true },
    otpExpiredAt: { type: Date, trim: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        delete ret.__v;
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiredAt;
        ret.createdAt = date.format(new Date(ret.createdAt), "DD-MM-YYYY");
        ret.updatedAt = date.format(new Date(ret.updatedAt), "DD-MM-YYYY");
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("admin", modelSchema);
