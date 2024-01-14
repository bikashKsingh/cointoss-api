const settingModel = require("../database/models/settingModel");
const { formatMongoData } = require("../helpers/dbHelper");
const { settingMessage, defaultServerResponse } = require("../constants");

const _ = require("lodash");

// createUpdateSetting
module.exports.createUpdateSetting = async (serviceData) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    // find first
    const dbResponse = await settingModel.findOne().sort({ _id: -1 });
    // update
    if (dbResponse) {
      const result = await settingModel.findByIdAndUpdate(
        dbResponse._id,
        serviceData,
        { new: true }
      );
      const formatData = formatMongoData(result);
      response.status = 200;
      response.body = formatData;
      response.message = settingMessage.SETTING_UPDATED;
    } else {
      // create new
      const newData = new settingModel(serviceData);
      const result = await newData.save();
      const formatData = formatMongoData(result);
      response.status = 200;
      response.body = formatData;
      response.message = settingMessage.SETTING_CREATED;
    }

    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: settingService: createUpdateSetting`,
      error.message
    );
    throw new Error(error);
  }
};

// getSetting
module.exports.getSetting = async () => {
  try {
    const result = await settingModel.findOne().sort({ _id: -1 });
    const res = {
      body: formatMongoData(result),
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: settingService: getSetting`,
      error.message
    );
    throw new Error(error);
  }
};
