const privacyPolicyModel = require("../database/models/privacyPolicyModel");
const { formatMongoData } = require("../helpers/dbHelper");

// createPrivacyPolicy
module.exports.createPrivacyPolicy = async (serviceData) => {
  try {
    const newData = new privacyPolicyModel(serviceData);
    const result = await newData.save();
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: privacyPolicyService: createPrivacyPolicy`,
      error.message
    );
    throw new Error(error);
  }
};

// getPrivacyPolicy
module.exports.getPrivacyPolicy = async (serviceData) => {
  try {
    const result = await privacyPolicyModel.findOne();
    const res = {
      body: formatMongoData(result),
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: privacyPolicyService: getPrivacyPolicy`,
      error.message
    );
    throw new Error(error);
  }
};

// updatePrivacyPolicy
module.exports.updatePrivacyPolicy = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await privacyPolicyModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: privacyPolicyService: updatePrivacyPolicy`,
      error.message
    );
    throw new Error(error);
  }
};
