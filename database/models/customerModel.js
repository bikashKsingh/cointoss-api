const mongoose = require("mongoose");
// const orderModel = require("./orderModel");

const modelSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    mobile: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },

    // Address
    address: { type: String, trim: true },
    landmark: { type: String, trim: true },
    locality: { type: String, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    pincode: { type: String, trim: true },

    // Referal
    myReferralCode: { type: Number, required: true },
    referredByCode: { type: Number },

    // Wallet
    wallet: { type: Number, required: true, default: 0 },

    otp: { type: String, trim: true, select: false },
    otpExpiredAt: { type: Date, trim: true, select: false },
    status: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false, select: false },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        delete ret.__v;
        delete ret.password;
        ret.id = ret._id;
        return ret;
      },
    },
  }
);

// Delete all orders related to this Customer
// modelSchema.pre(
//   "remove",
//   { document: true, query: false },
//   async function (next) {
//     await orderModel.deleteMany({ customerId: this._id });
//     next();
//   }
// );

module.exports = mongoose.model("customer", modelSchema);
