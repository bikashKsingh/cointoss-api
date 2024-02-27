const mongoose = require("mongoose");

// Format Mongodb Data
module.exports.formatMongoData = (values) => {
  if (!values) return values;

  if (Array.isArray(values)) {
    let formatData = [];
    for (value of values) {
      formatData.push(value.toObject());
    }
    return formatData;
  } else {
    return values.toObject();
  }
};

// Check Mongodb Object
module.exports.checkMongoObject = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Address Model Schema
module.exports.address = {
  mobileNumber: {
    type: String,
    trim: true,
  },
  landlineNumber: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  default: {},
};

module.exports.transactionType = {
  WITHDRAWAL_REQUEST: "WITHDRAWAL_REQUEST",
  WITHDRAWAL_REQUEST_REJECTED: "WITHDRAWAL_REQUEST_REJECTED",
  DEPOSIT_REQUEST: "DEPOSIT_REQUEST",
  DEPOSIT_REQUEST_REJECTED: "DEPOSIT_REQUEST_REJECTED",

  WALLET_WITHDRAWAL: "WALLET_WITHDRAWAL",
  WALLET_DEPOSIT: "WALLET_DEPOSIT",

  GAME_DEPOSIT: "GAME_DEPOSIT",
  GAME_WITHDRAWAL: "GAME_WITHDRAWAL",

  REFERRAL_DEPOSIT: "REFERRAL_DEPOSIT",
  REFERRED_DEPOSIT: "REFERRED_DEPOSIT",
  All: "All",
};

module.exports.defaultTransactionType = this.transactionType.DEPOSIT_REQUEST;
