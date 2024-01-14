const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    couponCode: { type: String, trim: true, required: true, unique: true },
    applyFor: { type: String, enum: ["NEW_USER", "EXISTING_USER", "ALL_USER"] },
    discountType: { type: String, enum: ["AMOUNT", "PERCENTAGE"] },
    discount: { type: Number },
    description: { type: String, trim: true },
    minimumAmount: { type: Number },
    numberOfUsesTimes: { type: Number },
    startDate: { type: Date },
    expiryDate: { type: Date },
    image: { type: String, default: null },
    status: { type: Boolean, default: true },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        ret.id = ret._id;
        // delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("coupon", modelSchema);
