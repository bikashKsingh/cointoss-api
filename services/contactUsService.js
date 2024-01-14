const contactUsModel = require("../database/models/contactUsModel");
const { formatMongoData } = require("../helpers/dbHelper");

// createContactUs
module.exports.createContactUs = async (serviceData) => {
  try {
    const newData = new contactUsModel(serviceData);
    const result = await newData.save();
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: contactUsService: createContactUs`,
      error.message
    );
    throw new Error(error);
  }
};

// getContactUs
module.exports.getContactUs = async (serviceData) => {
  try {
    const result = await contactUsModel.findOne();
    const res = {
      body: formatMongoData(result),
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: contactUsService: getContactUs`,
      error.message
    );
    throw new Error(error);
  }
};

// updateContactUs
module.exports.updateContactUs = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await contactUsModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: contactUsService: updateContactUs`,
      error.message
    );
    throw new Error(error);
  }
};
