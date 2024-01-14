const aboutUsModel = require("../database/models/aboutUsModel");
const { formatMongoData } = require("../helpers/dbHelper");

// createAboutUs
module.exports.createAboutUs = async (serviceData) => {
  try {
    const newData = new aboutUsModel(serviceData);
    const result = await newData.save();
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: aboutUsService: createAboutUs`,
      error.message
    );
    throw new Error(error);
  }
};

// getAboutUs
module.exports.getAboutUs = async (serviceData) => {
  try {
    const result = await aboutUsModel.findOne();
    const res = {
      body: formatMongoData(result),
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: aboutUsService: getAboutUs`,
      error.message
    );
    throw new Error(error);
  }
};

// updateAboutUs
module.exports.updateAboutUs = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await aboutUsModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: aboutUsService: updateAboutUs`,
      error.message
    );
    throw new Error(error);
  }
};
