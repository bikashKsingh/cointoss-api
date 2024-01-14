const termsConditionsModel = require("../database/models/termsConditionsModel");
const { formatMongoData } = require("../helpers/dbHelper");

// createTermsConditions
module.exports.createTermsConditions = async (serviceData) => {
  try {
    const newData = new termsConditionsModel(serviceData);
    const result = await newData.save();
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: termsConditionsService: createTermsConditions`,
      error.message
    );
    throw new Error(error);
  }
};

// getTermsConditions
module.exports.getTermsConditions = async (serviceData) => {
  try {
    const result = await termsConditionsModel.findOne();
    const res = {
      body: formatMongoData(result),
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: termsConditionsService: getTermsConditions`,
      error.message
    );
    throw new Error(error);
  }
};

// updateTermsConditions
module.exports.updateTermsConditions = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await termsConditionsModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: termsConditionsService: updateTermsConditions`,
      error.message
    );
    throw new Error(error);
  }
};
