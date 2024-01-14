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
